import { Nav } from '@/components/Nav'
import {
  IncomingInput,
  PromptCode,
  sendMessageQuery,
  useChatConnection,
  useSocket,
} from '@/features/messages'
import { useSuggestedPrompts } from '@/features/prompt'
import { detectLanguage } from '@/features/text'
import { Channel, ChatSpace } from '@/graphql/types'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Show, Switch, createResource, createSignal, onMount } from 'solid-js'
import { Sidebar } from '.'
import { botStore, botStoreActions, fetchChannels, useChatId, useLanguage } from '..'
import { BotDesktopLayout } from './BotDesktopLayout'
import { BotMobileLayout } from './BotMobileLayout'
import { FraiaLoading } from './FraiaLoading'
import { MenuSettings } from './MenuSettings'
import { SidebarTabView } from './SidebarTabView'

// export type PromptType =
//   | string
//   | {
//       display: string
//       prompt: string
//     }

// export type BotSettings = {
//   brandName?: string
//   autoOpen?: boolean
// }

// export type BotConfig = {
//   hostId: string
//   spaceId: string
//   channelId: string
//   language?: string
//   themeId?: string
//   initialPrompts?: PromptType[]
//   text?: Partial<TextConfig>
//   theme?: Partial<Theme>
//   settings?: BotSettings
// }

export type BotProps = ChatSpace & {
  class?: string
}

// BotManager is the entry point for the bot. It handles the initial loading, fetching channels, checking configurations, etc.
export const BotManager = (props: BotProps) => {
  const storageKey = 'fraiaChannels'
  const [channelError, setChannelError] = createSignal('')

  const [channels] = createResource(async () => {
    // TODO: Get all channels (Public lambda vs private graphql)

    try {
      let channels: Channel[] | undefined

      const localChannels = localStorage.getItem(storageKey)

      if (localChannels) {
        channels = JSON.parse(localChannels)
      }

      channels = await fetchChannels(props)

      if (!channels) {
        setChannelError('Channels not found')
        return
      }

      console.log('Config', { ...props })

      if (!props.isMultiChannel) {
        // If there is only one channel, initialize the bot with it
        // botStoreActions.initBotStore(channels[0])
      }

      localStorage.setItem(storageKey, JSON.stringify(channels))

      setChannelError('')

      return channels
    } catch (error) {
      console.error(error)
      setChannelError('Something went wrong')
    }
  })

  return (
    <Show
      when={channels() && !channelError()}
      fallback={<FraiaLoading channelError={channelError} />}
    >
      <Bot channels={channels()!} {...props} class='fixed top-0 left-0 w-full h-full z-50' />
    </Show>
  )
}

export const Bot = (props: BotProps & { channels: Channel[] }) => {
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
      channelId: botStore.activeChannel.id,
      spaceId: botStore.activeChannel.chatSpaceId,
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
    <>
      <div
        class={
          'relative flex flex-col h-full w-full  overflow-hidden animate-fade-in ' + props.class
        }
      >
        <Nav
          sidebarOpen={sidebarOpen()}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen())}
          onClear={clearSuggestions}
        />

        <div class='relative md:flex md:px-16 flex-1 overflow-hidden'>
          <Switch>
            <Match when={['desktop', 'tablet'].includes(device())}>
              <BotDesktopLayout
                userInput={userInput()}
                isFetchingSuggestedPrompts={isFetchingSuggestedPrompts()}
                suggestedPrompts={suggestedPrompts()}
                initialPrompts={props.initialPrompts}
                onSubmit={handleSubmit}
                onClear={clear}
                class={props.class}
              />
            </Match>
            <Match when={device() == 'mobile'}>
              <BotMobileLayout
                userInput={userInput()}
                isFetchingSuggestedPrompts={isFetchingSuggestedPrompts()}
                suggestedPrompts={suggestedPrompts()}
                initialPrompts={props.initialPrompts}
                onSubmit={handleSubmit}
                onClear={clear}
                class={props.class}
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
                    initialPrompts={props.initialPrompts}
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
      </div>
    </>
  )
}
