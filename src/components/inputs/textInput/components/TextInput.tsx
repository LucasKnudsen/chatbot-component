import { Divider, IconButton, MicrophoneIcon, SendButton } from '@/components'
import { useTheme } from '@/features/theme/hooks'
import { logDev } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { API, Storage } from 'aws-amplify'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { useScrollOnResize } from '../hooks/useScrollOnResize'
import { Textarea } from './ShortTextInput'

type Props = {
  placeholder: string
  rows?: number
  defaultValue?: string
  fontSize?: number
  disabled?: boolean
  class?: string
  onSubmit: (value: string) => void
  onFocusChange?: (value: boolean) => void
}

export const TextInput = (props: Props) => {
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
    if (!props.disabled && device() == 'desktop' && inputRef) inputRef.focus()
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
      <div class='flex py-2 pl-2 md:pl-4 items-center gap-1 md:gap-2 md:h-12 md:pt-4 '>
        <AudioInput onSubmit={props.onSubmit} />

        <Divider vertical />
      </div>

      <Textarea
        ref={inputRef}
        onInput={handleInput}
        value={inputValue()}
        fontSize={props.fontSize}
        disabled={props.disabled}
        placeholder={props.placeholder}
        rows={props.rows}
        onFocusChange={props.onFocusChange}
        class='p-2 md:p-4'
      />

      <SendButton
        data-testid='submit-question'
        sendButtonColor={
          props.disabled || inputValue() === '' ? theme().textSecondary : theme().primaryColor
        }
        type='button'
        isDisabled={props.disabled || inputValue() === ''}
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

  // Function to start recording
  const startRecording = () => {
    alert('start recording')

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        alert('Started recording.')

        const recorder = new MediaRecorder(stream)

        recorder.ondataavailable = async (event) => {
          console.log('File data', event)
          setIsLoading(true)
          console.time('UPLOADING')

          const key = 'test.webm'

          try {
            const result = await Storage.put(key, event.data, {
              contentType: 'audio/webm',
            })

            console.log('Uploaded file: ', result)

            const transcription = await API.post('digitaltwinRest', '/transcribe', {
              body: {
                s3Key: `public/${key}`,
              },
            })

            console.log(transcription)
            props.onSubmit(transcription)
          } catch (error) {
            logDev('Uploading transcription error', error)
          }

          console.timeEnd('UPLOADING')

          setIsLoading(false)
        }

        recorder.onstop = () => {
          // Handle the recording stopped event
        }

        setMediaStream(stream)
        setMediaRecorder(recorder)
        recorder.start()
        setIsRecording(true)
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error)
        alert('fack')
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
    <div>
      {isLoading() ? (
        <div class='animate-ping m-1 h-3 w-3 bg-gray-700' />
      ) : isRecording() ? (
        <IconButton onClick={stopRecording}>
          <div class=' animate-pulse m-1 h-3 w-3  ani  bg-gray-700 opacity-75'></div>
        </IconButton>
      ) : (
        <IconButton onClick={startRecording}>
          <MicrophoneIcon height={20} width={20} />
        </IconButton>
      )}
    </div>
  )
}
