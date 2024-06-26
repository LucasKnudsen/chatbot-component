import { botStore, botStoreActions } from '@/features/bot'
import { Show } from 'solid-js'

import powerIcon from '@/assets/power-icon.svg'
import { configStore, configStoreActions } from '@/features/portal-init'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { useTheme } from '@/features/theme/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Button, Menu2Icon } from '..'
import { ChannelMenu } from './ChannelMenu'

export const Nav = () => {
  const device = useMediaQuery()
  const { theme } = useTheme()
  const { chatSpaceConfig } = configStore

  const onClickLogo = () => {
    botStoreActions.resetActiveChannel()
    suggestedPromptsStoreActions.clear()
  }

  const handleRenderContentBar = () => {
    if (chatSpaceConfig.isOneClick) {
      return (
        <div class='flex relative items-center w-full justify-center'>
          <img src={theme().navbarLogoUrl} class='h-6 cursor-pointer' />

          <Button
            onClick={configStoreActions.toggleBot}
            padding='6px'
            class='!absolute top-0 right-0 border border-[var(--onPrimary)] animate-fade-in'
          >
            <img class='m-auto h-3' src={powerIcon} />
          </Button>
        </div>
      )
    }

    return (
      <div class='flex items-center  w-full flex-nowrap justify-between'>
        <div class='flex gap-6'>
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
          </Show>
        </div>
        <Button
          onClick={configStoreActions.toggleBot}
          padding='6px'
          class='border border-[var(--onPrimary)] animate-fade-in'
        >
          <img class='m-auto h-4' src={powerIcon} />
        </Button>
      </div>
    )
  }

  return (
    <div class='flex items-center w-full pt-4 lg:pt-10 px-5 lg:px-10 xl:px-5'>
      <div
        class='flex flex-wrap items-enter rounded-full p-2.5 sm:pl-6 sm:pr-2 sm:py-2.5 z-50 w-full'
        style={{
          background: theme().surfaceBackground,
        }}
      >
        {handleRenderContentBar()}
      </div>
      {!chatSpaceConfig.isOneClick && (
        <Show when={botStore.activeChannel && device() !== 'desktop'}>
          <button class='ml-6 mt-2' onClick={configStoreActions.toggleDrawer}>
            <Menu2Icon class='text-[var(--primaryColor)]' />
          </button>
        </Show>
      )}
    </div>
  )
}
