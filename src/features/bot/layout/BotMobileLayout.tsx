import { BorderFade } from '@/components'
import { Collapsible } from '@/components/Collapsible'
import { ChatInput } from '@/components/inputs/chatInput'
import { ChatWindow } from '@/features/messages'
import { NavigationPrompt, SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { For, Match, Show, Switch, createSignal } from 'solid-js'
import { InteractionFlowSwitch, botStore } from '..'
import { VoiceConversationView } from './voice-conversation/VoiceConversationView'

type BotMobileProps = {
  userInput: string

  onSubmit: (question: string) => void
  class?: string
}

export const BotMobileLayout = (props: BotMobileProps) => {
  const [isFocused, setIsFocused] = createSignal(false)
  const { text } = useText()

  return (
    <div data-testid='BotMobileLayout' class='flex flex-col grow w-full overflow-hidden'>
      <Switch>
        {/* Interface for text chats */}
        <Match when={botStore.activeInteractionFlow === 'chat'}>
          <div class='flex flex-col grow animate-fade-in overflow-hidden'>
            <div class=' flex flex-col grow text-base pt-6 overflow-hidden'>
              <Show
                when={botStore.activeChannel?.activeChat}
                fallback={
                  <div class='flex flex-col justify-end px-6 '>
                    <InteractionFlowSwitch />

                    <h1 class='text-4xl lg:text-5xl max-w-md h-fit my-6 font-extralight tracking-wide leading-tight'>
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

            <div class='relative flex flex-col w-full py-4 border-solid border-t-[1px] border-[var(--borderColor)]'>
              <BorderFade height={40} />

              <div class='px-6'>
                <ChatInput
                  rows={1}
                  defaultValue={props.userInput}
                  onSubmit={props.onSubmit}
                  placeholder={text().inputPlaceholder}
                  onFocusChange={setIsFocused}
                />
              </div>

              {/* Bottom prompts  */}
              <Switch>
                <Match when={botStore.activeChannel?.activeChat}>
                  <Collapsible open={isFocused()}>
                    <SuggestedPrompts handleSubmit={props.onSubmit} />
                  </Collapsible>
                </Match>

                <Match when={botStore.activeChannel?.initialPrompts?.length !== 0}>
                  <div class=''>
                    <p class='text-xs pl-6 py-4 font-semibold text-[var(--textSecondary)]'>
                      Navigation help
                    </p>

                    <div class='flex gap-4 overflow-x-auto pb-1 px-6 no-scrollbar'>
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
                </Match>
              </Switch>
            </div>
          </div>
        </Match>

        {/* Interface for voice conversationing */}
        <Match when={botStore.activeInteractionFlow === 'voice'}>
          <div class='flex flex-col flex-1 overflow-hidden pt-6 animate-fade-in px-6'>
            <VoiceConversationView />
          </div>
        </Match>
      </Switch>
    </div>
  )
}
