import { TypingBubble } from '@/components'
import { quickTranscribe, transcribeAudio } from '@/features/knowledge-base'
import { queryLLM } from '@/features/messages'
import { useTheme } from '@/features/theme'
import { createAudioRecorder } from '@/hooks'
import { logDev } from '@/utils'
import { API } from 'aws-amplify'
import { Match, Switch, createSignal } from 'solid-js'
import { InteractionFlowSwitch } from '../../components'
import { botStore } from '../../stores'
import { getAvatarStyle } from '../../utils'
import { AudioVisualizer } from './AudioVisualizer'

export const VoiceConversationView = () => {
  const [isThinking, setIsThinking] = createSignal(false)
  const [isAnswering, setIsAnswering] = createSignal(false)
  const { theme } = useTheme()

  let audioRef: any

  const audioRecorder = createAudioRecorder({
    onStop(audioBlob) {
      handleBotAnswer(audioBlob)
    },
  })

  const isIdle = () => !audioRecorder.isRecording() && !isThinking() && !isAnswering()

  const handleAvatarClick = async () => {
    if (audioRecorder.isRecording() && isThinking()) {
      return
    }

    switch (true) {
      case audioRecorder.isRecording():
        audioRecorder.stopRecording()
        break

      default:
        audioRecorder.startRecording()
    }
  }

  const handleBotAnswer = async (audioBlob: Blob) => {
    if (!audioBlob) {
      throw new Error('No audio blob found')
    }

    setIsThinking(true)

    let transcribedText = ''

    if (audioBlob.type.includes('mp4')) {
      const audioFile = new File([audioBlob], 'audio.webm', { type: audioBlob.type })

      const transcriptionResponse = await transcribeAudio(audioFile, {
        diarization_toggle: false,
      })

      transcribedText = transcriptionResponse.transcription[0].text
    } else {
      transcribedText = await quickTranscribe(audioBlob)
    }

    logDev('Transcription done: ')

    const textForTTS = await queryLLM(transcribedText)

    const audioBase64 = await API.post('digitaltwinRest', '/ai/tts', {
      body: {
        text: textForTTS,
        voice: 'onyx',
      },
    })

    setIsThinking(false)

    setIsAnswering(true)

    const audioSrc = `data:audio/mp3;base64,${audioBase64}`
    audioRef.src = audioSrc

    const onAudioEnded = () => {
      setIsAnswering(false)
      audioRef.removeEventListener('ended', onAudioEnded)
    }

    audioRef.addEventListener('ended', onAudioEnded)

    audioRef.play()
  }

  // const dummyBotAnswer = async (audioBlob: Blob) => {
  //   if (!audioBlob) {
  //     throw new Error('No audio blob found')
  //   }

  //   setIsThinking(true)

  //   await new Promise((resolve) => setTimeout(resolve, 2000))

  //   setIsThinking(false)

  //   setIsAnswering(true)

  //   const audioSrc = `data:${audioBlob.type};base64,${sampleAudioBase64}`

  //   const audio = new Audio()
  //   audio.autoplay = true
  //   audio.src = audioSrc

  //   const onAudioEnded = () => {
  //     setIsAnswering(false)
  //     audio.removeEventListener('ended', onAudioEnded)
  //   }

  //   audio.addEventListener('ended', onAudioEnded)
  // }

  //   createEffect(
  //     on(
  //       () => botStore.activeAnswer,
  //       () => console.log('Bot answer: ', botStore.activeAnswer)
  //     )
  //   )

  return (
    <div class='flex flex-col grow animate-fade-in'>
      <InteractionFlowSwitch />

      <div class='flex flex-col grow justify-center items-center gap-8'>
        <div class='relative flex flex-col justify-center items-center'>
          <div
            onClick={handleAvatarClick}
            class={`relative w-32 h-32 rounded-full border-white border transition cursor-pointer overflow-hidden`}
            style={{
              'background-size': 'contain',
              'background-image': getAvatarStyle(botStore.activeChannel?.avatar),
            }}
          />
          <Switch>
            <Match when={isThinking()}>
              <div class='absolute'>
                <TypingBubble color='white' />
              </div>
            </Match>
            <Match when={audioRecorder.isRecording()}>
              <AudioVisualizer color={theme().primaryColor} />
            </Match>
            <Match when={isAnswering()}>
              <audio
                ref={audioRef}
                controls
                autoplay
                crossorigin='anonymous'
                class='hidden'
              ></audio>
              <div class='absolute inset-0'>
                <AudioVisualizer source={audioRef} color={theme().onPrimary} />
              </div>
            </Match>
          </Switch>
        </div>

        <p class='italic text-[var(--primaryColor)]'>
          <Switch>
            <Match when={isIdle()}>Click me to start talking</Match>
            <Match when={audioRecorder.isRecording()}>
              I'm listening... Click on me again when you're ready.
            </Match>
            <Match when={isThinking()}>Let me think...</Match>
          </Switch>
        </p>
      </div>

      <audio ref={audioRef} src={audioRef.src} class='hidden'></audio>
    </div>
  )
}
