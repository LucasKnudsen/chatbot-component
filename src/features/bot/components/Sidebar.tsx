import circleCloseIcon from '@/assets/circle-close-icon.png'
import sidebarTabIcon from '@/assets/sidebar-tab-icon.svg'

import { JSX } from 'solid-js'
import { sidebarInnerWidthNum, sidebarPaddingNum } from '../constants'

type SidebarProps = {
  children: JSX.Element
  open: boolean
  onToggle: () => void
  class?: string
}

const innerWidth = sidebarInnerWidthNum + 'px'
const openWidth = sidebarInnerWidthNum + sidebarPaddingNum * 2 + 'px'
const closedWidth = '0px'

export const Sidebar = (props: SidebarProps) => {
  return (
    <div
      class={
        'absolute h-full top-0 right-0 transition-all backdrop-blur-md bg-white/75 ' + props.class
      }
      style={{
        width: props.open ? openWidth : closedWidth,
      }}
    >
      <div
        class='absolute cursor-pointer'
        style={{ left: '-20px', opacity: props.open ? '0' : '1' }}
        onClick={props.onToggle}
      >
        <img class='transition-all inline-block' src={sidebarTabIcon} width={20} />
      </div>

      <div
        class='absolute cursor-pointer'
        style={{ left: '-10px', opacity: props.open ? '1' : '0' }}
        onClick={props.onToggle}
      >
        <img class='transition-all inline-block' src={circleCloseIcon} width={20} />
      </div>

      <div
        class='opacity-0 hover:opacity-100 transition-opacity py-6'
        style={{
          width: innerWidth,
          opacity: props.open ? '1' : '0',
          'margin-left': sidebarPaddingNum + 'px',
          'margin-right': sidebarPaddingNum + 'px',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
