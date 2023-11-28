import { Divider } from '@/components/Divider'
import { Nav } from '@/components/Nav'
import { TextInput } from '@/components/inputs/textInput'
import { ContextualContainer } from '@/features/contextual'
import { ChatWindow } from '@/features/messages'
import { SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createMemo, createSignal } from 'solid-js'
import { PromptType, Sidebar } from '.'
import { botStore, botStoreMutations } from '..'
import { sidebarPaddingNum } from '../constants'
import { ResourcesSidebar } from './ResourcesSidebar'
import { SidebarTabView } from './SidebarTabView'

type BotDesktopProps = {
  userInput: string
  suggestedPrompts: string[]
  initialPrompts?: PromptType[]
  isFetchingSuggestedPrompts: boolean
  onSubmit: (question: string) => void
  onClear: () => void
  class?: string
}

export const BotDesktopLayout = (props: BotDesktopProps) => {
  const [chatWindowParent] = createAutoAnimate(/* optional config */)

  const { theme } = useTheme()
  const { text } = useText()

  const [sidebarOpen, setSidebarOpen] = createSignal(false)
  const [resourcesToggled, setResourcesToggled] = createSignal(true)

  const resourcesOpen = createMemo(() => botStore.hasResources && resourcesToggled())

  return (
    <div
      class={
        'relative flex flex-col h-full w-full bg-cover bg-center chatbot-container overflow-hidden ' +
        props.class
      }
      style={{
        color: theme().textColor,
        'background-color': theme().backgroundColor,
        background: `url(${theme().backgroundImageUrl})`,
        'background-size': 'cover',
      }}
    >
      <Nav question={botStore.chat} onClear={props.onClear} />

      <div class='relative flex flex-1 px-10 overflow-hidden'>
        {/* Main Container */}
        <div
          class='flex flex-col flex-1 text-base overflow-hidden py-6'
          ref={chatWindowParent}
          style={{
            'padding-right': resourcesOpen() ? sidebarPaddingNum + 'px' : '0',
          }}
        >
          <Show
            when={botStore.chat}
            fallback={
              // Welcome message
              <div class='flex flex-1'>
                <div class='flex flex-1 items-end '>
                  <h1 class='text-5xl max-w-md h-fit mb-6 font-light tracking-wide '>
                    {text().welcomeMessage}
                  </h1>
                </div>

                <SidebarTabView
                  initialPrompts={props.initialPrompts}
                  history={botStore.history}
                  navDefault={!botStore.chat}
                  setQuestion={(chat) => {
                    botStoreMutations.setChat(chat)
                    setSidebarOpen(false)
                  }}
                  handleSubmit={(question) => {
                    props.onSubmit(question)
                    setSidebarOpen(false)
                  }}
                  disabled={botStore.loading}
                />
              </div>
            }
          >
            <ChatWindow question={botStore.chat!} />
          </Show>

          <Divider margin={0} />

          {/* Input Container */}
          <div class='w-full pb-1 z-1 mt-5 '>
            <TextInput
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
            <ContextualContainer class='py-6' resources={botStore.chat?.resources} />
          </ResourcesSidebar>
        </Show>

        {/* Sidebar */}
        <Show when={botStore.chat}>
          <Sidebar
            open={sidebarOpen()}
            onToggle={() => {
              setSidebarOpen(!sidebarOpen())

              setResourcesToggled(true)
            }}
          >
            <SidebarTabView
              initialPrompts={props.initialPrompts}
              history={botStore.history}
              navDefault={!botStore.chat}
              setQuestion={(chat) => {
                botStoreMutations.setChat(chat)
                setSidebarOpen(false)
              }}
              handleSubmit={(question) => {
                props.onSubmit(question)
                setSidebarOpen(false)
              }}
              disabled={botStore.loading}
            />
          </Sidebar>
        </Show>
      </div>
    </div>
  )
}
