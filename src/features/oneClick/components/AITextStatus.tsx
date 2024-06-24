import { SpeakerIcon, TypingBubble } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show } from 'solid-js'
import { useTheme } from '../../theme'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

const LISTENING_TEXT = {
  HELPING: `How can I help you today?...`,
  LISTENING: `Please go ahead, I'm listening... `,
}

export const AITextStatus = () => {
  const { theme } = useTheme()
  const [contentParent] = createAutoAnimate()
  const [textParent] = createAutoAnimate()

  return (
    <div
      ref={contentParent}
      class={`flex items-center justify-between w-full mb-3 py-3 border-b border-${
        theme().borderColor
      } `}
    >
      <Show when={oneClickStore.botStatus === BotStatus.NOT_STARTED}>
        <div class='w-4/5'>
          <div class='text-base'>Connecting to the bot</div>
        </div>
        <TypingBubble />
      </Show>
      <Show when={oneClickStore.botStatus === BotStatus.IDLE}>
        <div ref={textParent} class='w-4/5'>
          <div class='text-base font-bold'>Hello There!</div>
          <div class='text-base text-secondary'>{LISTENING_TEXT.HELPING}</div>
        </div>
        <SpeakerIcon />
      </Show>
      <Show when={oneClickStore.botStatus === BotStatus.LISTENING}>
        <div class='w-4/5'>
          <div class='text-base font-bold'>Hello There!</div>
          <div class='text-base text-secondary'>{LISTENING_TEXT.LISTENING}</div>
        </div>
        <SpeakerIcon />
      </Show>
      <Show when={oneClickStore.botStatus === BotStatus.THINKING}>
        <div class='w-4/5'>
          <div class='text-base '>Hang on a second</div>
          <div class='text-base text-secondary'>Let me think...</div>
        </div>
        <TypingBubble />
      </Show>
      <Show when={oneClickStore.botStatus === BotStatus.ANSWERING}>
        <div class='w-4/5'>
          <div class='text-base '>The AI is answering</div>
          <div class='text-base text-secondary'>your query...</div>
        </div>
        <TypingBubble />
      </Show>
    </div>
  )
}
