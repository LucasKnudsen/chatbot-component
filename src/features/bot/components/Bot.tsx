import powerIcon from '@/assets/power-icon.svg'
import awsconfig from '@/aws-exports'
import { Button } from '@/components'
import { Divider } from '@/components/Divider'
import { Nav } from '@/components/Nav'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import { Sidebar, botStore, botStoreActions, useChatId, useLanguage } from '@/features/bot'
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
import { useMediaQuery } from '@/utils/useMediaQuery'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { Amplify } from 'aws-amplify'
import { Match, Show, Switch, createSignal, onMount } from 'solid-js'
import { BotDesktopLayout } from './BotDesktopLayout'
import { BotMobileLayout } from './BotMobileLayout'
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

export type BotProps = {
  chatflowid: string
  apiHost: string
  language?: string
  themeId?: string
  initialPrompts?: PromptType[]
  text?: Partial<TextTemplate>
  chatflowConfig?: Record<string, unknown>
  theme?: Partial<Theme>
  settings?: BotSettings
}

export const Bot = (props: BotProps & { class?: string; toggleBot: () => void }) => {
  const [userInput, setUserInput] = createSignal('')

  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc] = createSignal({})
  const [sidebarOpen, setSidebarOpen] = createSignal(false)

  const { initTheme, theme } = useTheme()
  const { initText } = useText()
  const device = useMediaQuery()

  const { chatId, clear: clearChatId } = useChatId(props.chatflowid)
  const { clear: clearDefaultLanguage } = useLanguage(props.chatflowid, props.language)

  const {
    suggestedPrompts,
    fetchSuggestedPrompts,
    clearSuggestions,
    isFetching: isFetchingSuggestedPrompts,
  } = useSuggestedPrompts(props.chatflowid, props.apiHost)

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    chatflowid: props.chatflowid,
    apiHost: props.apiHost,
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
        chatflowid: props.chatflowid,
        apiHost: props.apiHost,
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
    botStoreActions.initBotStore(props.chatflowid, props.language)

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
