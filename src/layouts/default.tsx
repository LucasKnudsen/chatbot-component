import { JSX } from 'solid-js'

function LayoutDefault(props: { children: JSX.Element }) {
  return <div class='relative h-screen w-full p-10 lg:p-24'>{props.children}</div>
}

export default LayoutDefault
