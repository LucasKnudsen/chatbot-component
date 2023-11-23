import { useTheme } from '@/features/theme/hooks'
import { createSignal } from 'solid-js'
import { splitTextAtNearestWhitespace } from '../../utils'

type PromptProps = {
  prompt: string
  onClick: (prompt: string) => void

  disabled?: boolean
}

export const Prompt = (props: PromptProps) => {
  const [isHovered, setIsHovered] = createSignal(false)
  const [firstPart, secondPart] = splitTextAtNearestWhitespace(props.prompt)

  const { theme } = useTheme()
  const { primaryColor, borderColor, promptBackground, promptBackgroundHovered, textColor } =
    theme()

  return (
    <>
      <style>
        {`
        .prompt:hover {
          background: ${promptBackgroundHovered};
        }
        .prompt {
          background: ${promptBackground};
        }
      `}
      </style>

      <div
        class='prompt py-2 px-5 rounded-xl border transition duration-200 ease-in-out  w-fit '
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          // TODO: Themme it

          color: textColor,
          'border-color': isHovered() ? primaryColor : borderColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => (props.disabled ? null : props.onClick(props.prompt))}
      >
        <p class='font-light'>{firstPart}</p>
        <p class='font-light'>{secondPart}</p>
      </div>
    </>
  )
}
