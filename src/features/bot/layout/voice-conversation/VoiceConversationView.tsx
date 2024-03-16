import { TypingBubble } from '@/components'
import { transcribeAudio } from '@/features/knowledge-base'
import { queryLLM } from '@/features/messages'
import { Channel } from '@/graphql'
import { createAudioRecorder } from '@/hooks'
import { API } from 'aws-amplify'
import { Match, Show, Switch, createSignal } from 'solid-js'
import { InteractionFlowSwitch } from '../../components'
import { botStore } from '../../stores'

export const VoiceConversationView = () => {
  const [isThinking, setIsThinking] = createSignal(false)
  const [isAnswering, setIsAnswering] = createSignal(false)

  const audioRecorder = createAudioRecorder({
    onStop(audioBlob) {
      handleBotAnswer(audioBlob)
    },
  })
  // 1. Make conditional rendering of flow state between awaiting input, listening, thinking, and speaking
  // 2. Implement voice input through recording
  // 3. Implement STT into TTS
  // 4. Play TTS audio

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

    const audioFile = new File([audioBlob], 'audio.wav', { type: audioBlob.type })

    setIsThinking(true)

    const transcriptionResponse = await transcribeAudio(audioFile, {
      diarization_toggle: false,
    })

    console.log('Transcription done: ', transcriptionResponse)

    const text = await queryLLM(transcriptionResponse.transcription[0].text)

    const audioBase64 = await API.post('digitaltwinRest', '/ai/tts', {
      body: {
        text,
      },
    })
    setIsThinking(false)

    setIsAnswering(true)

    const audioSrc = `data:audio/mp3;base64,${audioBase64}`
    const audio = new Audio(audioSrc)

    audio.addEventListener('ended', () => {
      setIsAnswering(false)
      audio?.removeEventListener('ended', () => setIsAnswering(false))
    })
    audio.play()
  }

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
        <div class='relative flex justify-center items-center'>
          <div
            onClick={handleAvatarClick}
            class={`w-32 h-32 rounded-full border-white border transition cursor-pointer
            ${isAnswering() ? 'animate-pulse' : ''}
          `}
            style={{
              'background-image':
                (botStore.activeChannel as Channel)?.avatar ||
                'linear-gradient(to right, #ed4264, #ffedbc)',
            }}
          />

          <Show when={isThinking()}>
            <div class='absolute'>
              <TypingBubble color='white' />
            </div>
          </Show>
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
    </div>
  )
}
