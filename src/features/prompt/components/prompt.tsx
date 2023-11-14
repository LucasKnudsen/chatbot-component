type PromptProps = {
  prompt: string
  onClick: (prompt: string) => void
  surfaceColor?: string
  textColor?: string
  disabled?: boolean
}

export const Prompt = (props: PromptProps) => {
  return (
    <>
      <div
        class='py-2 px-6 my-1 rounded-xl border border-solid'
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          width: 'auto',
          // TODO: Themme it
          background: props.surfaceColor,
          'border-color': '#93939340',
        }}
        onClick={() => (props.disabled ? null : props.onClick(props.prompt))}
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
