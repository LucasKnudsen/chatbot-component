import circleCloseIcon from '@/assets/circle-close-icon.png'
import sidebarTabIcon from '@/assets/sidebar-tab-icon.svg'

import { JSX, createSignal } from 'solid-js'

type SidebarProps = {
  children: JSX.Element
  open: boolean
  class?: string
}

const padding = 40
const innerWidthNum = 256
const innerWidth = innerWidthNum + 'px'
const openWidth = innerWidthNum + padding * 2 + 'px'
const closedWidth = '0px'

export const Sidebar = (props: SidebarProps) => {
  const [open, setIsOpen] = createSignal(true)

  return (
    <div
      class={
        'absolute h-full top-0 right-0 transition-all backdrop-blur bg-white/75 ' + props.class
      }
      style={{
        width: open() ? openWidth : closedWidth,
      }}
    >
      <div
        class='absolute'
        style={{ width: openWidth, left: '-20px', opacity: open() ? '0' : '1' }}
        onClick={() => setIsOpen(!open())}
      >
        <img class='transition-all inline-block' src={sidebarTabIcon} width={20} />
      </div>

      <div
        class='absolute'
        style={{ width: openWidth, left: '-10px', opacity: open() ? '1' : '0' }}
        onClick={() => setIsOpen(!open())}
      >
        <img class='transition-all inline-block' src={circleCloseIcon} width={20} />
      </div>

      <div
        class='opacity-0 hover:opacity-100 transition-opacity py-6'
        style={{
          width: innerWidth,
          opacity: open() ? '1' : '0',
          'margin-left': padding + 'px',
          'margin-right': padding + 'px',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
