import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createEffect, createSignal } from 'solid-js'
import {
  AITextStatus,
  AvatarOneClick,
  ButtonStart,
  InputOneClick,
  MuteAISwitch,
} from './components'
import { Conversation } from './Conversation'
import { oneClickActions, oneClickStore } from './store/oneClickStore'
import { BotStatus, ChatMessage } from './types'
import { buildBodyForLLM, createAudioRecorder } from '../avatar'
import { transcribeAudio } from '../knowledge-base'
import { NEXT_API_ENDPOINTS } from '@/constants/api'
import { queryLLM } from '@/features/messages'

export const BotOneClick = () => {
  const [isStart, setIsStart] = createSignal<boolean>(false)
  const [conversation, setConversation] = createSignal<ChatMessage[]>([])

  let audioRef: any;

  const [TopContainerParent] = createAutoAnimate()

  const audioRecorder = createAudioRecorder({
    // onStop(audioBlob) {
    //   handleVoiceToVoice(audioBlob)
    // }, 
  })

  const handleSwitchBotStatus = () => {
    switch (oneClickStore.botStatus) {
      case BotStatus.THINKING:
        const userConversation: ChatMessage = {
          message: 'Tell me about the Author Neil Gaiman..',
          role: 'user',
        }
        setConversation((prev) => [...prev, userConversation])
        setTimeout(() => {
          oneClickActions.setStatus(BotStatus.ANSWERING)
        }, 3000)
        break

      case BotStatus.ANSWERING:
        setTimeout(() => {
          oneClickActions.setStatus(BotStatus.IDLE)
          setIsStart(false)
          const botConversation: ChatMessage = {
            message: 'Lorem ipsum dolor sit amet consectetur. Enim integer iaculis dictum metus',
            role: 'assistant',
          }
          setConversation((prev) => [...prev, botConversation])
        }, 4000)
        break
      default:
        break
      }
    }

  const handleButtonRecord = () => {
    if (oneClickStore.botStatus === BotStatus.NOT_STARTED) return;

    if (!isStart()) {
      setIsStart(true)
      oneClickActions.setStatus(BotStatus.LISTENING)
      audioRecorder.startRecording();
      return
    }

    if (isStart() && oneClickStore.botStatus === BotStatus.LISTENING) {
      audioRecorder.stopRecording();
      oneClickActions.setStatus(BotStatus.THINKING)
      return
    }
    if (isStart() && oneClickStore.botStatus === BotStatus.ANSWERING) {
      oneClickActions.setStatus(BotStatus.IDLE)
      audioRef.pause();
      setIsStart(false)
      return
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
    formData.append('llmArguments', JSON.stringify(buildBodyForLLM()))

    if (audioBlob.type.includes('mp4')) {
      const transcriptionResponse = await transcribeAudio(audioFile, {
        diarization_toggle: false,
      })

      transcribedText = transcriptionResponse.transcription[0].text
    } else {
      const transcriptionResponse = await fetch(NEXT_API_ENDPOINTS.speechToText, {
        method: 'POST',
        body: formData,
      })

      transcribedText = (await transcriptionResponse.json()).data.transcription
    }

    return transcribedText
  }

  const handleQuery = async (message: string) => {
    const textForTTS = await queryLLM(message)

    return textForTTS
  }

  const handleVoiceReply = async (text: string) => {
    const audioStream = await fetch(NEXT_API_ENDPOINTS.textToSpeech, {
      method: 'POST',

      body: JSON.stringify({
        text,
        voiceId: oneClickStore.activeChannel?.overrideConfig?.elevenLabsVoiceId || '',
      }),
    })
    if (!audioStream.body) return

    const base64String = (await audioStream.json()).data

    const audioSrc = `data:audio/mp3;base64,${base64String}`
    audioRef.src = audioSrc

    const onAudioEnded = () => {
      audioRef.removeEventListener('ended', onAudioEnded)
      oneClickActions.setStatus(BotStatus.IDLE)
      setIsStart(false);
    }

    audioRef.addEventListener('ended', onAudioEnded)

    audioRef.play()
  }

  const handleVoiceToVoice = async (audioBlob: Blob) => {
    try {
      oneClickActions.setStatus(BotStatus.THINKING);
      const transcribedText = await handleTranscription(audioBlob)
      // Queries the LLM to get the text answer
      const textForTTS = await handleQuery(transcribedText)
      oneClickActions.setStatus(BotStatus.ANSWERING)
      // Gets the audio from the TTS
      await handleVoiceReply(textForTTS || '')
    } catch (error) {
      console.error('Error in handleVoiceToVoice', error)
    } finally {
      console.timeEnd('Bot answer');

    }
  }

  createEffect(() => {
    if (!isStart()) {
      setTimeout(() => {
        oneClickActions.setStatus(BotStatus.IDLE)
      }, 2000)
      return
    }
    // for mock testing when the bot works and return the answer
    handleSwitchBotStatus()
  })

  return (
    <div
      data-testid='BotOneClick'
      class='relative flex flex-col w-full h-full lg:px-7 xl:px-3 xxl:px-0 animate-fade-in mt-4 overflow-hidden'
    >
      <div
        ref={TopContainerParent}
        class='flex flex-col grow md:grow-0 w-full md:h-[80%] xxl:h-[70%] items-center overflow-hidden px-5 bg-white'
      >
        <Show
          when={
            oneClickStore.botStatus === BotStatus.NOT_STARTED ||
            oneClickStore.botStatus === BotStatus.THINKING ||
            oneClickStore.botStatus === BotStatus.ANSWERING
          }
          keyed
        >
          <AITextStatus />
        </Show>

        <div class='relative w-full h-full'>
          <div class='absolute h-full left-2 top-2 z-10'>
            {/* Allow MuteAISwith to use auto-animate while changing layout*/}
            <Show when={!isStart() && oneClickStore.botStatus !== BotStatus.NOT_STARTED} keyed>
              <MuteAISwitch />
            </Show>
            <Show when={isStart() && oneClickStore.botStatus !== BotStatus.NOT_STARTED} keyed>
              <MuteAISwitch />
            </Show>
          </div>

          <div class='h-[60%] md:h-[65%] xl:h-[70%] xxl:h-[75%]'>
            <AvatarOneClick />
          </div>

          <div class='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ButtonStart onStart={handleButtonRecord} isStart={isStart} />
          </div>
        </div>
      </div>
      <div class="md:h-[20%] xxl:h-[30%] w-full flex flex-col justify-end px-5">
      <Show when={conversation().length > 0}>
        <Conversation messages={conversation()} />
      </Show>

      <audio ref={audioRef} crossOrigin='anonymous' src={audioRef.src} class='hidden'></audio>

      {/* Text Input  */}
      <InputOneClick />
      </div>
    </div>
  )
}
