import sidebarIcon from '@/assets/sidebar-icon.svg'
import { JSX, createSignal } from 'solid-js'

type SidebarProps = {
  children: JSX.Element
  open: boolean
  class?: string
}

const openWidth = '320px'
const closedWidth = '20px'

export const Sidebar = (props: SidebarProps) => {
  const [open, setIsOpen] = createSignal(props.open)

  return (
    <div
      class={'h-full w-10 hover:w-80 transition-all overflow-hidden ' + props.class}
      style={{
        width: open() ? openWidth : closedWidth,
      }}
    >
      <div class='mb-2' style={{ width: openWidth }} onClick={() => setIsOpen(!open())}>
        <img
          class='transition-all rotate-180'
          src={sidebarIcon}
          width={20}
          style={{
            '--tw-rotate': open() ? '0deg' : '180deg',
          }}
        />
      </div>

      <div
        class='opacity-0 hover:opacity-100 transition-opacity pr-5'
        style={{ width: openWidth, opacity: open() ? '1' : '0' }}
      >
        {props.children}
      </div>
    </div>
  )
}
