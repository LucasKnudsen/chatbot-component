import { useTheme } from '@/features/theme'
import { JSX } from 'solid-js'
import { configStore } from '../portal-init'


export const OneClickContainer = (props: { children: JSX.Element }) => {
  // Wrapper for the One Click Bot. This should "open" and "close" the bot depending on configStore.isBotOpened
  // Look in PortalContainer for inspo
  const { theme } = useTheme()

  return (
    <div
      class={`fixed animate-fade-in top-0 left-0 w-screen md:rounded-xl lg:w-[400px] xl:w-[450px] lg:shadow-xl xl:h-[80vh] xl:max-h-[700px] xxl:h-[85vh] lg:top-auto lg:left-auto lg:right-[20px] lgd:border lg:bottom-[20px] m-0 min-h-[-webkit-fill-available] lg:min-h-[200px] lg:border h-full ${
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
      {props.children}
    </div>
  )
}
