import { LoadingOverlay } from '@/components'
import { authStore } from '@/features/authentication'
import {
  IncomingInput,
  LLMStreamId,
  PromptCode,
  clearLLMStream,
  initiatingLLMStream,
  sendMessageQuery,
} from '@/features/messages'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { detectLanguage } from '@/features/text'
import { clearAllSubscriptionsOfType } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Show, Switch, createSignal, onCleanup, onMount } from 'solid-js'
import { botStore, botStoreActions } from '..'
import { Sidebar } from '../components'
import { MenuSettings } from '../components/MenuSettings'
import { SidebarTabView } from '../components/SidebarTabView'
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

    botStoreActions.createQuestion(value)

    const body: IncomingInput = {
      question: value,
      sessionId: authStore.sessionId,
      channelId: botStore.activeChannel!.id,
      memory: [],
      promptCode: PromptCode.QUESTION,
      socketIOClientId: LLMStreamId(),
    }

    // Fires without waiting for response, as the response is handled by a socket connection
    sendMessageQuery(body)
    await detectLanguage(value, true)

    setUserInput('')
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
    <div class='relative md:flex md:px-16 flex-1 overflow-hidden'>
      <LoadingOverlay isLoading={initiatingLLMStream()} />

      <Switch>
        <Match when={['desktop', 'tablet'].includes(device())}>
          <BotDesktopLayout userInput={userInput()} onSubmit={handleSubmit} />
        </Match>
        <Match when={device() == 'mobile'}>
          <BotMobileLayout userInput={userInput()} onSubmit={handleSubmit} />
        </Match>
      </Switch>

      {/* Sidebar drawer */}
      <Show when={device() == 'mobile' || botStore.activeChannel?.activeChat}>
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
      </Show>
    </div>
  )
}
