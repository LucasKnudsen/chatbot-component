import { useTheme } from '@/features/theme/hooks'
import { createSignal, onMount, Show } from 'solid-js'
import { configStore, configStoreActions } from '..'

export const PortalButton = () => {
  const { theme } = useTheme()

  return (
    <Show when={!theme().overridePortalButtonUrl} fallback={<CustomPortalButton />}>
      <button
        data-testid='bubble-button'
        part='button'
        onClick={() => configStoreActions.toggleBot()}
        class='fixed right-5 bottom-5  shadow-lg rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in w-14 h-14'
        style={{
          background: theme().bubbleButtonColor,
          'z-index': 69419,
        }}
      >
        <img
          class={
            `stroke-2  absolute duration-200 transition w-7 ` +
            (configStore.isBotOpened ? 'scale-0 opacity-0' : 'scale-100 opacity-100')
          }
          src={theme().bubbleButtonLogoUrl || theme().navbarLogoUrl}
        />

        <svg
          viewBox='0 0 24 24'
          style={{ fill: theme().onPrimary }}
          class={
            `absolute duration-200 transition  w-5` +
            (configStore.isBotOpened
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-0 -rotate-180 opacity-0')
          }
        >
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z'
          />
        </svg>

        <Show when={configStore.chatSpaceConfig.settings?.isSpeechBubbleEnabled}>
          <SpeechBubble />
        </Show>
      </button>
    </Show>
  )
}

const CustomPortalButton = () => {
  const [imageSize, setImageSize] = createSignal<{ width: number } | null>(null)
  const { theme } = useTheme()

  onMount(() => {
    const img = new Image()
    img.src = theme().overridePortalButtonUrl!
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height })
    }
  })

  return (
    <button
      onClick={() => configStoreActions.toggleBot()}
      class='fixed right-0 bottom-0 hover:scale-105 active:scale-95 transition-transform duration-200 animate-fade-in'
      style={{
        'transform-origin': 'bottom right',
        'z-index': 69419,
      }}
    >
      {imageSize() && (
        <img
          class={
            `object-contain duration-200 transition ` +
            (configStore.isBotOpened ? 'scale-0 opacity-0' : 'scale-100 opacity-100')
          }
          src={theme().overridePortalButtonUrl!}
          style={{ width: `${imageSize()?.width}px` }}
        />
      )}
    </button>
  )
}

const SpeechBubble = () => {
  const [show, setShow] = createSignal(false)

  const settings = configStore.chatSpaceConfig.settings

  onMount(() => {
    setTimeout(() => {
      setShow(true)
    }, settings?.speechBubbleDelay || 0)
  })

  // Start a delay to start the animation

  return (
    <Show when={show()}>
      <div class='absolute origin-right top-0 left-0 w-24 rounded-md'>
        <p class='text-xs '>{settings?.speechBubbleText}</p>
      </div>
    </Show>
  )
}
