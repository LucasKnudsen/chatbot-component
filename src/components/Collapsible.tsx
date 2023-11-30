import { JSX } from 'solid-js'

type CollapsibleProps = {
  open: boolean
  children: JSX.Element
}

export const Collapsible = (props: CollapsibleProps) => {
  let ref: HTMLDivElement | undefined

  // Function to get the height of the children content
  const getContentHeight = () => (ref ? ref.scrollHeight + 'px' : '0')

  return (
    <div
      ref={ref}
      style={{
        height: props.open ? getContentHeight() : '0',
      }}
      class='transition-all ease-in-out duration-300 overflow-hidden'
    >
      {props.children}
    </div>
  )
}
