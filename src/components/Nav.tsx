import { Button, ChevronIcon } from '.'
import { Match, Show, Switch } from 'solid-js'
import { botStore, botStoreActions } from '@/features/bot'

import { CircleCloseIcon } from './icons/CircleCloseIcon'
import { MenuIcon } from './icons/MenuIcon'
import { configStoreActions } from '@/features/portal-init'
import powerIcon from '@/assets/power-icon.svg'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'

export const Nav = () => {
  const device = useMediaQuery()
  const { theme } = useTheme()
  const { text } = useText()

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
        {/* will use if needed */}
        {/* <img src={theme().navbarLogoUrl} class='h-6 cursor-pointer' onClick={onClickLogo} /> */}
        <svg
          width='25'
          height='25'
          viewBox='0 0 25 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={onClickLogo}
        >
          <path
            d='M24.3074 0.00235507H4.46668C3.8493 0.00235507 3.2776 0.333243 2.9695 0.871378L0.23754 5.62627C0.202394 5.68868 0.170764 5.75109 0.143819 5.81586C-0.0623666 6.23977 -0.0506515 6.93098 0.203566 7.30073C0.214109 7.32193 0.225824 7.34312 0.23754 7.36314L3.11125 12.3665C3.36312 12.8045 3.82821 13.0742 4.33079 13.0742H8.70872C9.32024 13.0742 9.70333 13.7395 9.39756 14.2729L8.79892 15.3151L7.65553 17.3051L7.54541 17.497L7.41069 17.7314L7.22442 18.0552C6.962 18.5109 6.962 19.0726 7.22442 19.5283L7.88632 20.6811L9.19138 22.9537L10.1719 24.66C10.432 25.1133 11.0834 25.1133 11.3446 24.66L13.697 20.5645C13.7099 20.5421 13.7204 20.5186 13.7286 20.4939L14.5124 19.1244C14.5335 19.0985 14.5545 19.0726 14.5709 19.0431L17.5618 13.8361C17.6251 13.7266 17.6426 13.6088 17.6251 13.4993C17.5993 13.265 17.406 13.0612 17.1412 13.0612H11.0916C10.4707 13.0612 9.89663 12.728 9.58618 12.1875L8.58219 10.44C8.56814 10.4153 8.55291 10.3929 8.53651 10.3706L7.83711 9.18597C7.8336 9.153 7.82423 9.1212 7.80666 9.08941L6.962 7.61749L6.61757 7.00164C6.50394 6.68841 6.73238 6.33868 7.08149 6.33868H21.4664C21.7148 6.33868 21.9432 6.20562 22.0674 5.99013L23.3256 3.79874C23.3432 3.76694 23.3537 3.73515 23.3561 3.70218L23.8868 2.8202L24.906 1.04683C25.1731 0.581703 24.8392 0 24.305 0L24.3074 0.00235507Z'
            fill='#5B93FF'
          />
        </svg>

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
