import { useTheme } from '@/features/theme/hooks'
import { createSignal } from 'solid-js'

type PromptProps = {
  prompt: string
  onClick: (prompt: string) => void
  color?: string
  background?: string

  disabled?: boolean
}

export const Prompt = (props: PromptProps) => {
  const [isHovered, setIsHovered] = createSignal(false)

  const { theme } = useTheme()
  const { primaryColor, borderColor } = theme()

  return (
    <>
      <div
        class='py-2 px-5 rounded-[10px] border transition duration-200 ease-in-out'
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          // TODO: Themme it
          background: props.background,
          color: props.color,
          'border-color': isHovered() ? primaryColor : borderColor,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => (props.disabled ? null : props.onClick(props.prompt))}
      >
        <p class='text-bast whitespace-pre-line font-normal '>{props.prompt}</p>
      </div>
    </>
  )
}
