import { BrainAIOneClick, ExpandIcon, Spinner, UserIconOneClick } from '@/components'
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
    <div
      class={`flex justify-start flex-col relative h-[91%] mt-[20px] ${
        props.messages?.length > 0 ? 'border-t' : ''
      }`}
    >
      <Show when={props.messages?.length > 0}>
        <div class='absolute z-[100] top-[-15px] w-full justify-end'>
          <button class={`flex justify-end gap-2 w-full `} onClick={handleExpandConversation}>
            <div class='flex items-center gap-2 cursor-pointer hover:shadow-md rounded-full'>
              <div class='border bg-white border-[var(--primaryColor)] flex items-center px-3 rounded-2xl gap-[15px]'>
                <span class='text-sm font-semibold text-[var(--primaryColor)]'>
                  {expandConversation() ? 'Collapse' : 'Expand'}
                </span>

                <ExpandIcon
                  width={10}
                  height={10}
                  color={theme().primaryColor}
                  style={{
                    transform: expandConversation() ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </div>
            </div>
          </button>
        </div>
      </Show>

      <div
        ref={chatWindowEl}
        class={`flex overflow-auto h-full `}
        style={{
          'scrollbar-width': 'none',
        }}
      >
        <div class='absolute left-0 w-full h-8 bg-gradient-to-b from-white to-transparent pointer-events-none z-10' />
        <div class='absolute left-0 bottom-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none z-10' />
        <Show when={oneClickStore.botStatus !== BotStatus.NOT_STARTED}>
          <div id='conversations' class={`py-4 animate-fade-in flex flex-col w-full h-auto gap-2 `}>
            <div class='flex flex-col gap-2 relative '>
              {props.messages.map((message) => (
                <ChatMessageRow content={message.content} role={message.role} />
              ))}

              <div class='w-full h-2 ' />
            </div>
          </div>
        </Show>
      </div>
    </div>
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
    <div class='flex flex-col gap-1 '>
      <div class='flex items-center gap-2'>
        <UserIconOneClick />
        <div class='font-bold'>You</div>
      </div>

      <Show when={!props.content && oneClickStore.botStatus === BotStatus.THINKING}>
        <div class='my-3'>
          <Spinner size={18} />
        </div>
      </Show>
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
            <Spinner size={18} />
          </div>
        }
      >
        <div ref={textEl} class='prose' />
      </Show>
    </div>
  )
}
