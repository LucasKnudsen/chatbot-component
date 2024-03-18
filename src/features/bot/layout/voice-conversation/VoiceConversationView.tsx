import { TypingBubble } from '@/components'
import { quickTranscribe, transcribeAudio } from '@/features/knowledge-base'
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
        // Handle silent audio trick

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
    console.log('THE TYPE', audioBlob.type)

    if (audioBlob.type.includes('mp4')) {
      const audioFile = new File([audioBlob], 'audio.webm', { type: audioBlob.type })

      const transcriptionResponse = await transcribeAudio(audioFile, {
        diarization_toggle: false,
      })

      transcribedText = transcriptionResponse.transcription[0].text
    } else {
      transcribedText = await quickTranscribe(audioBlob)
    }

    console.log('Transcription done: ', transcribedText)

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

    const audio = new Audio(audioSrc)

    const onAudioEnded = () => {
      setIsAnswering(false)
      audio.removeEventListener('ended', onAudioEnded)
    }

    audio.addEventListener('ended', onAudioEnded)

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

// const AudioUnlocker = () => {
//   const unlockAudio = () => {
//     // Create a new Audio context
//     const audioCtx = new window.AudioContext()

//     // Create an empty buffer
//     const buffer = audioCtx.createBuffer(1, 1, 22050) // 1 channel, 1 frame, 22.05kHz sample rate
//     const source = audioCtx.createBufferSource()
//     source.buffer = buffer

//     // Connect to the context
//     source.connect(audioCtx.destination)

//     // Play the sound
//     if (source.start) {
//       source.start(0)
//     } else if (source.play) {
//       source.play(0)
//     } else if (source.noteOn) {
//       source.noteOn(0)
//     }

//     // Remove the event listeners to ensure this only runs once
//     document.removeEventListener('touchstart', unlockAudio)
//     document.removeEventListener('click', unlockAudio)
//   }

//   onMount(() => {
//     // Add event listeners to the whole document waiting for the user to interact
//     // This ensures the audio gets "unlocked" at the first user interaction
//     document.addEventListener('touchstart', unlockAudio, false)
//     document.addEventListener('click', unlockAudio, false)
//   })

//   return null
// }
