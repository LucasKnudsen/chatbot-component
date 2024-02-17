import { Component, JSXElement } from 'solid-js'

const LayoutDefault: Component<{ children: JSXElement }> = (props) => {
  return <div class='relative h-screen w-full p-10 lg:p-24'>{props.children}</div>
}

export default LayoutDefault
