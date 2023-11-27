import circleCloseRightIcon from '@/assets/circle-close-right-icon.svg'
import circleLinkIcon from '@/assets/circle-link-icon.svg'
import { Divider } from '@/components/Divider'
import { JSX } from 'solid-js'
import { sidebarInnerWidthNum, sidebarPaddingNum } from '../constants'

type ResourcesSidebarProps = {
  open: boolean
  toggle: () => void
  children: JSX.Element
}

export const ResourcesSidebar = (props: ResourcesSidebarProps) => {
  return (
    <div
      class='flex relative transition-all'
      style={{
        width: props.open ? sidebarInnerWidthNum + sidebarPaddingNum + 1 + 'px' : '0',
      }}
    >
      <Divider vertical margin={0} />

      <div
        class='overflow-hidden'
        style={{ width: sidebarInnerWidthNum + sidebarPaddingNum + 'px' }}
      >
        {props.children}
      </div>

      <div
        class='absolute cursor-pointer z-10'
        style={{
          top: '20px',
          left: '-2px',
          width: '20px',
          opacity: props.open ? '0' : '1',
        }}
        onClick={props.toggle}
      >
        <img class='transition-all inline-block' src={circleLinkIcon} width={20} />
      </div>

      <div
        class='absolute cursor-pointer'
        style={{
          top: '20px',
          left: '-10px',
          opacity: props.open ? '1' : '0',
          'pointer-events': props.open ? 'auto' : 'none',
        }}
        onClick={props.toggle}
      >
        <img class='transition-all inline-block' src={circleCloseRightIcon} width={20} />
      </div>
    </div>
  )
}
