import awsconfig from '@/aws-exports'
import { botStore, botStoreMutations, useChatId, useLanguage } from '@/features/bot'
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
import StyleSheet from '@/styles'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { Amplify } from 'aws-amplify'
import { createSignal, onMount } from 'solid-js'
import { BotDesktopLayout } from './BotDesktopLayout'

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

export type BotProps = {
  chatflowid: string
  apiHost: string
  language?: string
  themeId?: string
  initialPrompts?: PromptType[]
  text?: Partial<TextTemplate>
  chatflowConfig?: Record<string, unknown>
  theme?: Partial<Theme>
}

export const Bot = (props: BotProps & { class?: string; toggleBot: () => void }) => {
  const [userInput, setUserInput] = createSignal('')

  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc] = createSignal({})

  const { initTheme } = useTheme()
  const { initText } = useText()

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
    onToken: botStoreMutations.updateAnswer,
  })

  const clear = () => {
    botStoreMutations.clear()
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

    botStoreMutations.setLoading(true)

    clearSuggestions()

    // Remove welcome message from messages
    botStoreMutations.createQuestion(value)

    // const prompt = `. Always return your answer in formatted markdown, structure it with bold, list, images, etc.`

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
      botStoreMutations.handleSourceDocuments(messageResult.data.sourceDocuments)

      if (!isChatFlowAvailableToStream()) {
        let text = extractChatbotResponse(messageResult.data)

        botStoreMutations.updateAnswer(text)
      }

      fetchSuggestedPrompts(detectLanguageResult?.languageCode)
    }

    if (messageResult.error) {
      const message =
        messageResult.error?.message ?? 'Something went wrong. Please try again later.'

      botStoreMutations.updateAnswer(message)
    }

    botStoreMutations.setLoading(false)
    setUserInput('')
  }

  onMount(() => {
    botStoreMutations.initBotStore(props.chatflowid, props.apiHost)
    initTheme(props.themeId, props.theme)
    initText(props.text, props.language)

    if (botStore.chat && import.meta.env.PROD) {
      fetchSuggestedPrompts()
    }
  })

  return (
    <>
      <StyleSheet />

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
