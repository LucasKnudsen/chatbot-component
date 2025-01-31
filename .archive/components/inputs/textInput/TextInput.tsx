import { useTheme } from '@/features/theme'
import { JSX } from 'solid-js'

type TextInputProps = {
  value: string
  onChange: (value: string) => void
  label?: string
  labelProps?: JSX.LabelHTMLAttributes<HTMLLabelElement>
  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>
}

export const TextInput = (props: TextInputProps) => {
  const { theme } = useTheme()

  return (
    <div>
      <label
        class='block mb-2 text-sm font-medium '
        style={{
          color: theme().textColor,
        }}
        {...props.labelProps}
      >
        {props.label}
      </label>

      <input
        class=' border sm:text-sm rounded-lg block w-full p-2.5 '
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        style={{
          background: theme().textInputBackgroundColor,
          color: theme().textInputTextColor,
          'border-color': theme().borderColor,
          'outline-color': theme().primaryColor,
        }}
        {...props.inputProps}
      />
    </div>
  )
}
