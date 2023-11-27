import awsconfig from '@/aws-exports'
import { Nav } from '@/components/Nav'

import { TextInput } from '@/components/inputs/textInput'
import {
  SYSTEM_DEFAULT_LANGUAGE,
  Sidebar,
  currentLanguage,
  useChatId,
  useLanguage,
} from '@/features/bot'
import { ChatWindow, useQuestion } from '@/features/messages'
import { useSocket } from '@/features/messages/hooks/useSocket'
import { IncomingInput, sendMessageQuery } from '@/features/messages/queries/sendMessageQuery'
import { extractChatbotResponse } from '@/features/messages/utils'
import { Popup } from '@/features/popup'
import { SuggestedPrompts, useSuggestedPrompts } from '@/features/prompt'
import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

import { ContextualContainer } from '@/features/contextual'
import { Language, TextTemplate, useText } from '@/features/text'
import { Theme } from '@/features/theme'
import StyleSheet from '@/styles'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { Amplify } from 'aws-amplify'
import { Show, createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import { sidebarPaddingNum } from '../constants'
import { ResourcesSidebar } from './ResourcesSidebar'
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

export type BotProps = {
  chatflowid: string
  apiHost: string
  language?: keyof typeof Language
  themeId?: string
  initialPrompts?: PromptType[]
  text?: Partial<TextTemplate>
  chatflowConfig?: Record<string, unknown>
  theme?: Partial<Theme>
}

export const Bot = (props: BotProps & { class?: string }) => {
  const [userInput, setUserInput] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  const [sidebarOpen, setSidebarOpen] = createSignal(false)
  const [resourcesToggled, setResourcesToggled] = createSignal(true)

  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc] = createSignal({})

  const { theme, initTheme } = useTheme()
  const { text, initText } = useText()

  const [chatWindowParent] = createAutoAnimate(/* optional config */)

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
  } = useQuestion(props.chatflowid)

  const resourcesOpen = createMemo(() => hasResources() && resourcesToggled())

  const {
    suggestedPrompts,
    fetchSuggestedPrompts,
    clearSuggestions,
    isFetching: isFetchingSuggestedPrompts,
  } = useSuggestedPrompts(props.chatflowid, props.apiHost)

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    chatflowid: props.chatflowid,
    apiHost: props.apiHost,
    onToken: updateAnswer,
    onDocuments: handleSourceDocuments,
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

    const body: IncomingInput = {
      question:
        value +
        '. Always return your answer in formatted markdown, structure it to use a lot of markdown and formatting, links, bold, list.',
      history: [],
      chatId: chatId(),
    }

    if (props.chatflowConfig) body.overrideConfig = props.chatflowConfig

    if (isChatFlowAvailableToStream()) body.socketIOClientId = socketIOClientId()

    const result = await sendMessageQuery({
      chatflowid: props.chatflowid,
      apiHost: props.apiHost,
      body,
    })

    if (result.data) {
      if (!isChatFlowAvailableToStream()) {
        let text = extractChatbotResponse(result.data)

        updateAnswer(text)
      }

      fetchSuggestedPrompts()

      setLoading(false)
      setUserInput('')
    }

    if (result.error) {
      const message = result.error?.message ?? 'Something went wrong. Please try again later.'

      updateAnswer(message)

      setLoading(false)
      setUserInput('')
      return
    }
  }

  onMount(() => {
    initTheme(props.themeId, props.theme)
    initText(
      props.text
      // defaultLanguage(),
    )

    if (question()) {
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

      <div
        class={
          'relative flex flex-col h-full w-full bg-cover bg-center chatbot-container overflow-hidden ' +
          props.class
        }
        style={{
          color: theme().textColor,
          'background-color': theme().backgroundColor,
          background: `url(${theme().backgroundImageUrl})`,
          'background-size': 'cover',
        }}
      >
        <Nav question={question()} onClear={clear} />

        <div class='relative flex flex-1 px-16 overflow-hidden'>
          {/* Main Container */}
          <div
            class='flex flex-col flex-1 text-base overflow-hidden pt-6'
            ref={chatWindowParent}
            style={{
              'padding-right': resourcesOpen() ? sidebarPaddingNum + 'px' : '0',
            }}
          >
            <Show
              when={Boolean(question())}
              fallback={
                // Welcome message
                <div class='flex flex-1'>
                  <div class='flex flex-1 items-end '>
                    <h1 class='text-5xl max-w-md h-fit mb-6 font-light tracking-wide '>
                      {text().welcomeMessage}
                    </h1>

                    <TestButton language={props.language} />
                  </div>

                  <SidebarTabView
                    initialPrompts={props.initialPrompts}
                    history={history()}
                    setQuestion={setQuestion}
                    handleSubmit={handleSubmit}
                    disabled={loading()}
                    navDefault={true}
                  />
                </div>
              }
            >
              <ChatWindow question={question()!} />
            </Show>

            {/* Input Container */}
            <div class='w-full pb-1 z-1 border-t pt-6 '>
              <TextInput
                disabled={loading()}
                defaultValue={userInput()}
                onSubmit={handleSubmit}
                placeholder={text().inputPlaceholder}
              />
            </div>

            {/* Suggested Prompt Container */}
            <SuggestedPrompts
              handleSubmit={handleSubmit}
              suggestedPrompts={suggestedPrompts}
              isFetching={isFetchingSuggestedPrompts}
              suggestedPromptsTitle={props.text?.suggestedPromptsTitle}
              loading={loading()}
            />
          </div>

          <ResourcesSidebar
            open={resourcesOpen()}
            toggle={() => setResourcesToggled(!resourcesToggled())}
          >
            <ContextualContainer class='py-6' resources={question()?.resources} />
          </ResourcesSidebar>

          <Show when={question()}>
            {/* Sidebar */}
            <Sidebar
              open={sidebarOpen()}
              onToggle={() => {
                setSidebarOpen(!sidebarOpen())

                setResourcesToggled(true)
              }}
            >
              <SidebarTabView
                initialPrompts={props.initialPrompts}
                history={history()}
                setQuestion={(chat) => {
                  setQuestion(chat)
                  setSidebarOpen(false)
                }}
                handleSubmit={(question) => {
                  handleSubmit(question)
                  setSidebarOpen(false)
                }}
                disabled={loading()}
              />
            </Sidebar>
          </Show>
        </div>

        {sourcePopupOpen() && (
          <Popup
            isOpen={sourcePopupOpen()}
            value={sourcePopupSrc()}
            onClose={() => setSourcePopupOpen(false)}
          />
        )}
      </div>
    </>
  )
}

const TestButton = (props: { language?: string }) => {
  const onTest = async () => {
    console.time('translation')
    // TODO: Make a

    try {
      const translation = await Predictions.convert({
        translateText: {
          source: {
            text: 'Hello world',
            language: props.language || SYSTEM_DEFAULT_LANGUAGE, // either client override or default
          },
          targetLanguage: currentLanguage(),
        },
      })

      console.log(translation)
    } catch (error) {
      console.log(error)
    }
    console.timeEnd('translation')
  }

  return (
    <button class='p-10 bg-blue-400 text-black rounded-md' onClick={onTest}>
      Test
    </button>
  )
}
