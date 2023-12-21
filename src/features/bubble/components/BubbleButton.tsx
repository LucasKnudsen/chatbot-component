import { useTheme } from '@/features/theme/hooks'

type Props = {
  isBotOpened: boolean
  toggleBot: () => void
}

export const BubbleButton = (props: Props) => {
  const { theme } = useTheme()

  return (
    <button
      data-testid='bubble-button'
      part='button'
      onClick={() => props.toggleBot()}
      class='fixed right-5 bottom-5  shadow-lg rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in w-14 h-14'
      style={{
        background: theme().bubbleButtonColor,
        'z-index': 69419,
      }}
    >
      <img
        class={
          `stroke-2  absolute duration-200 transition w-7 ` +
          (props.isBotOpened ? 'scale-0 opacity-0' : 'scale-100 opacity-100')
        }
        src={theme().bubbleButtonLogoUrl || theme().navbarLogoUrl}
      />

      <svg
        viewBox='0 0 24 24'
        style={{ fill: theme().onPrimary }}
        class={
          `absolute duration-200 transition  w-5` +
          (props.isBotOpened ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-180 opacity-0')
        }
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z'
        />
      </svg>
    </button>
  )
}
