import { Divider } from '@/components/Divider'
import { CircleCloseRightIcon } from '@/components/icons/CircleCloseRightIcon'
import { CircleLinkIcon } from '@/components/icons/CircleLinkIcon'
import { useTheme } from '@/features/theme/hooks'
import { JSX } from 'solid-js'
import { sidebarInnerWidthNum, sidebarPaddingNum } from '../constants'

type ResourcesSidebarProps = {
  open: boolean
  toggle: () => void
  children: JSX.Element
}

export const ResourcesSidebar = (props: ResourcesSidebarProps) => {
  const { theme } = useTheme()

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
        class='absolute cursor-pointer'
        style={{
          top: '25px',
          left: '0px',
          width: '20px',
          opacity: props.open ? '0' : '1',
        }}
        onClick={props.toggle}
      >
        <CircleLinkIcon width={25} color={theme().primaryColor} />
      </div>

      <div
        class='absolute cursor-pointer'
        style={{
          top: '25px',
          left: '-9px',
          opacity: props.open ? '1' : '0',
          'pointer-events': props.open ? 'auto' : 'none',
        }}
        onClick={props.toggle}
      >
        <CircleCloseRightIcon width={25} color={theme().primaryColor} />
      </div>
    </div>
  )
}
