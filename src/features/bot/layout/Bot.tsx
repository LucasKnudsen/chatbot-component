import { LoadingOverlay } from '@/components'
import {
  IncomingInput,
  PromptCode,
  isLoadingSocket,
  sendMessageQuery,
  useChatConnection,
  useSocket,
} from '@/features/messages'
import { useSuggestedPrompts } from '@/features/prompt'
import { detectLanguage } from '@/features/text'
import { ChatSpace } from '@/graphql/types'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Show, Switch, createSignal, onMount } from 'solid-js'
import { botStore, botStoreActions, useChatId, useLanguage } from '..'
import { Sidebar } from '../components'
import { MenuSettings } from '../components/MenuSettings'
import { SidebarTabView } from '../components/SidebarTabView'
import { BotDesktopLayout } from './BotDesktopLayout'
import { BotMobileLayout } from './BotMobileLayout'

export const Bot = (props: ChatSpace) => {
  const [userInput, setUserInput] = createSignal('')

  const [sidebarOpen, setSidebarOpen] = createSignal(false)

  const device = useMediaQuery()

  const { chatId, clear: clearChatId } = useChatId()
  const { clear: clearDefaultLanguage } = useLanguage(props.language || 'en')

  const {
    suggestedPrompts,
    fetchSuggestedPrompts,
    clearSuggestions,
    isFetching: isFetchingSuggestedPrompts,
  } = useSuggestedPrompts()

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    onToken: botStoreActions.updateAnswer,
  })

  useChatConnection({
    chatId,
    isChatFlowAvailableToStream,
    fetchSuggestedPrompts,
  })

  const clear = () => {
    botStoreActions.clear()
    clearSuggestions()
    clearChatId()
    clearDefaultLanguage()
  }

  onMount(() => {
    if (botStore.chat) {
      fetchSuggestedPrompts()
    }
  })

  // Handle form submission
  const handleSubmit = async (value: string) => {
    setUserInput(value)

    if (value.trim() === '') {
      return
    }

    botStoreActions.setLoading(true)

    clearSuggestions()

    botStoreActions.createQuestion(value)

    const body: IncomingInput = {
      question: value,
      channelId: botStore.activeChannel!.id,
      spaceId: botStore.activeChannel!.chatSpaceId,
      history: [],
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
          <BotDesktopLayout
            userInput={userInput()}
            isFetchingSuggestedPrompts={isFetchingSuggestedPrompts()}
            suggestedPrompts={suggestedPrompts()}
            onSubmit={handleSubmit}
            onClear={clear}
          />
        </Match>
        <Match when={device() == 'mobile'}>
          <BotMobileLayout
            userInput={userInput()}
            isFetchingSuggestedPrompts={isFetchingSuggestedPrompts()}
            suggestedPrompts={suggestedPrompts()}
            onSubmit={handleSubmit}
            onClear={clear}
          />
        </Match>
      </Switch>

      {/* Sidebar drawer */}
      <Show when={device() == 'mobile' || botStore.chat}>
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
                  botStoreActions.setChat(chat)
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
