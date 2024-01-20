import powerIcon from '@/assets/power-icon.svg'

import { botStore, botStoreActions } from '@/features/bot'
import { configStoreActions } from '@/features/portal-init'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Show, Switch } from 'solid-js'
import { Button } from '.'
import { CircleCloseIcon } from './icons/CircleCloseIcon'
import { MenuIcon } from './icons/MenuIcon'

export const Nav = () => {
  const device = useMediaQuery()
  const { theme } = useTheme()
  const { text } = useText()

  const onClickLogo = () => {
    botStoreActions.resetActiveChannel()
  }

  return (
    <div
      class='flex flex-wrap items-center mx-5 rounded-full pl-6 pr-3 py-2 mt-5'
      style={{
        background: theme().surfaceBackground,
      }}
    >
      <div class='flex items-center gap-6 w-full flex-nowrap'>
        <img src={theme().navbarLogoUrl} class='h-6 cursor-pointer' onClick={onClickLogo} />

        {device() == 'desktop' ? (
          <>
            <div class='flex-1' />

            <Button onClick={configStoreActions.toggleBot} class='hidden md:block ml-4'>
              {text().close}
            </Button>
          </>
        ) : (
          <>
            <Show when={!botStore.isSidebarOpen}>
              <div class='flex-1' />

              <Button onClick={configStoreActions.toggleBot} padding='7px' class='animate-fade-in '>
                <img class='m-auto h-3' src={powerIcon} />
              </Button>
            </Show>

            {/* Dont show drawer button if theres no activeChannel  */}
            <Show when={Boolean(botStore.activeChannel)}>
              <div class='flex-1' />

              <Switch>
                <Match when={botStore.isSidebarOpen}>
                  <CircleCloseIcon
                    height={24}
                    color={theme().primaryColor}
                    onClick={botStore.toggleSidebar}
                  />
                </Match>

                <Match when={!botStore.isSidebarOpen}>
                  <div class='h-6 flex items-center' onClick={botStore.toggleSidebar}>
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
