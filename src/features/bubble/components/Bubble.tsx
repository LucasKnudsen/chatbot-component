import { createSignal, onMount, Show } from 'solid-js'
import { BotConfig, BotManager } from '../../bot/components/Bot'

import StyleSheet from '@/styles'
import { BubbleButton } from './BubbleButton'

export const Bubble = (props: BotConfig) => {
  const [isBotStarted, setIsBotStarted] = createSignal(false)
  const [isBotOpened, setIsBotOpened] = createSignal(false)

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true)
    setIsBotOpened(true)
  }

  const closeBot = () => {
    setIsBotOpened(false)
  }

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot()
  }

  onMount(() => {
    if (props.settings?.autoOpen) {
      openBot()
    }
  })

  return (
    <>
      <StyleSheet />
      <style>{isBotOpened() ? 'body { overflow: hidden; }' : ''}</style>

      <BubbleButton toggleBot={toggleBot} isBotOpened={isBotOpened()} />

      <div
        class={`fixed top-0 left-0 w-screen m-0 min-h-[-webkit-fill-available] h-full ${
          isBotOpened() ? 'opacity-1' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'transform 350ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
        }}
        part='bot'
      >
        <Show when={isBotStarted()}>
          <BotManager {...props} toggleBot={toggleBot} />
        </Show>
      </div>
    </>
  )
}
