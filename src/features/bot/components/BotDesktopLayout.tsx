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
import { botStore, botStoreActions } from '..'
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
  toggleBot: () => void
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
      <Nav onClear={props.onClear} toggleBot={props.toggleBot} />

      <div class='relative flex flex-1 px-16 overflow-hidden'>
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
              <div class='flex flex-1'>
                {/* Welcome message */}
                <div class='flex flex-1 items-end '>
                  <h1 class='text-5xl max-w-md h-fit mb-6 font-light tracking-wide '>
                    {text().welcomeMessage}
                  </h1>
                </div>

                <SidebarTabView
                  initialPrompts={props.initialPrompts}
                  setQuestion={(chat) => {
                    botStoreActions.setChat(chat)
                    setSidebarOpen(false)
                  }}
                  handleSubmit={(question) => {
                    props.onSubmit(question)
                    setSidebarOpen(false)
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
            <ContextualContainer class='py-6' />
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
              setQuestion={(chat) => {
                botStoreActions.setChat(chat)
                setSidebarOpen(false)
              }}
              handleSubmit={(question) => {
                props.onSubmit(question)
                setSidebarOpen(false)
              }}
            />
          </Sidebar>
        </Show>
      </div>
    </div>
  )
}
