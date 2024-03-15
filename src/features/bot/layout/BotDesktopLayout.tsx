import { Show, createMemo, createSignal } from 'solid-js'
import { botStore } from '..'

import { Divider } from '@/components/Divider'
import { ChatInput } from '@/components/inputs/chatInput'
import { ContextualContainer } from '@/features/contextual'
import { ChatWindow } from '@/features/messages'
import { NavigationPromptsList, SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
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
      resourcesToggled()
  )

  return (
    <>
      {/* Main Container */}
      <div
        class='flex flex-col flex-1 text-base overflow-hidden py-10'
        style={{
          'padding-right': resourcesOpen() ? sidebarPaddingNum + 'px' : '0',
        }}
      >
        <Show
          when={botStore.activeChannel?.activeChat}
          fallback={
            <div class='flex flex-1 overflow-hidden  mb-6 '>
              {/* Welcome message */}
              <div class='flex flex-1 items-end '>
                <h1 class='text-5xl max-w-md h-fit font-light tracking-wide leading-tight '>
                  {botStore.activeHistory.length
                    ? text().returnWelcomeMessage
                    : text().welcomeMessage}
                </h1>
              </div>

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
          }
        >
          <ChatWindow />
        </Show>

        <Divider margin={0} />

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

      {/* Resources Sidebar */}
      <Show when={botStore.activeChannel?.activeChat}>
        <ResourcesSidebar
          open={resourcesOpen()}
          toggle={() => setResourcesToggled(!resourcesToggled())}
        >
          <ContextualContainer class='pt-6' />
        </ResourcesSidebar>
      </Show>
    </>
  )
}
