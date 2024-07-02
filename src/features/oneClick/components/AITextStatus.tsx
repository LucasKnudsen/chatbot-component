import { SpeakerIcon, TypingBubble } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Match, Switch } from 'solid-js'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

export const AITextStatus = () => {
  const [contentParent] = createAutoAnimate()

  return (
    <div ref={contentParent}>
      <Switch>
        <Match when={oneClickStore.botStatus === BotStatus.NOT_STARTED}>
          <div class='mt-2'>
            <TypingBubble />
          </div>
        </Match>

        <Match when={oneClickStore.botStatus === BotStatus.LISTENING}>
          <SpeakerIcon />
        </Match>

        <Match when={oneClickStore.botStatus === BotStatus.THINKING}>
          <div class='mt-2'>
            <TypingBubble />
          </div>
        </Match>

        <Match when={oneClickStore.botStatus === BotStatus.ANSWERING}>
          <div class='mt-2'>
            <TypingBubble />
          </div>
        </Match>
      </Switch>

      {/* <Show when={oneClickStore.botStatus === BotStatus.IDLE}>
        <div class='w-4/5'>
          <div class='text-base font-bold'>Hello There!</div>
          <div class='text-base text-secondary'>{LISTENING_TEXT.HELPING}</div>
        </div>
        <SpeakerIcon />
      </Show> */}

      {/* <Show when={oneClickStore.botStatus === BotStatus.LISTENING}>
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
      </Show> */}

      {/* <Show when={oneClickStore.botStatus === BotStatus.ANSWERING}>
        <div class='w-4/5'>
          <div class='text-base '>The AI is answering</div>
          <div class='text-base text-secondary'>your query...</div>
        </div>
        <TypingBubble />
      </Show> */}
    </div>
  )
}
