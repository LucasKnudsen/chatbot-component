import { SpeakerIcon } from '@/components'
import { useTheme } from '../theme'
import { Accessor, Component, Show } from 'solid-js'
import { BOT_STATUS } from './BotOneClick'
import { TypingBubble } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
interface Props {
  status: Accessor<string>
}
const LISTENING_TEXT = {
  HELPING: `How can I help you today?...`,
  LISTENING: `Please go ahead, I'm listening... `,
}

export const AITextStatus  = (props: Props ) => {
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
      <Show when={props.status() === BOT_STATUS.NOT_STARTED}>
        <div class='w-4/5'>
          <div class='text-base'>Connecting to the bot</div>
        </div>
        <TypingBubble />
      </Show>
      <Show when={props.status() === BOT_STATUS.IDLE}>
        <div ref={textParent} class='w-4/5'>
          <div class='text-base font-bold'>Hello There!</div>
          <div class='text-base text-secondary'>{LISTENING_TEXT.HELPING}</div>
        </div>
        <SpeakerIcon />
      </Show>
      <Show when={props.status() === BOT_STATUS.LISTENING}>
        <div class='w-4/5'>
          <div class='text-base font-bold'>Hello There!</div>
          <div class='text-base text-secondary'>{LISTENING_TEXT.LISTENING}</div>
        </div>
        <SpeakerIcon />
      </Show>
      <Show when={props.status() === BOT_STATUS.THINKING}>
        <div class='w-4/5'>
          <div class='text-base '>Hang on a second</div>
          <div class='text-base text-secondary'>Let me think...</div>
        </div>
        <TypingBubble />
      </Show>
      <Show when={props.status() === BOT_STATUS.ANSWERING}>
        <div class='w-4/5'>
          <div class='text-base '>The AI is answering</div>
          <div class='text-base text-secondary'>your query...</div>
        </div>
        <TypingBubble />
      </Show>
    </div>
  )
}
