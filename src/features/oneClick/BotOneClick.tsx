import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createEffect, createSignal } from 'solid-js'
import { AITextStatus } from './AITextStatus'
import { AvatarOneClick } from './AvatarOneClick'
import { ButtonStart } from './ButtonStart'
import { Conversation } from './Conversation'
import { InputOneClick } from './InputOneClick'
import { MuteAISwitch } from './MuteAISwitch'

export const BOT_STATUS = {
  NOT_STARTED: 'not_started',
  IDLE: 'idle',
  LISTENING: 'listening',
  THINKING: 'thinking',
  ANSWERING: 'answering',
}
type ConversationType = {
  message: string
  role: 'bot' | 'user'
}

export const BotOneClick = () => {
  const [isStart, setIsStart] = createSignal<boolean>(false)
  const [status, setStatus] = createSignal<string>(BOT_STATUS.NOT_STARTED)
  const [conversation, setConversation] = createSignal<ConversationType[]>([])

  const [AITextStatusParent] = createAutoAnimate()
  const [inputParent] = createAutoAnimate()
  const [answerParent] = createAutoAnimate()
  const [conversationParent] = createAutoAnimate()

  const handleButtonRecord = () => {
    if (!isStart()) {
      setIsStart(true)
      setStatus(BOT_STATUS.LISTENING)
      return
    }
    if (isStart() && status() === BOT_STATUS.LISTENING) {
      setStatus(BOT_STATUS.THINKING)
      return
    }
    if (isStart() && status() === BOT_STATUS.ANSWERING) {
      setStatus(BOT_STATUS.IDLE)
      setIsStart(false)
      return
    }
  }

  const handleSwitchBotStatus = () => {
    switch (status()) {
      case BOT_STATUS.THINKING:
        const userConversation: ConversationType = {
          message: 'Tell me about the Author Neil Gaiman..',
          role: 'user',
        }
        setConversation((prev) => [...prev, userConversation])
        setTimeout(() => {
          setStatus(BOT_STATUS.ANSWERING)
        }, 3000)
        break
      case BOT_STATUS.ANSWERING:
        setTimeout(() => {
          setStatus(BOT_STATUS.IDLE)
          setIsStart(false)
          const botConversation: ConversationType = {
            message: 'Lorem ipsum dolor sit amet consectetur. Enim integer iaculis dictum metus',
            role: 'bot',
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
        setStatus(BOT_STATUS.IDLE)
      }, 2000)
      return
    }
    handleSwitchBotStatus()
  })

  return (
    <div
      data-testid='BotOneClick'
      class='block md:hidden relative flex flex-col grow lg:px-16 animate-fade-in mt-4 overflow-hidden'
    >
      <div
        ref={AITextStatusParent}
        class='flex flex-col grow w-full  items-center overflow-hidden px-5'
      >
        <Show
          when={
            status() === BOT_STATUS.NOT_STARTED ||
            status() === BOT_STATUS.THINKING ||
            status() === BOT_STATUS.ANSWERING
          }
          keyed
        >
          <AITextStatus status={status} />
        </Show>
        <div class='relative w-full h-full'>
          <div class='absolute h-full left-2 top-2 z-10'>
            {/* Allow MuteAISwith to use auto-animate while changing layout*/}
            <Show when={!isStart() && status() !== BOT_STATUS.NOT_STARTED} keyed>
              <MuteAISwitch mode='hasAvatar' />
            </Show>
            <Show when={isStart() && status() !== BOT_STATUS.NOT_STARTED} keyed>
              <MuteAISwitch mode='hasAvatar' />
            </Show>
          </div>
          <div class='h-[70%]'>
            <AvatarOneClick />
          </div>
          <div class='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ButtonStart onStart={handleButtonRecord} isStart={isStart} status={status} />
          </div>
        </div>
      </div>
      <div ref={answerParent} class='overflow-scroll pt-2.5 pb-3.5'>
        <Show
          when={
            status() === BOT_STATUS.IDLE ||
            status() === BOT_STATUS.THINKING ||
            status() === BOT_STATUS.ANSWERING
          }
        >
          <div
            id='conversations'
            ref={conversationParent}
            class={`${
              status() === BOT_STATUS.IDLE ? 'h-[90px]' : ' h-[64px]'
            } px-5 flex flex-col gap-2 overflow-scroll`}
          >
            {conversation().map((item) => (
              <Conversation message={item.message} role={item.role} />
            ))}
          </div>
        </Show>
      </div>
      <div
        ref={inputParent}
      >
        <Show when={status() === BOT_STATUS.NOT_STARTED}>
            <div class='flex text-center justify-center gap-1 text-[var(--primaryColor)] mb-2'>
              <span>Please tap the </span>
              <span class='font-semibold'>START</span>
              <span>button to start the AI</span>
            </div>
        </Show>
        <Show
          when={status() === BOT_STATUS.IDLE}
          keyed
        >
          <div class='h-[70px]'>
            <InputOneClick isStart={isStart} />
          </div>
        </Show>
      </div>
    </div>
  )
}
