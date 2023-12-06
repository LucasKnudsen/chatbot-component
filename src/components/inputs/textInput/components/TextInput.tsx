import { SendButton } from '@/components/SendButton'
import { useTheme } from '@/features/theme/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { createEffect, createSignal, onMount } from 'solid-js'
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

  // const onFocus = () => {
  //   setTimeout(() => {
  //     if (window.scrollY > 150) return
  //     botStoreActions.updateAnswer('', true)

  //     // window.scrollTo({
  //     //   top: document.body.scrollHeight,
  //     //   behavior: 'smooth',
  //     // })
  //   }, 100)
  // }

  // const onBlur = () => {
  //   setTimeout(() => {
  //     botStoreActions.updateAnswer('', true)
  //   }, 100)
  // }

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
        sendButtonColor={theme().textSecondary}
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
