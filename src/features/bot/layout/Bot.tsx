import { LoadingOverlay } from '@/components'
import { authStore } from '@/features/authentication'
import { KnowledgeBaseDrawer } from '@/features/knowledge-base'
import {
  IncomingInput,
  LLMStreamId,
  PromptCode,
  clearLLMStream,
  flowiseMessageQuery,
  initiatingLLMStream,
} from '@/features/messages'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { detectLanguage } from '@/features/text'
import { clearAllSubscriptionsOfType } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Switch, createSignal, onCleanup, onMount } from 'solid-js'
import { botStore, botStoreActions, createHistoryRecord } from '..'
import { BotDesktopLayout } from './BotDesktopLayout'
import { BotMobileLayout } from './BotMobileLayout'

export const Bot = () => {
  const [userInput, setUserInput] = createSignal('')

  const device = useMediaQuery()

  // Handle form submission
  const handleSubmit = async (value: string) => {
    setUserInput(value)

    if (value.trim() === '') {
      return
    }

    botStoreActions.setLoading(true)

    suggestedPromptsStoreActions.clear()

    const memory = botStore.activeHistory.slice(-5).flatMap((chat) => [
      { type: 'userMessage', message: chat.question },
      { type: 'apiMessage', message: chat.answer },
    ]) as { type: 'apiMessage' | 'userMessage'; message: string }[]

    botStoreActions.buildQuestion(value)

    const body: IncomingInput = {
      question: value,
      sessionId: authStore.sessionId,
      channelId: botStore.activeChannel!.id,
      memory,
      promptCode: PromptCode.QUESTION,
      socketIOClientId: LLMStreamId(),
    }

    // Fires without waiting for response, as the response is handled by a socket connection
    await Promise.allSettled([flowiseMessageQuery(body), detectLanguage(value, true)])

    setUserInput('')

    botStoreActions.setLoading(false)

    suggestedPromptsStoreActions.fetch()

    setTimeout(() => {
      createHistoryRecord(botStore.activeChannel?.activeChat!)
    }, 500)
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
    <div class='relative md:flex md:px-16 flex-1 overflow-hidden animate-fade-in bg-opa md '>
      <LoadingOverlay isLoading={initiatingLLMStream()} />

      <Switch>
        <Match when={['desktop', 'tablet'].includes(device())}>
          <BotDesktopLayout userInput={userInput()} onSubmit={handleSubmit} />
        </Match>

        <Match when={device() == 'mobile'}>
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
