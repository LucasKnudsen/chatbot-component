import { MuteAISwitch } from './MuteAISwitch'
import { AvatarOneClick } from './AvatarOneClick'
import { ButtonStart } from './ButtonStart'
import { InputOneClick } from './InputOneClick'
import { Show, createSignal } from 'solid-js'
import { AITextStatus } from './AITextStatus'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

export const BotOneClick = () => {
  const [isStart, setIsStart] = createSignal<boolean>(false)
  const [AITextStatusParent] = createAutoAnimate()
  const [inputParent] = createAutoAnimate()

  const handleStart = () => {
    setIsStart(!isStart())
  }

  return (
    <div
      data-testid='BotOneClick'
      class='block md:hidden relative flex flex-col grow lg:px-16 animate-fade-in mt-4 overflow-hidden'
    >
      <div
        ref={AITextStatusParent}
        class='flex flex-col grow w-full  items-center overflow-hidden px-5'
      >
        <Show when={isStart()} keyed>
          <AITextStatus />
        </Show>
        <div class='relative w-full h-full'>
          <div class='absolute h-full left-2 top-2 z-10'>
            {/* Allow MuteAISwith to use auto-animate while changing layout*/}
            <Show when={!isStart()} keyed>
            <MuteAISwitch mode='hasAvatar' />
              </Show>
            <Show when={isStart()} keyed>
            <MuteAISwitch mode='hasAvatar' />
            </Show>
          </div>
          <div class='h-[70%]'>
              <AvatarOneClick />
          </div>
          <div class='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ButtonStart onStart={handleStart} isStart={isStart} />
          </div>
        </div>
      </div>
      <div ref={inputParent} class={`h-[90px] ${isStart() ? '' : 'flex items-end justify-center'}`}>
        <Show when={!isStart()}>
          <div class='flex text-center justify-center gap-1 text-[var(--primaryColor)]'>
            <span>Please tap the </span>
            <span class='font-semibold'>START</span>
            <span>button to start the AI</span>
          </div>
        </Show>
        <Show when={isStart()} keyed>
          <InputOneClick isStart={isStart} />
        </Show>
      </div>
    </div>
  )
}