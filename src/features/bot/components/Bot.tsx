import awsconfig from '@/aws-exports'
import { Nav } from '@/components/Nav'
import {
  IncomingInput,
  PromptCode,
  sendMessageQuery,
  useChatConnection,
  useSocket,
} from '@/features/messages'
import { useSuggestedPrompts } from '@/features/prompt'
import { TextConfig, detectLanguage } from '@/features/text'
import { Theme } from '@/features/theme'
import { queries } from '@/graphql'
import { Channel, GetChannelQuery } from '@/graphql/types'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { GraphQLQuery } from '@aws-amplify/api'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { API, Amplify } from 'aws-amplify'
import { Match, Show, Switch, createResource, createSignal, onMount } from 'solid-js'
import { Sidebar } from '.'
import { botStore, botStoreActions, useChatId, useLanguage } from '..'
import { BotDesktopLayout } from './BotDesktopLayout'
import { BotMobileLayout } from './BotMobileLayout'
import { FraiaLoading } from './FraiaLoading'
import { MenuSettings } from './MenuSettings'
import { SidebarTabView } from './SidebarTabView'

Amplify.configure(awsconfig)
try {
  Predictions.addPluggable(new AmazonAIConvertPredictionsProvider())
} catch (error) {}

type messageType = 'apiMessage' | 'userMessage' | 'usermessagewaiting'

export type MessageType = {
  message: string
  type: messageType
  sourceDocuments?: any
}

export type PromptType =
  | string
  | {
      display: string
      prompt: string
    }

export type BotSettings = {
  brandName?: string
  autoOpen?: boolean
}

export type BotConfig = {
  channelId: string
  language?: string
  themeId?: string
  initialPrompts?: PromptType[]
  text?: Partial<TextConfig>
  theme?: Partial<Theme>
  settings?: BotSettings
}

type BotProps = BotConfig & {
  class?: string
  toggleBot: () => void
}

export const BotManager = (props: BotProps) => {
  const storageKey = 'fraiaChannel'
  const [channelError, setChannelError] = createSignal('')

  const [channel] = createResource(async () => {
    try {
      const localChannel = localStorage.getItem(storageKey)

      if (localChannel) return JSON.parse(localChannel) as Channel

      const result = await API.graphql<GraphQLQuery<GetChannelQuery>>({
        query: queries.getChannel,
        variables: {
          id: props.channelId,
        },
        authMode: 'AWS_IAM',
      })

      const channel = result.data!.getChannel!

      if (!channel) {
        setChannelError('Channel not found')
        return
      }

      localStorage.setItem(storageKey, JSON.stringify(channel))

      setChannelError('')

      return channel
    } catch (error) {
      console.error(error)
      setChannelError('Something went wrong')
    }
  })

  return (
    <Show
      when={channel() && !channelError()}
      fallback={
        <FraiaLoading
          brandName={props.settings?.brandName}
          channelError={channelError}
          toggleBot={props.toggleBot}
        />
      }
    >
      <Bot
        channel={channel()!}
        {...props}
        toggleBot={props.toggleBot}
        class='fixed top-0 left-0 w-full h-full z-50'
      />
    </Show>
  )
}

export const Bot = (props: BotProps & { channel: Channel }) => {
  const [userInput, setUserInput] = createSignal('')

  const [sidebarOpen, setSidebarOpen] = createSignal(false)

  const device = useMediaQuery()

  const { chatId, clear: clearChatId } = useChatId(props.channel.chatflowId!)
  const { clear: clearDefaultLanguage } = useLanguage(props.channel.chatflowId!, props.language)

  const {
    suggestedPrompts,
    fetchSuggestedPrompts,
    clearSuggestions,
    isFetching: isFetchingSuggestedPrompts,
  } = useSuggestedPrompts()

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    chatflowId: props.channel.chatflowId!,
    apiHost: props.channel.apiHost!,
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
    botStoreActions.initBotStore(props.channel.chatflowId!, props.language)

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
      channelId: props.channel.id,
      history: [],
      chatId: chatId(),
      promptCode: PromptCode.QUESTION,
    }

    if (isChatFlowAvailableToStream()) body.socketIOClientId = socketIOClientId()

    // Fires without waiting for response, as the response is handled by a socket
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
          onToggleBot={props.toggleBot}
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
                toggleBot={props.toggleBot}
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
                toggleBot={props.toggleBot}
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

                <MenuSettings
                  toggleBot={props.toggleBot}
                  setSidebarOpen={setSidebarOpen}
                  clear={clear}
                />
              </div>
            </Sidebar>
          </Show>
        </div>
      </div>
    </>
  )
}
