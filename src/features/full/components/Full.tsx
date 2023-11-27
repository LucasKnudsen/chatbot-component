import { Bot, BotProps } from '@/features/bot/components/Bot'

import { Show, createSignal, onCleanup, onMount } from 'solid-js'
import styles from '../../../index.css?inline'

export type FullProps = BotProps

export const Full = (props: FullProps, options?: { element: HTMLElement }) => {
  const isWebComponent = !!options

  const [isBotDisplayed, setIsBotDisplayed] = createSignal(!isWebComponent)

  const launchBot = () => {
    setIsBotDisplayed(true)
  }

  const botLauncherObserver = new IntersectionObserver((intersections) => {
    if (intersections.some((intersection) => intersection.isIntersecting)) launchBot()
  })

  onMount(() => {
    if (isWebComponent) {
      botLauncherObserver.observe(options.element)
    }
  })

  onCleanup(() => {
    if (isWebComponent) {
      botLauncherObserver.disconnect()
    }
  })

  return (
    <>
      {isWebComponent && <style>{styles}</style>}
      <Show when={isBotDisplayed()}>
        <div class='h-screen w-full'>
          <Bot {...props} />
        </div>
      </Show>
    </>
  )
}
