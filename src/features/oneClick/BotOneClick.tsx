import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createEffect, createSignal } from 'solid-js'
import {
  AITextStatus,
  AvatarOneClick,
  ButtonStart,
  InputOneClick,
  MuteAISwitch,
} from './components'
import { Conversation } from './Conversation'
import { oneClickActions, oneClickStore } from './store/oneClickStore'
import { BotStatus, ChatMessage } from './types'

export const BotOneClick = () => {
  const [isStart, setIsStart] = createSignal<boolean>(false)
  const [conversation, setConversation] = createSignal<ChatMessage[]>([])

  const [TopContainerParent] = createAutoAnimate()

  const handleButtonRecord = () => {
    if (!isStart()) {
      setIsStart(true)
      oneClickActions.setStatus(BotStatus.LISTENING)
      return
    }
    if (isStart() && oneClickStore.botStatus === BotStatus.LISTENING) {
      oneClickActions.setStatus(BotStatus.THINKING)
      return
    }
    if (isStart() && oneClickStore.botStatus === BotStatus.ANSWERING) {
      oneClickActions.setStatus(BotStatus.IDLE)
      setIsStart(false)
      return
    }
  }

  const handleSwitchBotStatus = () => {
    switch (oneClickStore.botStatus) {
      case BotStatus.THINKING:
        const userConversation: ChatMessage = {
          message: 'Tell me about the Author Neil Gaiman..',
          role: 'user',
        }
        setConversation((prev) => [...prev, userConversation])
        setTimeout(() => {
          oneClickActions.setStatus(BotStatus.ANSWERING)
        }, 3000)
        break

      case BotStatus.ANSWERING:
        setTimeout(() => {
          oneClickActions.setStatus(BotStatus.IDLE)
          setIsStart(false)
          const botConversation: ChatMessage = {
            message: 'Lorem ipsum dolor sit amet consectetur. Enim integer iaculis dictum metus',
            role: 'assistant',
          }
          setConversation((prev) => [...prev, botConversation])
        }, 4000)
        break
      default:
        break
    }
  }

  createEffect(() => {
    if (!isStart()) {
      setTimeout(() => {
        oneClickActions.setStatus(BotStatus.IDLE)
      }, 2000)
      return
    }
    handleSwitchBotStatus()
  })

  return (
    <div
      data-testid='BotOneClick'
      class='md:hidden relative flex flex-col grow lg:px-16 animate-fade-in mt-4 overflow-hidden'
    >
      <div
        ref={TopContainerParent}
        class='flex flex-col grow w-full  items-center overflow-hidden px-5 bg-white'
      >
        <Show
          when={
            oneClickStore.botStatus === BotStatus.NOT_STARTED ||
            oneClickStore.botStatus === BotStatus.THINKING ||
            oneClickStore.botStatus === BotStatus.ANSWERING
          }
          keyed
        >
          <AITextStatus />
        </Show>

        <div class='relative w-full h-full'>
          <div class='absolute h-full left-2 top-2 z-10'>
            {/* Allow MuteAISwith to use auto-animate while changing layout*/}
            <Show when={!isStart() && oneClickStore.botStatus !== BotStatus.NOT_STARTED} keyed>
              <MuteAISwitch />
            </Show>
            <Show when={isStart() && oneClickStore.botStatus !== BotStatus.NOT_STARTED} keyed>
              <MuteAISwitch />
            </Show>
          </div>

          <div class='h-[70%]'>
            <AvatarOneClick />
          </div>

          <div class='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ButtonStart onStart={handleButtonRecord} isStart={isStart} />
          </div>
        </div>
      </div>

      <Conversation messages={conversation()} />

      {/* Text Input  */}
      <InputOneClick />
    </div>
  )
}
