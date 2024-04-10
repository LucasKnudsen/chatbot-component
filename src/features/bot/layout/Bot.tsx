import { LoadingOverlay } from '@/components'
import { KnowledgeBaseDrawer } from '@/features/knowledge-base'
import { clearLLMStream, initiatingLLMStream, queryLLM } from '@/features/messages'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { clearAllSubscriptionsOfType } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Switch, createSignal, onCleanup, onMount } from 'solid-js'
import { botStore } from '..'
import { BotDesktopLayout } from './BotDesktopLayout'
import { BotMobileLayout } from './BotMobileLayout'

export const Bot = () => {
  const [userInput, setUserInput] = createSignal('')

  const device = useMediaQuery()

  // Handle form submission
  const handleSubmit = async (value: string) => {
    setUserInput(value)
    queryLLM(value)
  }

  onMount(() => {
    if (botStore.activeChannel?.activeChat) {
      suggestedPromptsStoreActions.fetch()
    }
  })

  onCleanup(() => {
    clearAllSubscriptionsOfType('chat-listener')
    clearLLMStream()
  })

  return (
    <div
      data-testid='Bot'
      class={`relative md:flex md:px-16 flex-1 overflow-hidden animate-fade-in max-lg:max-h-[calc(100vh-66px)]`}
    >
      <LoadingOverlay isLoading={initiatingLLMStream()} />

      <Switch>
        <Match when={device() === 'desktop'}>
          <BotDesktopLayout userInput={userInput()} onSubmit={handleSubmit} />
        </Match>

        <Match when={device() !== 'desktop'}>
          <BotMobileLayout userInput={userInput()} onSubmit={handleSubmit} />
        </Match>
      </Switch>

      <KnowledgeBaseDrawer />

      {/* Sidebar drawer */}
      {/* <Show when={device() == 'mobile' || botStore.activeChannel?.activeChat}>
        <Sidebar>
          <div class='h-full flex flex-col'>
            <div class='flex-1 overflow-hidden'>
              <SidebarTabView
                class='h-full'
                setQuestion={(chat) => {
                  botStoreActions.setActiveChat(chat)
                  botStoreActions.setBotStore('isSidebarOpen', false)
                }}
                handleSubmit={(question) => {
                  handleSubmit(question)
                  botStoreActions.setBotStore('isSidebarOpen', false)
                }}
              />
            </div>

            <MenuSettings />
          </div>
        </Sidebar>
      </Show> */}
    </div>
  )
}
