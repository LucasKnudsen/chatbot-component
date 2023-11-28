import awsconfig from '@/aws-exports'

import { useChatId, useLanguage } from '@/features/bot'
import {
  IncomingInput,
  PromptCode,
  extractChatbotResponse,
  sendMessageQuery,
  useQuestion,
  useSocket,
} from '@/features/messages'
import { useSuggestedPrompts } from '@/features/prompt'
import { useTheme } from '@/features/theme/hooks'

import { Popup } from '@/features/popup'
import { TextTemplate, detectLanguage, useText } from '@/features/text'
import { Theme } from '@/features/theme'
import StyleSheet from '@/styles'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { Amplify } from 'aws-amplify'
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
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
  const [loading, setLoading] = createSignal(false)

  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc] = createSignal({})

  const { initTheme } = useTheme()
  const { initText } = useText()

  const { chatId, clear: clearChatId } = useChatId(props.chatflowid)
  const { clear: clearDefaultLanguage } = useLanguage(props.chatflowid, props.language)

  const {
    question,
    createQuestion,
    updateAnswer,
    clear: clearQuestions,
    handleSourceDocuments,
    history,
    setQuestion,
    hasResources,
  } = useQuestion(props.chatflowid, props.language)

  const {
    suggestedPrompts,
    fetchSuggestedPrompts,
    clearSuggestions,
    isFetching: isFetchingSuggestedPrompts,
  } = useSuggestedPrompts(props.chatflowid, props.apiHost, history)

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    chatflowid: props.chatflowid,
    apiHost: props.apiHost,
    onToken: updateAnswer,
  })

  const clear = () => {
    clearQuestions()
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

    setLoading(true)

    clearSuggestions()

    // Remove welcome message from messages
    createQuestion(value)

    // const prompt = `. Always return your answer in formatted markdown, structure it with bold, list, images, etc.`

    const body: IncomingInput = {
      question: value,
      history: [],
      chatId: chatId(),
      promptCode: PromptCode.QUESTION,
    }

    if (props.chatflowConfig) body.overrideConfig = props.chatflowConfig

    if (isChatFlowAvailableToStream()) body.socketIOClientId = socketIOClientId()

    const [messageResult] = await Promise.all([
      sendMessageQuery({
        chatflowid: props.chatflowid,
        apiHost: props.apiHost,
        body,
      }),
      detectLanguage(value, true),
    ])

    if (messageResult.data) {
      // Uses the source documents from the end result rather than sockets (they are the same, and doesnt stream in anyway)
      handleSourceDocuments(messageResult.data.sourceDocuments)

      if (!isChatFlowAvailableToStream()) {
        let text = extractChatbotResponse(messageResult.data)

        updateAnswer(text)
      }

      fetchSuggestedPrompts()
    }

    if (messageResult.error) {
      const message =
        messageResult.error?.message ?? 'Something went wrong. Please try again later.'

      updateAnswer(message)
    }

    setLoading(false)
    setUserInput('')
  }

  onMount(() => {
    initTheme(props.themeId, props.theme)
    initText(
      props.text
      // defaultLanguage(),
    )

    if (question() && import.meta.env.PROD) {
      fetchSuggestedPrompts()
    }
  })

  createEffect(() => {})

  onCleanup(() => {
    setUserInput('')
    setLoading(false)
  })

  return (
    <>
      <StyleSheet />

      <BotDesktopLayout
        chat={question()}
        userInput={userInput()}
        history={history()}
        hasResources={hasResources()}
        loading={loading()}
        isFetchingSuggestedPrompts={isFetchingSuggestedPrompts()}
        suggestedPrompts={suggestedPrompts()}
        initialPrompts={props.initialPrompts}
        onSetQuestion={setQuestion}
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
