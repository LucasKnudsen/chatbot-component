import { IconButton, MicrophoneIcon, SendButton } from '@/components'
import { API, Storage } from 'aws-amplify'
import { Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'

import { botStore } from '@/features/bot'
import { useTheme } from '@/features/theme/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { useScrollOnResize } from '../hooks/useScrollOnResize'
import { Textarea } from './ShortTextInput'

type Props = {
  placeholder: string
  rows?: number
  defaultValue?: string
  fontSize?: number
  class?: string
  onSubmit: (value: string) => void
  onFocusChange?: (value: boolean) => void
}

export const ChatInput = (props: Props) => {
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '')
  let inputRef: HTMLTextAreaElement | undefined

  const { theme } = useTheme()
  const device = useMediaQuery()
  useScrollOnResize()

  const handleInput = (inputValue: string) => setInputValue(inputValue)

  const checkIfInputIsValid = () => inputValue() !== '' && inputRef?.reportValidity()

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit(inputValue())
    setInputValue('')
  }

  const submitWhenEnter = (e: KeyboardEvent) => {
    // Check if IME composition is in progress
    const isIMEComposition = e.isComposing || e.keyCode === 229
    if (e.key === 'Enter' && !isIMEComposition) {
      submit()
      inputRef?.blur()
    }
  }

  createEffect(() => {
    if (!botStore.isAwaitingAnswer && device() == 'desktop' && inputRef) inputRef.focus()
  })

  onMount(() => {
    if (device() == 'desktop' && inputRef) inputRef.focus()
  })

  return (
    <div
      class={'flex justify-between rounded-lg ' + props.class}
      data-testid='input'
      style={{
        'background-color': theme().textInputBackgroundColor,
        color: theme().textInputTextColor,
      }}
      onKeyDown={submitWhenEnter}
    >
      {/* Additional inputs  */}
      <Show when={device() == 'desktop'}>
        <div class='flex items-start pl-5 pt-6'>
          <div class='flex items-center'>
            <AudioInput onSubmit={props.onSubmit} />
            <div class='bg-[var(--borderColor)] h-[18px] w-px mx-7' />
          </div>
        </div>
      </Show>

      <Textarea
        ref={inputRef}
        onInput={handleInput}
        value={inputValue()}
        fontSize={props.fontSize}
        disabled={botStore.isAwaitingAnswer}
        placeholder={props.placeholder}
        rows={props.rows}
        onFocusChange={props.onFocusChange}
        class='pt-[22px] pb-2 pr-5 focus:h-28 h-[70px] transition-all'
      />

      <SendButton
        data-testid='submit-question'
        sendButtonColor={
          botStore.isAwaitingAnswer || inputValue() === ''
            ? theme().textSecondary
            : theme().primaryColor
        }
        type='button'
        isDisabled={botStore.isAwaitingAnswer || inputValue() === ''}
        class='ml-2'
        on:click={submit}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
      </SendButton>
    </div>
  )
}
const AudioInput = (props: { onSubmit: (value: string) => void }) => {
  const [mediaStream, setMediaStream] = createSignal<MediaStream | null>(null)
  const [mediaRecorder, setMediaRecorder] = createSignal<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = createSignal<boolean>(false)
  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  const handleUpload = async (blob: Blob) => {
    const type = blob.type
    const key = `test.${type.split('/')[1]}`

    try {
      setIsLoading(true)
      console.time('FULL')

      await Storage.put(key, blob, {
        contentType: 'audio/webm',
      })

      const transcription = await API.post('digitaltwinRest', '/transcribe', {
        body: {
          s3Key: `public/${key}`,
          type,
        },
      })

      props.onSubmit(transcription)
    } catch (error) {
      console.error('Uploading transcription error', error)
    }

    console.timeEnd('FULL')

    setIsLoading(false)
  }

  // Function to start recording
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream)
        const audioChunks: Blob[] = [] // Store audio chunks
        let type = 'audio/webm'

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data)
            type = event.data.type.split(';')[0]
          }
        }

        recorder.onstop = async () => {
          // Handle the recording stopped event
          const audioBlob = new Blob(audioChunks, { type })

          handleUpload(audioBlob)
        }

        setMediaStream(stream)
        setMediaRecorder(recorder)
        recorder.start()
        setIsRecording(true)
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error)
        alert('Error accessing microphone')
      })
  }

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorder()) {
      mediaRecorder()?.stop()
      console.log('Stopped recording.')
      mediaStream()
        ?.getTracks()
        .forEach((track) => track.stop())
      setMediaRecorder(null)
      setMediaStream(null)
      setIsRecording(false)
    }
  }

  onCleanup(() => {
    stopRecording() // Stop recording when the component unmounts
  })

  return (
    <>
      {isLoading() ? (
        <div class='animate-ping rounded-full m-1 h-3 w-3 bg-gray-700' />
      ) : isRecording() ? (
        <IconButton onClick={stopRecording}>
          <div class=' animate-pulse m-1 h-3 w-3  ani  bg-gray-700 opacity-75'></div>
        </IconButton>
      ) : (
        <IconButton onClick={startRecording}>
          <MicrophoneIcon height={20} width={20} />
        </IconButton>
      )}
    </>
  )
}
