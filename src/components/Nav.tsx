import { botStore, botStoreActions } from '@/features/bot'
import { Match, Show, Switch } from 'solid-js'
import { Button, ChevronIcon } from '.'

import powerIcon from '@/assets/power-icon.svg'
import { configStoreActions } from '@/features/portal-init'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { useTheme } from '@/features/theme/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { CircleCloseIcon } from './icons/CircleCloseIcon'
import { MenuIcon } from './icons/MenuIcon'

export const Nav = () => {
  const device = useMediaQuery()
  const { theme } = useTheme()

  const onClickLogo = () => {
    botStoreActions.resetActiveChannel()
    suggestedPromptsStoreActions.clear()
  }

  return (
    <div
      class='flex flex-wrap items-center mx-5 rounded-full pl-6 pr-2 py-3.5 mt-5 z-50'
      style={{
        background: theme().surfaceBackground,
      }}
    >
      <div class='flex items-center gap-6 w-full flex-nowrap'>
        <img src={theme().navbarLogoUrl} class='h-6 cursor-pointer' onClick={onClickLogo} />

        {botStore.activeChannel && (
          <>
            <ChevronIcon
              onClick={botStoreActions.resetActiveChannel}
              class='rotate-90 transform cursor-pointer'
              style={{
                color: theme().primaryColor,
              }}
            />

            <p
              class='font-medium '
              style={{
                color: theme().primaryColor,
              }}
            >
              {botStore.activeChannel?.name}
            </p>
          </>
        )}

        {device() == 'desktop' ? (
          <>
            {/* will use if needed */}
            {/* <Button onClick={configStoreActions.toggleBot} class='hidden md:block ml-4'>
              {text().close}
            </Button> */}

            <CircleCloseIcon
              class='cursor-pointer ml-auto'
              height={24}
              color={theme().primaryColor}
              onClick={configStoreActions.toggleBot}
            />
          </>
        ) : (
          <>
            <Show when={!botStore.isSidebarOpen}>
              <div class='flex-1' />

              <Button onClick={configStoreActions.toggleBot} padding='6px' class='animate-fade-in '>
                <img class='m-auto h-3' src={powerIcon} />
              </Button>
            </Show>

            {/* Dont show drawer button if theres no activeChannel  */}
            <Show when={Boolean(botStore.activeChannel)}>
              <div class='flex-1' />

              <Switch>
                <Match when={botStore.isSidebarOpen}>
                  <CircleCloseIcon
                    class='cursor-pointer'
                    height={24}
                    color={theme().primaryColor}
                    onClick={botStore.toggleSidebar}
                  />
                </Match>

                <Match when={!botStore.isSidebarOpen}>
                  <div
                    class='w-10 h-6 flex items-center cursor-pointer'
                    onClick={botStore.toggleSidebar}
                  >
                    <MenuIcon color={theme().primaryColor} />
                  </div>
                </Match>
              </Switch>
            </Show>
          </>
        )}
      </div>
    </div>
  )
}
