import awsconfig from '@/aws-exports'
import { Nav } from '@/components/Nav'
import { LoadingBubble } from '@/components/bubbles/LoadingBubble'
import { TextInput } from '@/components/inputs/textInput'
import { Sidebar, useChatId } from '@/features/bot'
import { BotMessageTheme, UserMessageTheme } from '@/features/bubble/types'
import { ContextualContainer, useContextualElements } from '@/features/contextual'
import { QuestionAnswer, useQuestion } from '@/features/messages'
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
  let chatContainer: HTMLDivElement | undefined
  let botContainer: HTMLDivElement | undefined

  const welcomeMessage = props.welcomeMessage ?? 'Hey there again. How can I help you today?'

  const [userInput, setUserInput] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc] = createSignal({})

  const { theme, setThemeFromKey } = useTheme()
  const { backgroundColor, backgroundImageUrl, promptBackground, textColor } = theme()

  const [suggestedPromptsParent] = createAutoAnimate(/* optional config */)
  const [suggestedPromptsParent2] = createAutoAnimate(/* optional config */)
  const [chatParent] = createAutoAnimate(/* optional config */)
  const [sidebarParent] = createAutoAnimate(/* optional config */)

  const { chatId, clear: clearChatId } = useChatId(props.chatflowid)

  const {
    question,
    createQuestion,
    updateAnswer,
    clear: clearQuestions,
  } = useQuestion(props.chatflowid)

  // const { messages, updateLastMessage, deleteChat, appendMessage, getLastQuery } = useMessages(
  //   props.chatflowid,
  //   welcomeMessage
  // )

  // console.log('messages', messages())
  // const lastQuery = getLastQuery(messages())

  const { handleSourceDocuments, contextualElements, clearContextualElements } =
    useContextualElements({
      chatflowid: props.chatflowid,
      chatId,
    })

  const { suggestedPrompts, fetchSuggestedPrompts, clearSuggestions } = useSuggestedPrompts(
    props.chatflowid,
    props.apiHost
  )

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    chatflowid: props.chatflowid,
    apiHost: props.apiHost,
    onToken: updateAnswer,
    onDocuments: handleSourceDocuments,
  })

  const clear = () => {
    clearQuestions()
    clearContextualElements()
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

    console.log(isChatFlowAvailableToStream())

    if (isChatFlowAvailableToStream()) body.socketIOClientId = socketIOClientId()

    const result = await sendMessageQuery({
      chatflowid: props.chatflowid,
      apiHost: props.apiHost,
      body,
    })

    if (result.data) {
      const data = result.data

      console.log('data', data)
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
    <>
      <div
        ref={botContainer}
        class={
          'relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col chatbot-container px-4 ' +
          props.class
        }
        style={{
          'background-color': backgroundColor,
          background: `url(${backgroundImageUrl})`,
          'background-size': 'cover',
        }}
      >
        {/* <div
          class='absolute h-full w-full opacity-[100%] pointer-events-none z-1'
          style={{
            background: `url(${backgroundImageUrl})`,
            'background-size': 'cover',
          }}

         /> */}

        <Nav question={question()} onClear={clear} />

        {/* Headers container  */}
        <Show when={Boolean(question())}>
          <div class='flex pb-1 border-b mx-10 opacity-30 border-gray-300'>
            <div class='flex flex-1 '>
              <h1 class=' text-2xl font-light '>Chat</h1>
            </div>

            <div class='flex flex-1'>
              <h1 class='flex flex-1 text-2xl font-light '>Resources</h1>
              <h1 class='flex flex-1 ml-14 text-2xl font-light '>Facts</h1>
            </div>
          </div>
        </Show>

        <div class='px-10 flex flex-1 overflow-y-scroll flex-nowrap'>
          {/* Chat container  */}
          <Show when={Boolean(question())}>
            <div
              ref={chatContainer}
              class='flex flex-1 flex-nowrap gap-2'
              style={{
                color: textColor,
              }}
            >
              <QuestionAnswer question={question()!} />

              <ContextualContainer contextualElements={contextualElements} />
            </div>
          </Show>

          <Show when={!question()}>
            <div ref={sidebarParent} class='flex justify-between w-full items-end '>
              <h1 class='text-5xl max-w-md h-fit mb-4  font-light'>{welcomeMessage}</h1>

              <Sidebar class='pt-8 h-full max-w-xs'>
                <NavigationPrompts
                  prompts={props.initialPrompts}
                  onSelect={handleSubmit}
                  disabled={loading()}
                />
              </Sidebar>
            </div>
          </Show>
        </div>

        {/* Input Container */}
        <div class='w-full pb-1 px-10 z-1 '>
          <TextInput
            disabled={loading()}
            defaultValue={userInput()}
            onSubmit={handleSubmit}
            placeholder={props.promptPlaceholder ?? 'Ask me anything...'}
          />
        </div>

        {/* Suggested Prompt Container */}
        <div class='mb-8'>
          <Show when={question()?.answer}>
            <div
              class='flex items-center px-10 h-20 gap-y-1 gap-x-4 '
              ref={suggestedPromptsParent2}
            >
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

        {/* <Badge
          badgeBackgroundColor={props.badgeBackgroundColor}
          poweredByTextColor={props.poweredByTextColor}
          botContainer={botContainer}
        /> */}

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
