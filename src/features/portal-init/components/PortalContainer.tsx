import { useTheme } from '@/features/theme'
import { JSX } from 'solid-js'
import { configStore } from '..'

export const PortalContainer = (props: { children: JSX.Element }) => {
  const { theme } = useTheme()

  return (
    <div
      class={`fixed animate-fade-in top-0 left-0 w-screen m-0 min-h-[-webkit-fill-available] h-full ${
        configStore.isBotOpened ? 'opacity-1' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        transition: 'transform 350ms cubic-bezier(0, 1.2, 1, 1), opacity 250ms ease-out',
        'transform-origin': 'bottom right',
        transform: configStore.isBotOpened ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
        color: theme().textColor,
        background: `url(${theme().backgroundImageUrl}) no-repeat center center / cover ${
          theme().backgroundColor
        }`,

        'z-index': 69420,
      }}
      part='bot'
    >
      <div
        class='absolute inset-0 w-full h-full'
        style={{
          background: theme().backgroundOverlay,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
