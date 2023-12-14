import { botStoreActions } from '@/features/bot'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { Show } from 'solid-js'
import { Button } from '.'
import { CircleCloseIcon } from './icons/CircleCloseIcon'
import { MenuIcon } from './icons/MenuIcon'

type NavProps = {
  sidebarOpen: boolean
  onClear: () => void
  onToggleBot: () => void
  onToggleSidebar: () => void
}

export const Nav = (props: NavProps) => {
  const { theme } = useTheme()
  const { text } = useText()

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
      <img src={theme().customIconSrc} class='h-6 cursor-pointer' onClick={resetChat} />

      <div class='md:flex-1' />

      <Button onClick={props.onToggleBot} class='hidden md:block ml-4'>
        {text().close}
      </Button>

      <div class='flex-1 md:hidden' />

      <Show
        when={props.sidebarOpen}
        fallback={
          <div onClick={props.onToggleSidebar}>
            <MenuIcon class='md:hidden' color={theme().primaryColor} />
          </div>
        }
      >
        <CircleCloseIcon
          class='md:hidden'
          height={24}
          color={theme().primaryColor}
          onClick={props.onToggleSidebar}
        />
      </Show>
    </div>
  )
}
