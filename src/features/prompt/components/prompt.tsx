type PromptProps = {
  prompt: string
  onClick: (prompt: string) => void
  backgroundColor?: string
  disabled?: boolean
}

export const Prompt = (props: PromptProps) => {
  return (
    <>
      <div
        class='mr-2 py-1 px-4 text-white my-1 inline-block rounded-full'
        style={{
          cursor: props.disabled ? 'not-allowed' : 'pointer',
          background: props.backgroundColor,
        }}
        onClick={() => (props.disabled ? null : props.onClick(props.prompt))}
      >
        {props.prompt}
      </div>
    </>
  )
}
