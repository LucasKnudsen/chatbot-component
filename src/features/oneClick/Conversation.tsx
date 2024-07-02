import { BrainAIOneClick, ExpandIcon, TypingBubble, UserIconOneClick } from '@/components'
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon'
import { Marked } from '@ts-stack/markdown'
import { createEffect, createSignal, on, Show } from 'solid-js'
import { useTheme } from '../theme'
import { oneClickStore } from './store/oneClickStore'
import { BotStatus, ChatMessage } from './types'

export const [expandConversation, setExpandConversation] = createSignal<boolean>(false)

export const Conversation = (props: { messages: ChatMessage[] }) => {
  let chatWindowEl: HTMLDivElement | undefined
  const { theme } = useTheme()

  const handleExpandConversation = () => {
    setExpandConversation((prev) => !prev)
    // scrollChatWindowToBottom()
  }

  createEffect(
    on(
      () => props.messages[props.messages.length - 1]?.content,
      () => {
        requestAnimationFrame(scrollChatWindowToBottom)
      },
      { defer: true }
    )
  )

  const scrollChatWindowToBottom = (by: number = 0) => {
    if (chatWindowEl !== undefined) {
      setTimeout(
        () =>
          by
            ? chatWindowEl!.scrollBy({
                top: by,
                behavior: 'smooth',
              })
            : chatWindowEl!.scrollTo(0, chatWindowEl!.scrollHeight),
        50
      )
    }
  }

  return (
    <>
      <div class='w-full  justify-end hidden'>
        <button class={`flex gap-2 `} onClick={handleExpandConversation}>
          <div class='flex items-center gap-2 cursor-pointer px-2 hover:shadow-md rounded'>
            <Show
              when={expandConversation()}
              fallback={
                <>
                  <ExpandIcon width={10} height={10} color={theme().primaryColor} />
                  <span
                    style={{
                      color: theme().primaryColor,
                    }}
                  >
                    Expand
                  </span>
                </>
              }
            >
              <ArrowLeftIcon width={10} height={10} color={theme().primaryColor} />
              <span
                style={{
                  color: theme().primaryColor,
                }}
              >
                Return
              </span>
            </Show>
          </div>
        </button>
      </div>

      <div class='flex relative min-h-24  '>
        <div class='absolute left-0 w-full h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10' />
        <div class='absolute left-0 bottom-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none z-10' />

        <Show when={oneClickStore.botStatus !== BotStatus.NOT_STARTED}>
          <div
            id='conversations'
            ref={chatWindowEl}
            class={`py-3 animate-fade-in flex flex-col w-full h-auto gap-2 overflow-auto`}
            style={{
              'scrollbar-width': 'none',
            }}
          >
            <div class='flex flex-col gap-2 relative animate-fade-in'>
              {props.messages.map((message) => (
                <ChatMessageRow content={message.content} role={message.role} />
              ))}
            </div>
          </div>
        </Show>
      </div>
    </>
  )
}

const ChatMessageRow = (props: ChatMessage) => {
  switch (props.role) {
    case 'user':
      return <HumanMessage content={props.content} />

    case 'assistant':
      return <AssistantMessage content={props.content} />

    default:
      return null
  }
}

const HumanMessage = (props: { content: string }) => {
  return (
    <div class='flex flex-col gap-1'>
      <div class='flex items-center gap-2'>
        <UserIconOneClick />
        <div class='font-bold'>You</div>
      </div>
      <div>{props.content}</div>
    </div>
  )
}

const AssistantMessage = (props: { content: string }) => {
  let textEl: HTMLDivElement | undefined

  createEffect(
    on(
      () => props.content,
      () => {
        if (textEl) {
          textEl.innerHTML = Marked.parse(props.content)
        }
      }
    )
  )

  return (
    <div class='flex flex-col gap-1 '>
      <div class='flex items-center gap-2'>
        <BrainAIOneClick />
        <div class='font-bold'>AI</div>
      </div>
      <Show
        when={props.content}
        fallback={
          <div class='my-3'>
            <TypingBubble height='6px' width='6px' />
          </div>
        }
      >
        <div ref={textEl} class='prose' />
      </Show>
    </div>
  )
}
