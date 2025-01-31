import { BaseChatMode } from '@/graphql'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show } from 'solid-js'
import { oneClickStore } from './store/oneClickStore'
import { TextChatScreen } from './text-chat'
import { VoiceChatScreen } from './voice-chat'

export const BotOneClick = () => {
  const [TopContainerParent] = createAutoAnimate()

  return (
    <>
      <div
        ref={TopContainerParent}
        data-testid='BotOneClick'
        class={`relative w-full h-full  animate-fade-in overflow-hidden`}
      >
        <Show when={oneClickStore.chatMode === BaseChatMode.VOICE} fallback={<TextChatScreen />}>
          {/* Voice Only Component */}
          <VoiceChatScreen />
        </Show>
      </div>
    </>
  )
}
