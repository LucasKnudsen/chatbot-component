import { IconButton, MicrophoneIcon, SendButton } from '@/components'
import { Show, createEffect, createSignal } from 'solid-js'

import { createAudioRecorder } from '@/features/avatar'
import { botStore } from '@/features/bot'
import { quickTranscribe, transcribeAudio } from '@/features/knowledge-base'
import { useTheme } from '@/features/theme/hooks'
import { logErrorMessage } from '@/utils'
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
    clearInput()
  }

  const clearInput = () => setInputValue('')

  const submitWhenEnter = (e: KeyboardEvent) => {
    // Check if IME composition is in progress
    const isIMEComposition = e.isComposing || e.shiftKey
    if (e.key === 'Enter' && !isIMEComposition) {
      submit()
      inputRef?.blur()
    }
  }

  createEffect(() => {
    if (
      !botStore.isAwaitingAnswer &&
      botStore.activeChannel?.activeChat &&
      device() == 'desktop' &&
      inputRef
    )
      inputRef.focus()
  })

  // onMount(() => {
  //   if (device() == 'desktop' && inputRef) inputRef.focus()
  // })

  return (
    // Wrapper
    <div
      class={
        'flex  h-full py-3 lg:py-4 relative gap-6 rounded-lg bg-[var(--textInputBackgroundColor)] text-[var(--textInputTextColor)] px-6 ' +
          props.class || ''
      }
      data-testid='input'
      onKeyDown={submitWhenEnter}
    >
      {/* Additional left inputs  */}
      <div class='flex items-start h-fit pr-6 border-r border-[var(--borderColor)] lg:mt-2 '>
        <AudioInput onSubmit={setInputValue} />
      </div>

      <Textarea
        ref={inputRef}
        onInput={handleInput}
        value={inputValue()}
        fontSize={props.fontSize}
        disabled={botStore.isAwaitingAnswer}
        placeholder={props.placeholder}
        rows={props.rows}
        onFocusChange={props.onFocusChange}
        class={`lg:h-[38px] lg:focus:h-20  lg:active:h-20  transition-all -mt-0.5 lg:pt-2 ${
          inputValue().length > 0 ? 'active' : ''
        }`}
      />

      {/* Right section, send button */}
      <div
        class='flex flex-col h-full items-end relative '
        style={{
          'justify-content': inputValue().length > 0 ? 'space-between' : 'center',
        }}
      >
        {/* Clear button */}
        <Show when={inputValue().length > 0}>
          <div
            class='animate-fade-in flex items-center text-[var(--primaryColor)] cursor-pointer max-lg:hidden'
            onClick={clearInput}
          >
            <span class='font-bold text-sm underline'>Clear</span>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              class='w-2.5 h-2.5 ml-1.5'
            >
              <rect
                x='0.789062'
                y='0.867188'
                width='8.90385'
                height='8.74768'
                rx='4.37384'
                fill='currentColor'
              />
              <path d='M4.08594 4.0625L6.39767 6.41551' stroke='white' stroke-linecap='round' />
              <path d='M6.43945 4.06335L4.04444 6.41636' stroke='white' stroke-linecap='round' />
            </svg>
          </div>
        </Show>

        <SendButton
          data-testid='submit-question'
          sendButtonColor={
            botStore.isAwaitingAnswer || inputValue() === ''
              ? theme().textSecondary
              : theme().primaryColor
          }
          type='button'
          isDisabled={botStore.isAwaitingAnswer || inputValue() === ''}
          on:click={submit}
        >
          <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
        </SendButton>
      </div>
    </div>
  )
}
const AudioInput = (props: { onSubmit: (value: string) => void }) => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  const audioRecorder = createAudioRecorder({
    onStop: (blob) => handleTranscription(blob),
  })

  const handleTranscription = async (audioBlob: Blob) => {
    try {
      setIsLoading(true)
      console.time('FULL')

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

      props.onSubmit(transcribedText)
    } catch (error) {
      logErrorMessage(error, 'ChatInput.handleTranscription')
    }

    console.timeEnd('FULL')

    setIsLoading(false)
  }

  return (
    <>
      {isLoading() ? (
        <div class='animate-ping rounded-full m-1 h-3 w-3 bg-gray-700' />
      ) : audioRecorder.isRecording() ? (
        <IconButton onClick={audioRecorder.stopRecording}>
          <div class=' animate-pulse m-1 h-3 w-3  ani  bg-gray-700 opacity-75'></div>
        </IconButton>
      ) : (
        <IconButton onClick={audioRecorder.startRecording}>
          <MicrophoneIcon height={20} width={20} />
        </IconButton>
      )}
    </>
  )
}
