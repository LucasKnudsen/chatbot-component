import { useTheme } from '@/features/theme/hooks'
import { splitTextAtNearestWhitespace } from '../../utils'

type PromptProps = {
  prompt: string
  onClick: (prompt: string) => void
  disabled?: boolean
}

export const Prompt = (props: PromptProps) => {
  const [firstPart, secondPart] = splitTextAtNearestWhitespace(props.prompt)

  const { theme } = useTheme()
  const { textColor } = theme()

  return (
    <>
      <div
        data-testid='suggested-prompt'
        class='flex flex-col justify-center prompt text-xs md:text-sm py-1 md:py-2 px-3 md:px-5 rounded-lg transition duration-200 ease-in-out w-fit '
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          color: textColor,
          border: `1px solid ${theme().borderColor}`,
        }}
        onClick={() => (props.disabled ? null : props.onClick(props.prompt))}
      >
        <p class='font-light'>{firstPart}</p>
        <p class='font-light'>{secondPart}</p>
      </div>
    </>
  )
}
