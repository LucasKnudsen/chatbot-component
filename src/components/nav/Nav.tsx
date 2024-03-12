import { botStore, botStoreActions } from '@/features/bot'
import { Match, Show, Switch } from 'solid-js'

import powerIcon from '@/assets/power-icon.svg'
import { configStoreActions } from '@/features/portal-init'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { useTheme } from '@/features/theme/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Button } from '..'
import { CircleCloseIcon } from '../icons/CircleCloseIcon'
import { MenuIcon } from '../icons/MenuIcon'
import { ChannelMenu } from './ChannelMenu'

export const Nav = () => {
  const device = useMediaQuery()
  const { theme } = useTheme()

  const onClickLogo = () => {
    botStoreActions.resetActiveChannel()
    suggestedPromptsStoreActions.clear()
  }

  return (
    <div class='pt-5 md:pt-10 px-5 md:px-10'>
      <div
        class='flex flex-wrap items-center rounded-full p-2.5 sm:pl-6 sm:pr-2 sm:py-3.5 z-50'
        style={{
          background: theme().surfaceBackground,
        }}
      >
        <div class='flex items-center gap-6 w-full flex-nowrap'>
          <img src={theme().navbarLogoUrl} class='h-6 cursor-pointer' onClick={onClickLogo} />

          <Show when={botStore.activeChannel}>
            <svg
              width='2'
              height='26'
              viewBox='0 0 2 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1L1 25'
                style={{
                  stroke: theme().primaryColor,
                }}
                stroke-linecap='round'
              />
            </svg>

            <ChannelMenu />

            {/* will use if needed */}
            {/* <p
                class='font-medium '
                style={{
                  color: theme().primaryColor,
                }}
              >
                {botStore.activeChannel?.name}
              </p> */}
          </Show>
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

                <Button
                  onClick={configStoreActions.toggleBot}
                  padding='6px'
                  class='border border-[var(--onPrimary)] animate-fade-in'
                >
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
    </div>
  )
}
