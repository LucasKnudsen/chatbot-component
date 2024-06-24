import { EditIcon, SendIcon } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show } from 'solid-js'
import { useTheme } from '../../theme'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

export const InputOneClick = () => {
  const [inputParent] = createAutoAnimate()

  const { theme } = useTheme()

  return (
    <div ref={inputParent}>
      <Show when={oneClickStore.botStatus === BotStatus.NOT_STARTED}>
        <div class='flex text-center justify-center gap-1 text-[var(--primaryColor)] mb-2'>
          <span>Please tap the </span>
          <span class='font-semibold'>START</span>
          <span>button to start the AI</span>
        </div>
      </Show>

      <Show when={oneClickStore.botStatus === BotStatus.IDLE} keyed>
        <div class='h-[70px]'>
          <div class={`py-3 border-t border-[${theme().borderColor}] w-full`}>
            <div class='flex items-center justify-between mx-5 border border-[var(--bubbleButtonColor)] px-3 py-0 rounded-lg bg-[var(--textInputBackgroundColor)]'>
              <EditIcon />
              <input class='w-4/5 h-4/5 tex-[15px]' placeholder='Text with the AI' />
              <SendIcon color={'rgb(170, 170, 170)'} />
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
}
