type PromptProps = {
  prompt: string
  onClick: (prompt: string) => void
  backgroundColor?: string
}

export const Prompt = (props: PromptProps) => {
  return (
    <>
      <div
        class='mr-2 py-1 px-4 text-white my-1 inline-block rounded-full'
        onClick={() => props.onClick(props.prompt)}
        style={{
          background: props.backgroundColor,
        }}
      >
        {props.prompt}
      </div>
    </>
  )
}
