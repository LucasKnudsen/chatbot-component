import { Divider, EditIcon, SendIcon } from '@/components'
import { useTheme } from '@/features/theme'
import { createSignal } from 'solid-js'
import { oneClickActions, oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

export const InputOneClick = (props: { onSubmit: (input: string) => void }) => {
  const [input, setInput] = createSignal('')
  const { theme } = useTheme()

  const wrapSubmit = () => {
    if (!input() || oneClickStore.botStatus !== BotStatus.IDLE) return

    oneClickActions.setOneClickStore('chatMode', 'text')
    props.onSubmit(input())
    setInput('')
  }

  const handleKeyDown = (e: any) => {
    setInput(e.currentTarget.value)

    if (e.key === 'Enter' && e.shiftKey === false) {
      wrapSubmit()
    }
  }

  return (
    <div>
      {/* <Show when={oneClickStore.botStatus === BotStatus.NOT_STARTED}>
        <div class='flex text-center justify-center gap-1 text-[var(--primaryColor)] mb-2'>
          <span>Please tap the </span>
          <span class='font-semibold'>START</span>
          <span>button to start the AI</span>
        </div>
      </Show> */}

      <Divider margin={0} />

      <div class='flex items-center justify-between border border-[var(--bubbleButtonColor)] mt-3 rounded-lg bg-[var(--textInputBackgroundColor)]'>
        <EditIcon class='mx-3' color={theme().primaryColor} />

        <input
          value={input()}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          class='grow h-[45px] text-[16px]'
          placeholder='Message'
        />

        <button
          class='all-unset mx-3 flex items-center justify-center h-[45px]'
          onClick={wrapSubmit}
          style={{}}
        >
          <SendIcon color={input() ? theme().primaryColor : 'rgb(170, 170, 170)'} />
        </button>
      </div>
    </div>
  )
}
