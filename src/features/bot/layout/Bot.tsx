import { LoadingOverlay } from '@/components'
import {
  IncomingInput,
  PromptCode,
  isLoadingSocket,
  sendMessageQuery,
  useChatConnection,
  useSocket,
} from '@/features/messages'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { detectLanguage } from '@/features/text'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Show, Switch, createSignal, onMount } from 'solid-js'
import { botStore, botStoreActions, useChatId } from '..'
import { Sidebar } from '../components'
import { MenuSettings } from '../components/MenuSettings'
import { SidebarTabView } from '../components/SidebarTabView'
import { BotDesktopLayout } from './BotDesktopLayout'
import { BotMobileLayout } from './BotMobileLayout'

export const Bot = () => {
  const [userInput, setUserInput] = createSignal('')

  const [sidebarOpen, setSidebarOpen] = createSignal(false)

  const device = useMediaQuery()

  const { chatId, clear: clearChatId } = useChatId()

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    onToken: botStoreActions.updateAnswer,
  })

  useChatConnection({
    chatId,
    isChatFlowAvailableToStream,
  })

  const clear = () => {
    botStoreActions.clear()
    suggestedPromptsStoreActions.clear()
    clearChatId()
  }

  onMount(() => {
    if (botStore.activeChannel?.activeChat) {
      suggestedPromptsStoreActions.fetch()
    }
  })

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
      channelId: botStore.activeChannel!.id,
      spaceId: botStore.activeChannel!.chatSpaceId,
      memory: [],
      chatId: chatId(),
      promptCode: PromptCode.QUESTION,
    }

    if (isChatFlowAvailableToStream()) body.socketIOClientId = socketIOClientId()

    // Fires without waiting for response, as the response is handled by a socket connection
    sendMessageQuery(body)
    await detectLanguage(value, true)

    setUserInput('')
  }

  return (
    <div class='relative md:flex md:px-16 flex-1 overflow-hidden'>
      <LoadingOverlay isLoading={isLoadingSocket()} />

      <Switch>
        <Match when={['desktop', 'tablet'].includes(device())}>
          <BotDesktopLayout userInput={userInput()} onSubmit={handleSubmit} onClear={clear} />
        </Match>
        <Match when={device() == 'mobile'}>
          <BotMobileLayout userInput={userInput()} onSubmit={handleSubmit} onClear={clear} />
        </Match>
      </Switch>

      {/* Sidebar drawer */}
      <Show when={device() == 'mobile' || botStore.activeChannel?.activeChat}>
        <Sidebar
          open={sidebarOpen()}
          onToggle={() => {
            setSidebarOpen(!sidebarOpen())
          }}
        >
          <div class='h-full flex flex-col'>
            <div class='flex-1 overflow-hidden'>
              <SidebarTabView
                class='h-full'
                setQuestion={(chat) => {
                  botStoreActions.setActiveChat(chat)
                  setSidebarOpen(false)
                }}
                handleSubmit={(question) => {
                  handleSubmit(question)
                  setSidebarOpen(false)
                }}
              />
            </div>

            <MenuSettings setSidebarOpen={setSidebarOpen} clear={clear} />
          </div>
        </Sidebar>
      </Show>
    </div>
  )
}
