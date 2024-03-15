import { Collapsible } from '@/components/Collapsible'
import { ChatInput } from '@/components/inputs/chatInput'
import { ChatWindow } from '@/features/messages'
import { NavigationPrompt, SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { For, Show, createSignal } from 'solid-js'
import { botStore } from '..'

type BotMobileProps = {
  userInput: string

  onSubmit: (question: string) => void
  class?: string
}

export const BotMobileLayout = (props: BotMobileProps) => {
  const [isFocused, setIsFocused] = createSignal(false)
  const { text } = useText()

  return (
    <div class='flex flex-col flex-1 h-full overflow-hidden'>
      <div class='flex flex-col flex-1 overflow-hidden text-base pt-6'>
        <Show
          when={botStore.activeChannel?.activeChat}
          fallback={
            <div class='flex flex-1 items-end px-6 '>
              <h1 class='text-4xl md:text-5xl max-w-md h-fit mb-6 font-extralight tracking-wide leading-tight'>
                {botStore.activeHistory.length
                  ? text().returnWelcomeMessage
                  : text().welcomeMessage}
              </h1>
            </div>
          }
        >
          <ChatWindow />
        </Show>
      </div>

      <div class='w-full pb-4 '>
        <div class='px-6'>
          <ChatInput
            rows={1}
            defaultValue={props.userInput}
            onSubmit={props.onSubmit}
            placeholder={text().inputPlaceholder}
            onFocusChange={setIsFocused}
          />
        </div>

        <Show
          when={botStore.activeChannel?.activeChat}
          fallback={
            // Navigation prompts
            <div class='px-6'>
              <p class='text-xs py-4 font-semibold text-[var(--textSecondary)]'>Navigation help</p>
              <div class='flex gap-4 overflow-x-auto brand-scroll-container pb-1'>
                <For each={botStore.activeChannel?.initialPrompts}>
                  {(p) => (
                    <NavigationPrompt
                      prompt={p}
                      onClick={(prompt) => props.onSubmit(prompt)}
                      disabled={botStore.isAwaitingAnswer}
                    />
                  )}
                </For>
              </div>
            </div>
          }
        >
          <Collapsible open={isFocused()}>
            <SuggestedPrompts handleSubmit={props.onSubmit} />
          </Collapsible>
        </Show>
      </div>
    </div>
  )
}
