import { JSX } from 'solid-js'

type SidebarProps = {
  children: JSX.Element
  class?: string
}

export const Sidebar = (props: SidebarProps) => {
  return <div class={' ' + props.class}>{props.children}</div>
}
