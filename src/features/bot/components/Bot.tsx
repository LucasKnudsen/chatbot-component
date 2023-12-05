import powerIcon from '@/assets/power-icon.svg'
import awsconfig from '@/aws-exports'
import { Button } from '@/components'
import { Divider } from '@/components/Divider'
import { Nav } from '@/components/Nav'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import {
  IncomingInput,
  PromptCode,
  extractChatbotResponse,
  sendMessageQuery,
  useSocket,
} from '@/features/messages'
import { Popup } from '@/features/popup'
import { useSuggestedPrompts } from '@/features/prompt'
import { TextTemplate, detectLanguage, useText } from '@/features/text'
import { Theme } from '@/features/theme'
import { useTheme } from '@/features/theme/hooks'
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
  autoOpen: boolean
}

export type BotConfig = {
  channelId: string
  language?: string
  themeId?: string
  initialPrompts?: PromptType[]
  text?: Partial<TextTemplate>
  chatflowConfig?: Record<string, unknown>
  theme?: Partial<Theme>
  settings?: BotSettings
}

type BotProps = BotConfig & {
  class?: string
  toggleBot: () => void
}

export const BotManager = (props: BotProps) => {
  const storageKey = 'fraiaChannel'
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

      localStorage.setItem(storageKey, JSON.stringify(channel))

      return channel
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Show when={channel()} fallback={<FraiaLoading />}>
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

  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc] = createSignal({})
  const [sidebarOpen, setSidebarOpen] = createSignal(false)

  const { initTheme, theme } = useTheme()
  const { initText } = useText()
  const device = useMediaQuery()

  const { chatId, clear: clearChatId } = useChatId(props.channel.chatflowId!)
  const { clear: clearDefaultLanguage } = useLanguage(props.channel.chatflowId!, props.language)

  const {
    suggestedPrompts,
    fetchSuggestedPrompts,
    clearSuggestions,
    isFetching: isFetchingSuggestedPrompts,
  } = useSuggestedPrompts(props.channel.chatflowId!, props.channel.apiHost!)

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    chatflowid: props.channel.chatflowId!,
    apiHost: props.channel.apiHost!,
    onToken: botStoreActions.updateAnswer,
  })

  const clear = () => {
    botStoreActions.clear()
    clearSuggestions()
    clearChatId()
    clearDefaultLanguage()
  }

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
      history: [],
      chatId: chatId(),
      promptCode: PromptCode.QUESTION,
    }

    if (props.chatflowConfig) body.overrideConfig = props.chatflowConfig

    if (isChatFlowAvailableToStream()) body.socketIOClientId = socketIOClientId()

    const [messageResult, detectLanguageResult] = await Promise.all([
      sendMessageQuery({
        chatflowid: props.channel.chatflowId!,
        apiHost: props.channel.apiHost!,
        body,
      }),
      detectLanguage(value, true),
    ])

    if (messageResult.data) {
      // Uses the source documents from the end result rather than sockets (they are the same, and doesnt stream in anyway)
      botStoreActions.handleSourceDocuments(messageResult.data.sourceDocuments)
      // Saves end answer in history rather than at every stream update
      botStoreActions.updateAnswer(extractChatbotResponse(messageResult.data), true)

      fetchSuggestedPrompts(detectLanguageResult?.languageCode)
    }

    if (messageResult.error) {
      const message =
        messageResult.error?.message ?? 'Something went wrong. Please try again later.'

      botStoreActions.updateAnswer(message)
    }

    botStoreActions.setLoading(false)
    setUserInput('')
  }

  onMount(() => {
    botStoreActions.initBotStore(props.channel.chatflowId!, props.language)

    initTheme(props.themeId, props.theme)
    initText(props.text, props.language)

    if (botStore.chat) {
      fetchSuggestedPrompts()
    }
  })

  return (
    <>
      <div
        class={'relative flex flex-col h-full w-full  overflow-hidden ' + props.class}
        style={{
          color: theme().textColor,
          background: `${theme().backgroundColor} url(${
            theme().backgroundImageUrl
          }) no-repeat center / cover`,
        }}
      >
        <Nav
          sidebarOpen={sidebarOpen()}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen())}
          onClear={clear}
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

          {/* Sidebar */}
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

                <Divider margin={24} />

                <ul>
                  <li>
                    <button
                      class='flex text-xs items-center'
                      onClick={() => {
                        clear()
                        setSidebarOpen(false)
                      }}
                    >
                      <div class='mr-5 '>
                        <DeleteIcon width={15} />
                      </div>{' '}
                      Clear History
                    </button>
                  </li>
                </ul>

                <Divider margin={24} />

                <Button onClick={props.toggleBot} padding='8px'>
                  <img class='m-auto' src={powerIcon} />
                </Button>
              </div>
            </Sidebar>
          </Show>
        </div>
      </div>

      {sourcePopupOpen() && (
        <Popup
          isOpen={sourcePopupOpen()}
          value={sourcePopupSrc()}
          onClose={() => setSourcePopupOpen(false)}
        />
      )}
    </>
  )
}
