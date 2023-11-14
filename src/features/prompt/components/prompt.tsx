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
        class='mr-2 py-1 px-6 my-1 inline-block rounded-xl flex items-center'
        style={{
          height: '55px',
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          background: props.surfaceColor,
        }}
        onClick={() => (props.disabled ? null : props.onClick(props.prompt))}
      >
        <p class='text-base' style={{ color: props.textColor, 'white-space': 'pre-line' }}>
          {props.prompt}
        </p>
      </div>
    </>
  )
}
