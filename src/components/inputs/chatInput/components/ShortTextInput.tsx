import { splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'

type ShortTextInputProps = {
  ref: HTMLTextAreaElement | undefined
  onInput: (value: string) => void
  onFocusChange?: (value: boolean) => void
  fontSize?: number
  disabled?: boolean
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'>

export const Textarea = (props: ShortTextInputProps) => {
  const [local, others] = splitProps(props, ['ref', 'onInput', 'class'])

  return (
    <textarea
      ref={props.ref}
      data-testid='question-input'
      class={
        'question-input outline-none bg-transparent flex-1 w-full text-input disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 textarea-hide-handle ' +
        'lg:focus:h-28 lg:active:h-28 ' +
        props.class
      }
      disabled={props.disabled}
      style={{ 'font-size': props.fontSize ? `${props.fontSize}px` : '16px' }}
      onInput={(e) => local.onInput(e.currentTarget.value)}
      onFocus={() => props.onFocusChange?.(true)}
      onBlur={() => props.onFocusChange?.(false)}
      {...others}
    />
  )
}
