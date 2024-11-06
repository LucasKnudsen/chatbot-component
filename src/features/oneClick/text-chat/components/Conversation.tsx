import { IndicationMessage, SparklesIcon, Spinner, UserIconOneClick } from '@/components'
import { Marked } from '@ts-stack/markdown'
import { createEffect, Match, on, Show, Switch } from 'solid-js'
import { useTheme } from '../../../theme'
import { messages } from '../../hooks'
import { oneClickStore } from '../../store/oneClickStore'
import { BotStatus, ChatMessage } from '../../types'

export const Conversation = () => {
  let chatWindowEl: HTMLDivElement | undefined
  const { theme } = useTheme()

  createEffect(
    on(
      () => messages()[messages().length - 1]?.content,
      () => {
        scrollChatWindowToBottom()
      },
      { defer: true }
    )
  )
  createEffect(
    on(
      () => oneClickStore.activeConversationId,
      () => {
        scrollChatWindowToBottom(50)
      },
      { defer: true }
    )
  )

  createEffect(
    on(
      () => oneClickStore.indicationMessage?.message,
      () => {
        scrollChatWindowToBottom(50)
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
      {/* <Show when={messages().length === 0}>
        <StarterInformation />
      </Show> */}

      <Show when={messages().length > 0}>
        <div
          class={`flex justify-start flex-col relative h-[91%] mt-[20px] border-t border-[var(--borderColor)]`}
        >
          {/* Expand button  */}

          {/* <div class='flex absolute z-[100] top-[-13px] w-full items-end justify-end'>
            <button
              class={`flex items-center gap-2 cursor-pointer hover:shadow-md rounded-full justify-end `}
              onClick={handleExpandConversation}
            >
              <div class='border bg-[var(--backgroundColor)] border-[var(--primaryColor)] flex items-center px-3 rounded-2xl gap-[15px]'>
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
            </button>
          </div> */}

          <div
            ref={chatWindowEl}
            class={`flex overflow-auto h-full `}
            style={{
              'scrollbar-width': 'none',
            }}
          >
            <div class='absolute left-0 w-full h-8 bg-gradient-to-b from-[var(--backgroundColor)] to-transparent pointer-events-none z-10' />
            <div class='absolute left-0 bottom-0 w-full h-6 bg-gradient-to-t from-[var(--backgroundColor)] to-transparent pointer-events-none z-10' />

            <Show when={oneClickStore.botStatus !== BotStatus.NOT_STARTED}>
              <div id='conversations' class={`py-4  flex flex-col w-full h-auto gap-2 `}>
                <div class='flex flex-col gap-4 relative '>
                  {/* Chat Messages */}
                  {messages().map((message, index) => {
                    const isStartOfNewConversation =
                      message.conversationId !== oneClickStore.activeConversationId &&
                      (index === messages().length - 1 ||
                        messages()[index + 1].conversationId === oneClickStore.activeConversationId)

                    return (
                      <>
                        <ChatMessageRow {...message} />

                        <Show
                          when={
                            isStartOfNewConversation &&
                            index !== 0 &&
                            oneClickStore.activeChannel?.shouldUseFraiaAPI
                          }
                        >
                          <div class='flex justify-center items-center gap-2 my-4 opacity-80'>
                            <div class='w-1/2 h-0.5 border-t border-dashed border-[var(--primaryColor)] rounded-full' />
                            <div class='text-xs text-center font-semibold text-[var(--primaryColor)]'>
                              Old conversations
                            </div>
                            <div class='w-1/2 h-0.5 border-t border-dashed border-[var(--primaryColor)] rounded-full' />
                          </div>

                          <Show
                            when={
                              messages()[messages().length - 1].conversationId !==
                              oneClickStore.activeConversationId
                            }
                          >
                            <div class='animate-pulse h-6 flex justify-center w-full'>
                              <p class='italic text-center text-xs opacity-50'>
                                Press or type to start a new conversation..
                              </p>
                            </div>
                          </Show>
                        </Show>
                      </>
                    )
                  })}

                  {/* Tool Call Loading */}
                  <Show when={oneClickStore.indicationMessage}>
                    <div class='animate-fade-in'>
                      <IndicationMessage text={oneClickStore.indicationMessage?.message} />
                    </div>
                  </Show>

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

// const StarterInformation = () => {
//   return (
//     <div class='mt-[20px] flex flex-col  justify-center gap-2 opacity-90 '>
//       <div class='text-md font-semibold'>Push to Talk:</div>
//       {/* <Switch>
//         <Match when={props.shouldInitiateNextMessage()}>
//           <div class='text-sm '>
//             - Press <span class='font-semibold text-[var(--primaryColor)]'>"START"</span> to
//             initiate conversation.
//           </div>
//         </Match>
//       </Switch> */}
//       <div class='text-sm '>
//         - Press{' '}
//         <span class='font-semibold text-[var(--primaryColor)]'>
//           <MicrophoneIcon class=' inline' height={16} width={16} stroke-width={2.2} />
//         </span>{' '}
//         to start talking.
//       </div>

//       <div class='text-sm '>
//         - Press <span class='font-semibold text-[var(--primaryColor)]'> ⏹️ </span> when you are done
//         speaking.
//       </div>
//       <div class='text-sm '>
//         - Press <span class='font-semibold text-[var(--primaryColor)]'>"STOP"</span> to interrupt.
//       </div>
//     </div>
//   )
// }

const ChatMessageRow = (props: ChatMessage) => {
  switch (props.role) {
    case 'user':
      return <HumanMessage {...props} />

    case 'assistant':
      return <AssistantMessage {...props} />

    default:
      return null
  }
}

const HumanMessage = (props: ChatMessage) => {
  const { theme } = useTheme()
  return (
    <div
      class='flex gap-2 justify-end '
      style={{
        opacity: oneClickStore.activeConversationId !== props.conversationId ? 0.5 : 1,
      }}
    >
      <div class='flex justify-center items-center px-4 py-2 rounded-lg bg-[var(--surfaceSoftBackground)] shadow-sm text-[var(--textColor)]'>
        <Show when={!props.content && oneClickStore.botStatus === BotStatus.THINKING}>
          <div>
            <Spinner size={18} />
          </div>
        </Show>

        {props.content}
      </div>

      <div class='flex items-center gap-2'>
        <UserIconOneClick color={theme().primaryColor} />
        {/* <div class='font-semibold'>You</div> */}
      </div>
    </div>
  )
}

const AssistantMessage = (props: ChatMessage) => {
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
    <div
      class='flex flex-col gap-1 '
      style={{
        opacity: oneClickStore.activeConversationId !== props.conversationId ? 0.5 : 1,
      }}
    >
      <div class='flex items-center gap-2 -ml-[1.5px]'>
        <SparklesIcon color={theme().primaryColor} />
        <div class='font-semibold'>{props.displayName}</div>
      </div>

      <Switch>
        <Match when={props.content}>
          <div
            ref={textEl}
            class={`${
              theme().isDark ? 'prose-invert' : 'prose'
            } prose-a:text-[var(--primaryColor)] text-[var(--textColor)]`}
          />
        </Match>

        <Match when={oneClickStore.botStatus === BotStatus.THINKING}>
          <div class='my-3 flex items-center gap-2'>
            <Spinner size={18} />
          </div>
        </Match>
      </Switch>
    </div>
  )
}
