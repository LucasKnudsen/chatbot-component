import { createSignal } from 'solid-js'

type PromptProps = {
  prompt: string
  onClick: (prompt: string) => void
  surfaceColor?: string
  textColor?: string
  disabled?: boolean
}

export const Prompt = (props: PromptProps) => {
  const [isHovered, setIsHovered] = createSignal(false)

  return (
    <>
      <div
        class='py-2 px-6 my-1 rounded-xl border border-solid transition duration-100 ease-in-out'
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          // TODO: Themme it
          background: props.surfaceColor,
          'border-color': isHovered() ? '#5B93FF' : '#93939340',
        }}
        onClick={() => (props.disabled ? null : props.onClick(props.prompt))}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p
          class='text-bast whitespace-pre-line'
          style={{ color: props.textColor, 'font-weight': 300 }}
        >
          {props.prompt}
        </p>
      </div>
    </>
  )
}
