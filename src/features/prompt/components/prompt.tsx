import { PromptType } from '@/features/bot'

type PromptProps = {
  prompt: PromptType
  onClick: (prompt: string) => void
  color?: string
  background?: string
  disabled?: boolean
}

export const Prompt = (props: PromptProps) => {
  return (
    <>
      <div
        class='mr-2 py-1 px-4 text-white my-1 inline-block rounded-full'
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          background: props.background,
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
    </>
  )
}
