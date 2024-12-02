import { JSX } from 'solid-js'

export const AuthInputField = (props: {
  label: string
  Icon: (props: JSX.SvgSVGAttributes<SVGSVGElement>) => JSX.Element
  value: string
  onChange: (value: string) => void
  onKeyPress?: () => void
  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>
}) => {
  let inputRef: HTMLInputElement

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      props.onKeyPress?.()
    }
  }

  return (
    <div
      class='flex items-center py-3 border-b border-b-[var(--borderColor)] '
      onClick={() => inputRef?.focus()}
    >
      <label class='flex items-center min-w-40 tracking-wider font-medium text-sm'>
        <props.Icon class='text-[var(--primaryColor)]' />
        <span class='px-3.5'>{props.label}</span>
      </label>

      <input
        ref={(el) => (inputRef = el)}
        type='text'
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        {...props.inputProps}
        class='flex w-full p-0 px-3 h-11 tracking-wider text-[var(--textColor)]'
      />
    </div>
  )
}
