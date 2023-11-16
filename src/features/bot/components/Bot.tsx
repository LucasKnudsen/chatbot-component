import { BotBubble } from '@/components/bubbles/BotBubble'
import { GuestBubble } from '@/components/bubbles/GuestBubble'
import { LoadingBubble } from '@/components/bubbles/LoadingBubble'
import { TextInput } from '@/components/inputs/textInput'
import { BotMessageTheme, UserMessageTheme } from '@/features/bubble/types'
import { useSocket } from '@/features/messages/hooks/useSocket'
import { IncomingInput, sendMessageQuery } from '@/features/messages/queries/sendMessageQuery'
import { extractChatbotResponse, removeDuplicateURL } from '@/features/messages/utils'
import { Popup } from '@/features/popup'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Amplify } from 'aws-amplify'
import { For, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'

import awsconfig from '@/aws-exports'

import { Nav } from '@/components/Nav'
import { SourceBubble } from '@/components/bubbles/SourceBubble'
import { Sidebar, chatId } from '@/features/bot'
import { useMessages } from '@/features/messages/hooks/useMessages'
import { NavigationPrompts, Prompt, useSuggestedPrompts } from '@/features/prompt'
import { useTheme } from '@/features/theme/hooks'
import { isValidURL } from '@/utils/isValidUrl'

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

  const welcomeMessage = props.welcomeMessage ?? 'Hi there! How can I help?'

  const [userInput, setUserInput] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  const [sourcePopupOpen, setSourcePopupOpen] = createSignal(false)
  const [sourcePopupSrc, setSourcePopupSrc] = createSignal({})

  const { theme, setThemeFromKey } = useTheme()
  const { backgroundColor, backgroundImageUrl, promptBackground, promptTextColor } = theme()

  const [parent] = createAutoAnimate(/* optional config */)

  const {
    messages,
    updateLastMessage,
    updateLastMessageSourceDocuments,
    deleteChat,
    appendMessage,
  } = useMessages(props.chatflowid, welcomeMessage)

  const {
    suggestedPrompts,
    fetchSuggestedPrompts,
    clearSuggestions,
    isFetching: isFetchingSuggestedPrompts,
  } = useSuggestedPrompts(props.chatflowid, props.apiHost, messages)

  const { socketIOClientId, isChatFlowAvailableToStream } = useSocket({
    chatflowid: props.chatflowid,
    apiHost: props.apiHost,
    onStart: () => appendMessage({ message: '', type: 'apiMessage' }),
    onToken: updateLastMessage,
    onDocuments: updateLastMessageSourceDocuments,
  })

  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainer?.scrollTo(0, chatContainer.scrollHeight)
    }, 50)
  }

  const clear = () => {
    deleteChat()
    clearSuggestions()
  }

  // Handle form submission
  const handleSubmit = async (value: string) => {
    setUserInput(value)

    if (value.trim() === '') {
      return
    }

    setLoading(true)
    scrollToBottom()
    clearSuggestions()

    // Remove welcome message from messages
    const messageList = messages().filter((msg) => msg.message !== welcomeMessage)

    appendMessage({ message: value, type: 'userMessage' })

    const body: IncomingInput = {
      question: value,
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
      const data = result.data

      console.log('data', data)
      if (!isChatFlowAvailableToStream()) {
        let text = extractChatbotResponse(result.data)

        appendMessage({ message: text, sourceDocuments: data?.sourceDocuments, type: 'apiMessage' })
      }

      fetchSuggestedPrompts()

      setLoading(false)
      setUserInput('')
      scrollToBottom()
    }

    if (result.error) {
      const message = result.error?.message ?? 'Something went wrong. Please try again later.'

      appendMessage({ message, type: 'apiMessage' })

      setLoading(false)
      setUserInput('')
      scrollToBottom()
      return
    }
  }

  // Auto scroll chat to bottom
  createEffect(() => {
    if (messages() || suggestedPrompts()) scrollToBottom()
  })

  onMount(() => {
    setThemeFromKey(props.themeId)
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
          'relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col chatbot-container ' +
          props.class
        }
        style={{
          background: backgroundColor,
        }}
      >
        <div
          class='absolute h-full w-full opacity-[15%]'
          style={{
            background: `url(${backgroundImageUrl})`,
            'background-size': 'cover',
          }}
        ></div>
        <Nav messages={messages()} onClear={clear} />

        <div class='flex flex-1 overflow-y-scroll'>
          <div
            ref={chatContainer}
            class='flex-1 overflow-y-scroll pt-16 pl-10 scrollable-container scroll-smooth'
          >
            <For each={[...messages()]}>
              {(message, index) => (
                <>
                  {message.type === 'userMessage' && (
                    <GuestBubble
                      message={message.message}
                      backgroundColor={props.userMessage?.backgroundColor}
                      textColor={props.userMessage?.textColor}
                      showAvatar={props.userMessage?.showAvatar}
                      avatarSrc={props.userMessage?.avatarSrc}
                    />
                  )}
                  {message.type === 'apiMessage' && (
                    <BotBubble
                      message={message.message}
                      backgroundColor={props.botMessage?.backgroundColor}
                      textColor={props.botMessage?.textColor}
                      showAvatar={props.botMessage?.showAvatar}
                      avatarSrc={props.botMessage?.avatarSrc}
                    />
                  )}
                  {message.type === 'userMessage' &&
                    loading() &&
                    index() === messages().length - 1 && <LoadingBubble />}
                  {/* Popups */}
                  {message.sourceDocuments && message.sourceDocuments.length && (
                    <div class='flex w-full'>
                      <For each={[...removeDuplicateURL(message)]}>
                        {(src) => {
                          const URL = isValidURL(src.metadata.source)
                          return (
                            <SourceBubble
                              pageContent={URL ? URL.pathname : src.pageContent}
                              metadata={src.metadata}
                              onSourceClick={() => {
                                if (URL) {
                                  window.open(src.metadata.source, '_blank')
                                } else {
                                  setSourcePopupSrc(src)
                                  setSourcePopupOpen(true)
                                }
                              }}
                            />
                          )
                        }}
                      </For>
                    </div>
                  )}
                </>
              )}
            </For>
          </div>

          <Sidebar class='pt-16 pr-10 max-w-[275px]'>
            <NavigationPrompts
              prompts={props.initialPrompts}
              onSelect={handleSubmit}
              disabled={loading()}
            />
          </Sidebar>
        </div>

        <div class='w-full pb-1 px-10'>
          <TextInput
            disabled={loading()}
            defaultValue={userInput()}
            onSubmit={handleSubmit}
            placeholder={props.promptPlaceholder ?? 'Ask me anything...'}
          />
        </div>

        {/* Suggested Prompt Container */}
        <div class='flex items-center px-10 h-28' ref={parent} style={{ gap: '6px 24px' }}>
          <Show when={messages().length > 2}>
            <p
              class='whitespace-nowrap border-r-2  border-gray-200 pr-8 '
              style={{
                // TODO: Theme it
                color: '#231843A1',
                'font-weight': 700,
              }}
            >
              {props.suggestedPromptsTitle ?? 'SUGGESTED QUESTIONS'}
            </p>

            {isFetchingSuggestedPrompts() ? (
              <LoadingBubble />
            ) : suggestedPrompts().length > 0 ? (
              <For each={suggestedPrompts()}>
                {(p) => (
                  <Prompt
                    prompt={p}
                    onClick={handleSubmit}
                    color={promptTextColor}
                    background={promptBackground}
                    disabled={loading()}
                  />
                )}
              </For>
            ) : (
              <button
                onClick={() => {
                  fetchSuggestedPrompts()
                }}
              >
                Fetch
              </button>
            )}
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

// const sourceDocuments = [
//   {
//     pageContent:
//       'I know some are talking about “living with COVID-19”. Tonight – I say that we will never just accept living with COVID-19. \r\n\r\nWe will continue to combat the virus as we do other diseases. And because this is a virus that mutates and spreads, we will stay on guard. \r\n\r\nHere are four common sense steps as we move forward safely.  \r\n\r\nFirst, stay protected with vaccines and treatments. We know how incredibly effective vaccines are. If you’re vaccinated and boosted you have the highest degree of protection. \r\n\r\nWe will never give up on vaccinating more Americans. Now, I know parents with kids under 5 are eager to see a vaccine authorized for their children. \r\n\r\nThe scientists are working hard to get that done and we’ll be ready with plenty of vaccines when they do. \r\n\r\nWe’re also ready with anti-viral treatments. If you get COVID-19, the Pfizer pill reduces your chances of ending up in the hospital by 90%.',
//     metadata: {
//       source: 'blob',
//       blobType: '',
//       loc: {
//         lines: {
//           from: 450,
//           to: 462,
//         },
//       },
//     },
//   },
//   {
//     pageContent:
//       'sistance,  and  polishing  [65].  For  instance,  AI  tools  generate\nsuggestions based on inputting keywords or topics. The tools\nanalyze  search  data,  trending  topics,  and  popular  queries  to\ncreate  fresh  content.  What’s  more,  AIGC  assists  in  writing\narticles and posting blogs on specific topics. While these tools\nmay not be able to produce high-quality content by themselves,\nthey can provide a starting point for a writer struggling with\nwriter’s block.\nH.  Cons of AIGC\nOne of the main concerns among the public is the potential\nlack  of  creativity  and  human  touch  in  AIGC.  In  addition,\nAIGC sometimes lacks a nuanced understanding of language\nand context, which may lead to inaccuracies and misinterpre-\ntations. There are also concerns about the ethics and legality\nof using AIGC, particularly when it results in issues such as\ncopyright  infringement  and  data  privacy.  In  this  section,  we\nwill discuss some of the disadvantages of AIGC (Table IV).',
//     metadata: {
//       source: 'blob',
//       blobType: '',
//       pdf: {
//         version: '1.10.100',
//         info: {
//           PDFFormatVersion: '1.5',
//           IsAcroFormPresent: false,
//           IsXFAPresent: false,
//           Title: '',
//           Author: '',
//           Subject: '',
//           Keywords: '',
//           Creator: 'LaTeX with hyperref',
//           Producer: 'pdfTeX-1.40.21',
//           CreationDate: 'D:20230414003603Z',
//           ModDate: 'D:20230414003603Z',
//           Trapped: {
//             name: 'False',
//           },
//         },
//         metadata: null,
//         totalPages: 17,
//       },
//       loc: {
//         pageNumber: 8,
//         lines: {
//           from: 301,
//           to: 317,
//         },
//       },
//     },
//   },
//   {
//     pageContent: 'Main article: Views of Elon Musk',
//     metadata: {
//       source: 'https://en.wikipedia.org/wiki/Elon_Musk',
//       loc: {
//         lines: {
//           from: 2409,
//           to: 2409,
//         },
//       },
//     },
//   },
//   {
//     pageContent:
//       'First Name: John\nLast Name: Doe\nAddress: 120 jefferson st.\nStates: Riverside\nCode: NJ\nPostal: 8075',
//     metadata: {
//       source: 'blob',
//       blobType: '',
//       line: 1,
//       loc: {
//         lines: {
//           from: 1,
//           to: 6,
//         },
//       },
//     },
//   },
// ]
