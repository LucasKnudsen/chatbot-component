import { createSignal, onMount, Show } from 'solid-js'
import styles from '../../../index.css?inline'
import { Bot, BotProps } from '../../bot/components/Bot'

import StyleSheet from '@/styles'
import { BubbleButton } from './BubbleButton'

export const Bubble = (props: BotProps) => {
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
    if (import.meta.env.DEV) {
      openBot()
    }
  })

  return (
    <>
      <style>{styles}</style>
      <StyleSheet />

      <BubbleButton toggleBot={toggleBot} isBotOpened={isBotOpened()} />

      <div
        class={`fixed top-0 left-0 w-screen h-screen m-0 ${
          isBotOpened() ? 'opacity-1' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'transform 350ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'z-index': 42424242,
        }}
        part='bot'
      >
        <Show when={isBotStarted()}>
          <Bot {...props} toggleBot={toggleBot} />
        </Show>
      </div>
    </>
  )
}
