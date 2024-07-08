import { NEXT_API_ENDPOINTS } from '@/constants/api'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createEffect, createSignal } from 'solid-js'
import { createAudioRecorder } from '../avatar'
import {
  AITextStatus,
  AvatarOneClick,
  ButtonStart,
  InputOneClick,
  MuteAISwitch,
  isMuted,
} from './components'
import { AIVoice, audioRef, setIsPlayingQueue } from './components/AIVoice'
import { Conversation, expandConversation } from './Conversation'
import { useLLM } from './hooks'
import { oneClickActions, oneClickStore } from './store/oneClickStore'
import { BotStatus } from './types'
import toast from 'solid-toast'

export const BotOneClick = () => {
  const [TopContainerParent] = createAutoAnimate()
  const [botLastResponse, setBotLastResponse] = createSignal('')

  const audioRecorder = createAudioRecorder({
    onStop(audioBlob) {
      handleVoiceToVoice(audioBlob)
    },
  })

  const { messages, audio64, setAudio64, submitNewMessage, cancelQuery, loading } = useLLM({
    initialMessages: [], 
  })

  const handleTriggerAudio = () => {
    if (!audioRef) return
    audioRef.muted = isMuted()
  }

  const handleStopAnswering = () => {
    if (audioRef) {
      audioRef.pause()
      audioRef.src = ''
      setAudio64([])
      setIsPlayingQueue(false)
    }
  }

  const handleButtonRecord = () => {
    if (oneClickStore.botStatus === BotStatus.LISTENING) {
      oneClickActions.setStatus(BotStatus.THINKING)
      audioRecorder.stopRecording()
    } else if (
      oneClickStore.botStatus === BotStatus.ANSWERING ||
      oneClickStore.botStatus === BotStatus.THINKING
    ) {
      cancelQuery()
      handleStopAnswering()
      oneClickActions.setStatus(BotStatus.IDLE)
    } else {
      oneClickActions.setStatus(BotStatus.LISTENING)
      audioRecorder.startRecording()
    }
  }

  const handleTranscription = async (audioBlob: Blob) => {
    if (!audioBlob) {
      throw new Error('No audio blob found')
    }

    let transcribedText = ''
    const audioFile = new File([audioBlob], `audio.${audioBlob.type.split('/')[1]}`, {
      type: audioBlob.type,
    })

    const formData = new FormData()
    formData.append('file', audioFile)

    // if (audioBlob.type.includes('mp4')) {

    // throw new Error('MP4 audio not supported yet')
    //   const transcriptionResponse = await transcribeAudio(audioFile, {
    //     diarization_toggle: false,
    //   })

    //   transcribedText = transcriptionResponse.transcription[0].text
    // } else {
    const transcriptionResponse = await fetch(NEXT_API_ENDPOINTS.speechToText, {
      method: 'POST',
      body: formData,
    })

    transcribedText = (await transcriptionResponse.json()).data.transcription
    // }

    return transcribedText
  }

  const handleVoiceToVoice = async (audioBlob: Blob) => {
    try {
      const transcribedText = await handleTranscription(audioBlob)
      submitNewMessage(transcribedText)
    } catch (error) {
      oneClickActions.setStatus(BotStatus.IDLE)
      toast.error('Error in voice to voice conversion', {
        position: 'top-center',
        className: '!text-base',
      })
    }
  }

  createEffect(() => {
    setTimeout(() => {
      oneClickActions.setStatus(BotStatus.IDLE)
    }, 1000)
  })

  createEffect(() => {
    if (!isMuted() && messages().length > 0 && !loading()) {
      const botResponseMessage = messages()[messages().length - 1]?.content;
      setBotLastResponse(botResponseMessage)
    }
  })

  return (
    <>
        <div
          ref={TopContainerParent}
          data-testid='BotOneClick'
          class='relative flex flex-col w-full h-full animate-fade-in mt-4 overflow-hidden'
        >
          <AIVoice audioQueue={audio64} setAudioQueue={setAudio64} />

          <div class='relative w-full flex flex-col h-1/2  items-center overflow-hidden px-5 bg-white'>
            <div class='absolute right-6 top-2 z-10 '>
              <AITextStatus />
            </div>

            <div class='absolute left-8 top-2 z-10 '>
              <Show when={oneClickStore.botStatus !== BotStatus.NOT_STARTED} keyed>
                <MuteAISwitch onMute={handleTriggerAudio} />
              </Show>
            </div>

            <div class='h-full'>
              <AvatarOneClick botResponse={botLastResponse} />
            </div>

            <ButtonStart onStart={handleButtonRecord} />
          </div>
          
          <div class={`w-full overflow-auto ${expandConversation() ? 'absolute z-[100] bg-[var(--backgroundColor)]' : ''} flex flex-col justify-end px-5 pb-4`}
          style={{
            height: expandConversation() ? '100%' : '50%',
          }}>
            <Conversation messages={messages()} />
            <InputOneClick onSubmit={submitNewMessage} />
          </div>
        </div>
    </>
  )
}
