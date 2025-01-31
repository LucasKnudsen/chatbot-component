import { Match, Show, Switch, createMemo, createSignal } from 'solid-js'
import { InteractionFlowSwitch, botStore } from '..'

import { Divider } from '@/components/Divider'
import { ChatInput } from '@/components/inputs/chatInput'
import { ContextualContainer } from '@/features/contextual'
import { NavigationPromptsList, SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { ChatWindow } from 'archive/messages'
import { VoiceConversationView } from '../../avatar/layout/VoiceConversationView'
import { ResourcesSidebar } from '../components/ResourcesSidebar'
import { sidebarPaddingNum } from '../constants'

type BotDesktopProps = {
  userInput: string

  onSubmit: (question: string) => void
  class?: string
}

export const BotDesktopLayout = (props: BotDesktopProps) => {
  const { text } = useText()

  const [resourcesToggled, setResourcesToggled] = createSignal(true)

  const resourcesOpen = createMemo(
    () =>
      (Boolean(botStore.activeContextuals.length) || Boolean(botStore.activeFacts.length)) &&
      resourcesToggled(),
  )

  return (
    <div data-testid='BotDesktopLayout' class='flex grow overflow-hidden py-10 '>
      <Switch>
        {/* Interface for text chats */}
        <Match when={botStore.activeInteractionFlow === 'chat'}>
          {/* Main Container */}
          <div
            class='flex flex-col grow text-base animate-fade-in'
            style={{
              'padding-right': resourcesOpen() ? sidebarPaddingNum + 'px' : '0',
            }}
          >
            <Switch>
              <Match when={botStore.activeChannel?.activeChat}>
                <ChatWindow />
              </Match>

              <Match when={!botStore.activeChannel?.activeChat}>
                <InitialBotWindow onSubmit={props.onSubmit} />
              </Match>
            </Switch>

            {/* Input Container */}
            <div class='pb-1 pt-5 '>
              <ChatInput
                rows={2}
                defaultValue={props.userInput}
                onSubmit={props.onSubmit}
                placeholder={text().inputPlaceholder}
              />
            </div>

            {/* Suggested Prompt Container */}
            {botStore.activeAnswer && <SuggestedPrompts handleSubmit={props.onSubmit} />}
          </div>

          {/* Contextual Resources Sidebar */}
          <Show when={botStore.activeChannel?.activeChat}>
            <ResourcesSidebar
              open={resourcesOpen()}
              toggle={() => setResourcesToggled(!resourcesToggled())}
            >
              <ContextualContainer class='pt-6' />
            </ResourcesSidebar>
          </Show>
        </Match>

        {/* Interface for voice conversationing */}
        <Match when={botStore.activeInteractionFlow === 'voice'}>
          <VoiceConversationView />
        </Match>
      </Switch>
    </div>
  )
}

const InitialBotWindow = (props: { onSubmit: (question: string) => void }) => {
  const { text } = useText()

  return (
    <div data-testid='InitialBotWindow' class='flex grow overflow-hidden  mb-6 '>
      <div class='flex grow flex-col justify-end gap-4'>
        <InteractionFlowSwitch />

        {/* Welcome message */}
        <div class='flex items-end '>
          <h1 class='text-5xl max-w-lg h-fit font-light tracking-wide leading-tight '>
            {botStore.activeHistory.length ? text().returnWelcomeMessage : text().welcomeMessage}
          </h1>
        </div>
      </div>

      {/* Navigation prompts  */}
      <div>
        <div class='flex flex-col gap-2 pb-4 '>
          <Divider />
          <p class='font-bold leading-[30px] text-[var(--textSecondary)]'>Navigation</p>
          <Divider />
        </div>

        <NavigationPromptsList
          prompts={
            botStore.activeChannel!.initialPrompts
            // botStore.chat?.question ? props.initialPrompts : props.initialPrompts?.slice(0, 3)
          }
          onSelect={props.onSubmit}
          disabled={botStore.isAwaitingAnswer}
        />
      </div>
    </div>
  )
}
