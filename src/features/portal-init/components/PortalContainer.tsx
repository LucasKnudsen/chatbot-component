import { JSX } from 'solid-js'
import { authStore } from '@/features/authentication/authStore'
import { configStore } from '..'
import { useTheme } from '@/features/theme'

export const PortalContainer = (props: { children: JSX.Element }) => {
  const { theme } = useTheme()

  console.log(authStore.isAuthenticated)

  return (
    <div
      class={`fixed animate-fade-in top-0 left-0 w-screen m-0 min-h-[-webkit-fill-available] h-full ${
        configStore.isBotOpened ? 'opacity-1' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        transition: 'transform 350ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
        'transform-origin': 'bottom right',
        transform: configStore.isBotOpened ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
        color: theme().textColor,
        background: authStore.isAuthenticated
          ? `url(${theme().backgroundImageUrl}) no-repeat center center / cover`
          : `linear-gradient(to bottom, rgba(223, 221, 232, 0.8), rgba(223, 221, 232, 0.8)),
        url(${theme().backgroundImageUrl}) no-repeat center center / cover`,

        'z-index': 69420,
      }}
      part='bot'
    >
      {props.children}
    </div>
  )
}
