import { Button, TypingBubble } from '@/components'
import { NEXT_API_ENDPOINTS } from '@/constants/api'
import { transcribeAudio } from '@/features/knowledge-base'
import { queryLLM } from '@/features/messages'
import { useTheme } from '@/features/theme'
import { speechSynthesis } from '@/services/speechSynthesis'
import { Accessor, Match, Switch, createEffect, createSignal } from 'solid-js'
import { botStore } from '../../bot/stores'
import { getAvatarStyle } from '../../bot/utils'
import { createAudioRecorder } from '../hooks/createAudioRecorder'
import { buildBodyForLLM } from '../services'

type StaticAvatarProps = {
  audioRef?: any
  triggerAvatar?: Accessor<string>
}

export const StaticAvatar = (props: StaticAvatarProps) => {
  const { theme } = useTheme()

  const [isThinking, setIsThinking] = createSignal(false)
  const [isAnswering, setIsAnswering] = createSignal(false)

  let audioRef: any

  const audioRecorder = createAudioRecorder({
    onStop(audioBlob) {
      handleVoiceToVoice(audioBlob)
    },
  })

  const isIdle = () => !audioRecorder.isRecording() && !isThinking() && !isAnswering()

  const handleAvatarClick = async () => {
    if (audioRecorder.isRecording() && isThinking()) {
      return
    }

    switch (true) {
      case isThinking():
        return

      case isAnswering():
        audioRef.pause()
        setIsAnswering(false)
        break

      case audioRecorder.isRecording():
        audioRecorder.stopRecording()
        break

      default:
        audioRecorder.startRecording()
    }
  }

  const handleVoiceToVoice = async (audioBlob: Blob) => {
    // if (SHOULD_MOCK) {
    //   await handleVoiceReply('This is a mock response')
    //   return
    // }
    try {
      setIsThinking(true)

      console.time('Bot answer')

      const transcribedText = await handleTranscription(audioBlob)
      console.timeLog('Bot answer', 'Transcription done.')

      // Queries the LLM
      const textForTTS = await handleQuery(transcribedText)

      console.timeLog('Bot answer', 'LLM Query done.')

      // Gets the audio from the TTS
      await handleVoiceReply(textForTTS || '')
    } catch (error) {
      console.error('Error handling voice to voice', error)
    } finally {
      console.timeEnd('Bot answer')
      setIsThinking(false)
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

    // Transcribes the text
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
    const result = await speechSynthesis(text, botStore.activeChannel?.id!)

    if (!result.audio) return

    const base64String = result.audio

    // const reader = audioStream.body.pipeThrough(new TextDecoderStream()).getReader()

    // while (true) {
    //   const { value, done } = await reader.read()

    //   if (done) {
    //     break
    //   }
    //   if (value) {
    //     incomingMessage += value
    //     console.log(value)
    //   }
    // }

    setIsThinking(false)
    setIsAnswering(true)

    const audioSrc = `data:audio/mp3;base64,${base64String}`
    audioRef.src = audioSrc

    const onAudioEnded = () => {
      setIsAnswering(false)
      audioRef.removeEventListener('ended', onAudioEnded)
    }

    audioRef.addEventListener('ended', onAudioEnded)

    audioRef.play()
  }

  createEffect(async () => {
    if (props.triggerAvatar?.()) {
      if (isThinking() || audioRecorder.isRecording()) {
        return
      }

      try {
        setIsThinking(true)

        const message = props.triggerAvatar()
        const textForTTS = await queryLLM(message)

        await handleVoiceReply(textForTTS || '')
      } catch (error) {
        console.error('Error handling voice to voice', error)
      } finally {
        setIsThinking(false)
      }
    }
  })

  return (
    <>
      <div class='flex flex-1 flex-col  justify-center items-center gap-8'>
        <div class='relative flex flex-col justify-center items-center hover:brightness-90 transition-all hover:scale-105'>
          {/* AVATAR  */}
          <div
            onClick={handleAvatarClick}
            class={`relative w-40 h-40 rounded-full border-white border transition cursor-pointer overflow-hidden`}
            style={{
              'background-size': 'contain',
              'background-image': getAvatarStyle(botStore.activeChannel?.avatar),
              'box-shadow': `4px 7px 23px 3px ${theme().surfaceHoveredBackground}`,
            }}
          />

          <Switch>
            <Match when={isThinking()}>
              <div class='absolute'>
                <TypingBubble color='white' />
              </div>
            </Match>
          </Switch>
        </div>

        <Switch>
          <Match when={isIdle()}>
            <Button onClick={handleAvatarClick} padding='6px 24px'>
              Click to start chatting
            </Button>
          </Match>

          <Match when={audioRecorder.isRecording()}>
            <div>
              <p class='italic text-[var(--primaryColor)] text-center '>I'm listening...</p>
              <p class='italic text-[var(--primaryColor)] text-center '>
                Click on me again when you're ready.
              </p>
            </div>

            <Button onClick={handleAvatarClick} padding='6px 24px'>
              I'm done speaking
            </Button>
          </Match>

          <Match when={isThinking()}>
            <p class='italic text-[var(--primaryColor)] text-center'>Let me think...</p>
          </Match>

          <Match when={isAnswering()}>
            <Button onClick={handleAvatarClick} padding='6px 24px'>
              Cancel
            </Button>
          </Match>
        </Switch>
      </div>

      {/* If there is no audioRef given, it will create its own audio element and use it. */}
      {!props.audioRef && (
        <audio ref={audioRef} crossOrigin='anonymous' src={audioRef.src} class='hidden'></audio>
      )}
    </>
  )
}
