import { Divider } from '@/components/Divider'
import { TextInput } from '@/components/inputs/textInput'
import { ContextualContainer } from '@/features/contextual'
import { ChatWindow } from '@/features/messages'
import { SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { InitialPrompt } from '@/graphql/types'
import { Show, createMemo, createSignal } from 'solid-js'
import { botStore, botStoreActions } from '..'
import { sidebarPaddingNum } from '../constants'
import { ResourcesSidebar } from './ResourcesSidebar'
import { SidebarTabView } from './SidebarTabView'

type BotDesktopProps = {
  userInput: string
  suggestedPrompts: string[]
  initialPrompts?: InitialPrompt[] | null
  isFetchingSuggestedPrompts: boolean
  onSubmit: (question: string) => void
  onClear: () => void
  class?: string
}

export const BotDesktopLayout = (props: BotDesktopProps) => {
  const { text } = useText()

  const [resourcesToggled, setResourcesToggled] = createSignal(true)

  const resourcesOpen = createMemo(() => botStore.hasResources && resourcesToggled())

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
          when={botStore.chat}
          fallback={
            <div class='flex flex-1 overflow-hidden  mb-6 '>
              {/* Welcome message */}
              <div class='flex flex-1 items-end '>
                <h1 class='text-5xl max-w-md h-fit font-light tracking-wide leading-tight '>
                  {botStore.history.length ? text().returnWelcomeMessage : text().welcomeMessage}
                </h1>
              </div>

              <SidebarTabView
                initialPrompts={props.initialPrompts}
                setQuestion={(chat) => {
                  botStoreActions.setChat(chat)
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
        <div class='w-full pb-1 z-1 mt-5 '>
          <TextInput
            rows={2}
            disabled={botStore.loading}
            defaultValue={props.userInput}
            onSubmit={props.onSubmit}
            placeholder={text().inputPlaceholder}
          />
        </div>

        {/* Suggested Prompt Container */}
        <SuggestedPrompts
          handleSubmit={props.onSubmit}
          suggestedPrompts={props.suggestedPrompts}
          isFetching={props.isFetchingSuggestedPrompts}
          loading={botStore.loading}
        />
      </div>

      {/* Resources Sidebar */}
      <Show when={botStore.chat}>
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
