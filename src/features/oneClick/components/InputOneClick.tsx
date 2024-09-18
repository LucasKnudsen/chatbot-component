import { Divider, EditIcon, SendIcon } from '@/components'
import { useTheme } from '@/features/theme'
import { createSignal, Show } from 'solid-js'
import { oneClickActions, oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

type InputProps = {
  onSubmit: (input: string) => void
  cancelQuery: () => void
}

export const InputOneClick = (props: InputProps) => {
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
      e.preventDefault()
    }
  }

  return (
    <div>
      <Divider margin={0} />

      <div class='flex items-center justify-between border border-[var(--bubbleButtonColor)] mt-3 rounded-lg bg-[var(--textInputBackgroundColor)]'>
        <EditIcon class='mx-3' color={theme().primaryColor} />

        <textarea
          value={input()}
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          class='grow h-[45px] text-[16px] text-[var(--textInputTextColor)] bg-transparent px-3 py-2 resize-none'
          placeholder='Message'
          rows={1}
        />

        <Show
          when={!oneClickStore.isBotProcessing}
          fallback={
            // Cancel button when bot is thinking or answering
            <button
              class='all-unset mx-3 flex items-center justify-center h-[45px]'
              onClick={props.cancelQuery}
            >
              <div class='w-3.5 h-3.5 rounded-sm bg-[var(--primaryColor)] ' />
            </button>
          }
        >
          <button
            class='all-unset mx-3 flex items-center justify-center h-[45px]'
            onClick={wrapSubmit}
          >
            <SendIcon
              style={{
                opacity: oneClickStore.botStatus === BotStatus.IDLE && input() ? 1 : 0.5,
                fill: theme().primaryColor,
              }}
            />
          </button>
        </Show>
      </div>
    </div>
  )
}
