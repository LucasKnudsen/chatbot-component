import { PromptType } from '@/features/bot'
import { useTheme } from '@/features/theme/hooks'

type PromptProps = {
  prompt: PromptType
  onClick: (prompt: string) => void
  disabled?: boolean
  class?: string
}

export const NavigationPrompt = (props: PromptProps) => {
  const { theme } = useTheme()
  const surfaceHoveredBackground = theme().surfaceHoveredBackground
  const surfaceBackground = theme().surfaceBackground

  return (
    <>
      <style>
        {`
        .navigation-prompt:hover {
          background: ${surfaceHoveredBackground};
        }
        .navigation-prompt {
          background: ${surfaceBackground};
        }
      `}
      </style>
      <div
        class={'navigation-prompt p-4 text-white inline-block rounded-[10px]  ' + props.class}
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',

          border: `1px solid ${theme().borderColor}`,
          color: theme().textColor,
        }}
        onClick={() =>
          props.disabled
            ? null
            : props.onClick(typeof props.prompt === 'string' ? props.prompt : props.prompt.prompt)
        }
      >
        {typeof props.prompt === 'string' ? props.prompt : props.prompt.display}
      </div>
    </>
  )
}
