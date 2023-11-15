import { SendButton } from '@/components/SendButton'
import { useTheme } from '@/features/theme/hooks'
import { isMobile } from '@/utils/isMobileSignal'
import { createEffect, createSignal, onMount } from 'solid-js'
import { ShortTextInput } from './ShortTextInput'

type Props = {
  defaultValue?: string
  fontSize?: number
  disabled?: boolean
  onSubmit: (value: string) => void
}

export const TextInput = (props: Props) => {
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '')
  let inputRef: HTMLTextAreaElement | undefined

  const { theme } = useTheme()
  const {
    textInputTextColor,
    textInputBackgroundColor,
    textInputSendIconColor,
    textInputPlaceholder,
  } = theme()

  const handleInput = (inputValue: string) => setInputValue(inputValue)

  const checkIfInputIsValid = () => inputValue() !== '' && inputRef?.reportValidity()

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit(inputValue())
    setInputValue('')
  }

  const submitWhenEnter = (e: KeyboardEvent) => {
    // Check if IME composition is in progress
    const isIMEComposition = e.isComposing || e.keyCode === 229
    if (e.key === 'Enter' && !isIMEComposition) submit()
  }

  createEffect(() => {
    if (!props.disabled && !isMobile() && inputRef) inputRef.focus()
  })

  onMount(() => {
    if (!isMobile() && inputRef) inputRef.focus()
  })

  return (
    <div
      class={'flex  justify-between rounded-lg h-24'}
      data-testid='input'
      style={{
        margin: 'auto',
        'background-color': textInputBackgroundColor,
        color: textInputTextColor,
      }}
      onKeyDown={submitWhenEnter}
    >
      <div class='h-full flex-1'>
        <ShortTextInput
          ref={inputRef}
          onInput={handleInput}
          value={inputValue()}
          fontSize={props.fontSize}
          disabled={props.disabled}
          placeholder={textInputPlaceholder}
        />
      </div>
      <SendButton
        sendButtonColor={textInputSendIconColor}
        type='button'
        isDisabled={props.disabled || inputValue() === ''}
        class='my-2 ml-2'
        on:click={submit}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
      </SendButton>
    </div>
  )
}
