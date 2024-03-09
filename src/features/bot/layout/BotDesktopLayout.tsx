import { Show, createMemo, createSignal } from 'solid-js'
import { botStore, botStoreActions } from '..'

import { ChatInput } from '@/components/inputs/chatInput'
import { ChatWindow } from '@/features/messages'
import { ContextualContainer } from '@/features/contextual'
import { Divider } from '@/components/Divider'
import { ResourcesSidebar } from '../components/ResourcesSidebar'
import { SidebarTabView } from '../components/SidebarTabView'
import { SuggestedPrompts } from '@/features/prompt'
import { sidebarPaddingNum } from '../constants'
import { useText } from '@/features/text'

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
        class='flex flex-col flex-1 text-base overflow-hidden py-6'
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

              <SidebarTabView
                setQuestion={(chat) => {
                  botStoreActions.setActiveChat(chat)
                }}
                handleSubmit={(question) => {
                  props.onSubmit(question)
                }}
              />
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
