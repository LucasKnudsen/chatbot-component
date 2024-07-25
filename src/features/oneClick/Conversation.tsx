import { ExpandIcon, SparklesIcon, Spinner, TextLoading, UserIconOneClick } from '@/components'
import { Marked } from '@ts-stack/markdown'
import { Accessor, createEffect, createSignal, on, Show } from 'solid-js'
import { useTheme } from '../theme'
import { oneClickStore } from './store/oneClickStore'
import { BotStatus, ChatMessage } from './types'

export const [expandConversation, setExpandConversation] = createSignal<boolean>(false)

export const Conversation = (props: { messages: Accessor<ChatMessage[]> }) => {
  let chatWindowEl: HTMLDivElement | undefined
  const { theme } = useTheme()

  const handleExpandConversation = () => {
    setExpandConversation((prev) => !prev)
  }

  createEffect(
    on(
      () => props.messages()[props.messages().length - 1]?.content,
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
      {/* Starter information for the user when there is no messages yet */}
      <Show when={props.messages().length === 0}>
        <StarterInfo />
      </Show>

      <Show when={props.messages().length > 0}>
        <div class={`flex justify-start flex-col relative h-[91%] mt-[20px] border-t`}>
          <div class='absolute z-[100] top-[-15px] w-full justify-end'>
            {/* Expand button  */}
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
              <div
                id='conversations'
                class={`py-4 animate-fade-in flex flex-col w-full h-auto gap-2 `}
              >
                <div class='flex flex-col gap-4 relative '>
                  {props.messages().map((message) => (
                    <ChatMessageRow content={message.content} role={message.role} />
                  ))}

                  <div class='w-full h-2 ' />
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </>
  )
}

const StarterInfo = () => {
  return (
    <div class='mt-[20px] flex flex-col text-[var(--primaryColor)] justify-center gap-2 opacity-90 '>
      <div class='text-md font-semibold'>Push to Talk:</div>
      <div class='text-sm text-[var(--primaryColor)]'>
        - Press <span class='font-semibold'>"START"</span> to start speaking.
      </div>
      <div class='text-sm text-[var(--primaryColor)]'>
        - Press <span class='font-semibold'>⏹️</span> when you are done speaking.
      </div>
      <div class='text-sm text-[var(--primaryColor)]'>
        - Press <span class='font-semibold'>"STOP"</span> to interrupt.
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
  const { theme } = useTheme()
  return (
    <div class='flex gap-2 justify-end '>
      <Show when={!props.content && oneClickStore.botStatus === BotStatus.THINKING}>
        <div class='my-3'>
          <Spinner size={18} />
        </div>
      </Show>
      <div class='flex justify-center items-center px-4 py-2 rounded-lg bg-[var(--surfaceSoftBackground)] shadow-sm'>
        {props.content}
      </div>

      <div class='flex items-center gap-2'>
        <UserIconOneClick color={theme().primaryColor} />
        {/* <div class='font-semibold'>You</div> */}
      </div>
    </div>
  )
}

const AssistantMessage = (props: { content: string }) => {
  let textEl: HTMLDivElement | undefined
  const { theme } = useTheme()

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
      <div class='flex items-center gap-2 -ml-[1.5px]'>
        <SparklesIcon color={theme().primaryColor} />
        <div class='font-semibold'>
          {oneClickStore.activeChannel?.botDisplayName || 'Assistant'}
        </div>
      </div>
      <Show
        when={props.content}
        fallback={
          <div class='my-3 flex items-center gap-2'>
            <Spinner size={18} />
            <Show when={oneClickStore.isProcessToolCall}>
              <TextLoading />
            </Show>
          </div>
        }
      >
        <div ref={textEl} class='prose' />
      </Show>
    </div>
  )
}
