import { Show } from 'solid-js'
import { useTheme } from '../../theme'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

interface Props {
  onStart: () => void
}
export const ButtonStart = (props: Props) => {
  const handleRenderButtonContent = () => {
    switch (oneClickStore.botStatus) {
      case BotStatus.LISTENING:
        return <StopIcon />

      case BotStatus.THINKING:
        return 'STOP'

      case BotStatus.ANSWERING:
        return 'STOP'

      default:
        return 'START'
    }
  }

  return (
    <Show when={oneClickStore.botStatus !== BotStatus.NOT_STARTED}>
      <div class='absolute z-20 left-1/2 transform -translate-x-1/2 bottom-0 hover:brightness-105 transition-all hover:scale-105'>
        <div
          onClick={props.onStart}
          class='flex h-20 w-20  border-2  border-[var(--onPrimary)] items-center justify-center relative bg-[var(--primaryColor)] rounded-full cursor-pointer'
        >
          <div class='text-[var(--onPrimary)]'>{handleRenderButtonContent()}</div>
        </div>
      </div>
    </Show>
  )
}

const StopIcon = () => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        'border-radius': '5px',
        'background-color': theme().backgroundAccent,
      }}
    ></div>
  )
}
