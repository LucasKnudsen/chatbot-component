import { splitProps } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'

type ShortTextInputProps = {
  ref: HTMLTextAreaElement | undefined
  onInput: (value: string) => void
  fontSize?: number
  disabled?: boolean
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'>

export const ShortTextInput = (props: ShortTextInputProps) => {
  const [local, others] = splitProps(props, ['ref', 'onInput'])

  return (
    <textarea
      ref={props.ref}
      class='focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 textarea-hide-handle'
      disabled={props.disabled}
      style={{ 'font-size': props.fontSize ? `${props.fontSize}px` : '16px' }}
      onInput={(e) => local.onInput(e.currentTarget.value)}
      {...others}
    />
  )
}
