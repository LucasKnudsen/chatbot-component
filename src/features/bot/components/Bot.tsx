import awsconfig from '@/aws-exports'
import { Nav } from '@/components/Nav'
import { LoadingBubble } from '@/components/bubbles/LoadingBubble'
import { TextInput } from '@/components/inputs/textInput'
import { Sidebar, useChatId } from '@/features/bot'
import { BotMessageTheme, UserMessageTheme } from '@/features/bubble/types'
import { ContextualContainer } from '@/features/contextual'
import { ChatWindow, useQuestion } from '@/features/messages'
import { useSocket } from '@/features/messages/hooks/useSocket'
import { IncomingInput, sendMessageQuery } from '@/features/messages/queries/sendMessageQuery'
import { extractChatbotResponse } from '@/features/messages/utils'
import { Popup } from '@/features/popup'
import { NavigationPrompts, Prompt, useSuggestedPrompts } from '@/features/prompt'
import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

import { Amplify } from 'aws-amplify'
import { For, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'

Amplify.configure(awsconfig)

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
  themeId?: string
  initialPrompts?: PromptType[]
  apiHost: string
  navPromptsTitle?: string
  promptPlaceholder?: string
  suggestedPromptsTitle?: string
  chatflowConfig?: Record<string, unknown>
  welcomeMessage?: string
  botMessage?: BotMessageTheme
  userMessage?: UserMessageTheme
  poweredByTextColor?: string
  badgeBackgroundColor?: string
  bubbleBackgroundColor?: string
  bubbleTextColor?: string
  title?: string
  titleAvatarSrc?: string
  isFullPage?: boolean
}

export const Bot = (props: BotProps & { class?: string }) => {
  const welcomeMessage = props.welcomeMessage ?? 'Hey there again. How can I help you today?'

  const [userInput, setUserInput] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc] = createSignal({})

  const { theme, setThemeFromKey } = useTheme()
  const { backgroundColor, backgroundImageUrl, promptBackground, textColor } = theme()

  const [chatWindowParent] = createAutoAnimate(/* optional config */)
  const [suggestedPromptsParent] = createAutoAnimate(/* optional config */)

  const { chatId, clear: clearChatId } = useChatId(props.chatflowid)

  const {
    question,
    createQuestion,
    updateAnswer,
    clear: clearQuestions,
    handleSourceDocuments,
    history,
    setQuestion,
  } = useQuestion(props.chatflowid)

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
    // clearContextualElements()
    clearSuggestions()
    clearChatId()
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
    setThemeFromKey(props.themeId)

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
    <div
      class={
        'relative flex flex-col h-full w-full bg-cover bg-center chatbot-container overflow-hidden ' +
        props.class
      }
      style={{
        'background-color': backgroundColor,
        background: `url(${backgroundImageUrl})`,
        'background-size': 'cover',
      }}
    >
      <Nav question={question()} onClear={clear} />

      <div class='relative flex flex-1 px-10 gap-10 overflow-hidden'>
        {/* Main Container */}
        <div class='flex flex-col flex-1 text-base overflow-hidden' ref={chatWindowParent}>
          <Show
            when={Boolean(question())}
            fallback={
              // Welcome message
              <div class='flex flex-1 items-end '>
                <h1 class='text-5xl max-w-md h-fit mb-6 font-light '>{welcomeMessage}</h1>
              </div>
            }
          >
            <ChatWindow
              question={question()!}
              isFetchingSuggestedPrompts={isFetchingSuggestedPrompts()}
            />
          </Show>

          {/* Input Container */}
          <div class='w-full pb-1 z-1 border-t pt-6 '>
            <TextInput
              disabled={loading()}
              defaultValue={userInput()}
              onSubmit={handleSubmit}
              placeholder={props.promptPlaceholder ?? 'Ask me anything...'}
            />
          </div>

          {/* Suggested Prompt Container */}
          <div class='mb-8' ref={suggestedPromptsParent}>
            <Show when={isFetchingSuggestedPrompts() || suggestedPrompts().length > 0}>
              <div class='flex items-center h-20 gap-y-1 gap-x-4 '>
                <p
                  class='whitespace-nowrap border-r-2 border-gray-200 pr-8 font-bold'
                  style={{
                    // TODO: Theme it
                    color: '#231843A1',
                  }}
                >
                  {props.suggestedPromptsTitle ?? 'FOLLOW UP QUESTIONS'}
                </p>
                <Show when={suggestedPrompts().length > 0} fallback={<LoadingBubble />}>
                  <For each={suggestedPrompts()}>
                    {(p) => (
                      <Prompt
                        prompt={p}
                        onClick={handleSubmit}
                        color={textColor}
                        background={promptBackground}
                        disabled={loading()}
                      />
                    )}
                  </For>
                </Show>
              </div>
            </Show>
          </div>
        </div>

        {/* Resources Container */}
        <Show when={question()}>
          <div class='border-l'></div>

          <ContextualContainer resources={question()!.resources} />
        </Show>

        {/* Sidebar */}
        <Sidebar open={!!question()}>
          <div class='text-lg'>History</div>

          <ul>
            <For each={history()}>
              {(q) => (
                <li class='mb-2' onClick={() => setQuestion(q)}>
                  {q.question}
                </li>
              )}
            </For>
          </ul>

          <NavigationPrompts
            prompts={props.initialPrompts}
            onSelect={handleSubmit}
            disabled={loading()}
          />
        </Sidebar>
      </div>

      {sourcePopupOpen() && (
        <Popup
          isOpen={sourcePopupOpen()}
          value={sourcePopupSrc()}
          onClose={() => setSourcePopupOpen(false)}
        />
      )}
    </div>
  )
}
