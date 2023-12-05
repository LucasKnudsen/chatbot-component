import circleCloseIcon from '@/assets/circle-close-icon.svg'
import logo from '@/assets/logo.png'
import menuIcon from '@/assets/menu-icon.svg'
import { botStoreActions } from '@/features/bot'
import { useTheme } from '@/features/theme/hooks'
import { Show } from 'solid-js'
import { Button } from '.'

type NavProps = {
  sidebarOpen: boolean
  onClear: () => void
  onToggleBot: () => void
  onToggleSidebar: () => void
}

export const Nav = (props: NavProps) => {
  const { theme } = useTheme()

  const resetChat = () => {
    botStoreActions.setChat(null)
    props.onClear()
  }

  return (
    <div
      class='flex flex-wrap items-center mx-5 rounded-full pl-6 pr-3 py-2 mt-5'
      style={{
        background: theme().surfaceBackground,
      }}
    >
      <img src={logo} class='h-6 cursor-pointer' onClick={resetChat} />

      <div class='md:flex-1' />

      <Button onClick={props.onToggleBot} class='hidden md:block ml-4'>
        Close
      </Button>

      <div class='flex-1 md:hidden' />

      <Show
        when={props.sidebarOpen}
        fallback={<img class='md:hidden py-2' onClick={props.onToggleSidebar} src={menuIcon} />}
      >
        <img class='md:hidden' width={24} onClick={props.onToggleSidebar} src={circleCloseIcon} />
      </Show>
    </div>
  )
}
