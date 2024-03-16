import { Match, Show, Switch, createMemo, createSignal } from 'solid-js'
import { InteractionFlowSwitch, botStore } from '..'

import { Divider } from '@/components/Divider'
import { ChatInput } from '@/components/inputs/chatInput'
import { ContextualContainer } from '@/features/contextual'
import { ChatWindow } from '@/features/messages'
import { NavigationPromptsList, SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { ResourcesSidebar } from '../components/ResourcesSidebar'
import { sidebarPaddingNum } from '../constants'
import { VoiceConversationView } from './voice-conversation/VoiceConversationView'

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
      resourcesToggled()
  )

  return (
    <div class='flex grow overflow-hidden py-10'>
      <Switch>
        {/* Interface for text chats */}
        <Match when={botStore.activeInteractionFlow === 'chat'}>
          {/* Main Container */}
          <div
            class='flex flex-col flex-1 text-base animate-fade-in'
            style={{
              'padding-right': resourcesOpen() ? sidebarPaddingNum + 'px' : '0',
            }}
          >
            <Show
              when={botStore.activeChannel?.activeChat}
              fallback={<InitialBotWindow onSubmit={props.onSubmit} />}
            >
              <ChatWindow />
            </Show>

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
            <SuggestedPrompts handleSubmit={props.onSubmit} />
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
    <div class='flex flex-1 overflow-hidden  mb-6 '>
      <div class='flex grow flex-col justify-end gap-4'>
        <InteractionFlowSwitch />
        {/* Welcome message */}

        <div class='flex items-end '>
          <h1 class='text-5xl max-w-md h-fit font-light tracking-wide leading-tight '>
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
