import { PromptType } from '@/features/bot'

type PromptProps = {
  prompt: PromptType
  onClick: (prompt: string) => void
  background?: string
  color?: string
  borderColor?: string
  disabled?: boolean
  class?: string
}

export const NavigationPrompt = (props: PromptProps) => {
  return (
    <div
      class={'p-5 text-white inline-block  rounded-[10px] ' + props.class}
      style={{
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        background: props.background,
        border: `1px solid ${props.borderColor}`,
        color: props.color,
      }}
      onClick={() =>
        props.disabled
          ? null
          : props.onClick(typeof props.prompt === 'string' ? props.prompt : props.prompt.prompt)
      }
    >
      {typeof props.prompt === 'string' ? props.prompt : props.prompt.display}
    </div>
  )
}
