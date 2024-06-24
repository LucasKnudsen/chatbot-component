import { BrainAIOneClick, UserIconOneClick } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show } from 'solid-js'
import { oneClickStore } from './store/oneClickStore'
import { BotStatus, ChatMessage } from './types'

export const Conversation = (props: { messages: ChatMessage[] }) => {
  const [answerParent] = createAutoAnimate()
  const [conversationParent] = createAutoAnimate()

  return (
    <div ref={answerParent} class='overflow-scroll pt-2.5 pb-3.5'>
      <Show
        when={
          oneClickStore.botStatus === BotStatus.IDLE ||
          oneClickStore.botStatus === BotStatus.THINKING ||
          oneClickStore.botStatus === BotStatus.ANSWERING
        }
      >
        <div
          id='conversations'
          ref={conversationParent}
          class={`px-5 flex flex-col gap-2 overflow-scroll`}
          style={{
            height: oneClickStore.botStatus === BotStatus.IDLE ? '90px' : '64px',
          }}
        >
          <div class='flex flex-col gap-2'>
            {props.messages.map((message) => (
              <ChatMessageRow message={message.message} role={message.role} />
            ))}
          </div>
        </div>
      </Show>
    </div>
  )
}

const ChatMessageRow = (props: ChatMessage) => {
  switch (props.role) {
    case 'user':
      return <HumanMessage message={props.message} />

    case 'assistant':
      return <AssistantMessage message={props.message} />

    default:
      return null
  }
}

const HumanMessage = (props: { message: string }) => {
  return (
    <div class='flex flex-col gap-1'>
      <div class='flex items-center gap-2'>
        <UserIconOneClick />
        <div class='font-bold'>You</div>
      </div>
      <div>{props.message}</div>
    </div>
  )
}

const AssistantMessage = (props: { message: string }) => {
  return (
    <div class='flex flex-col gap-1'>
      <div class='flex items-center gap-2'>
        <BrainAIOneClick />
        <div class='font-bold'>AI</div>
      </div>
      <div class='text-[var(--primaryColor)]'>{props.message}</div>
    </div>
  )
}
