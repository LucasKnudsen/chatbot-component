import { MicrophoneIcon, Spinner } from '@/components'
import { Show } from 'solid-js'
import { useTheme } from '../../theme'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

interface Props {
  onStart: () => void
}
export const InteractionButton = (props: Props) => {
  const { theme } = useTheme()

  const handleRenderButtonContent = () => {
    switch (oneClickStore.botStatus) {
      case BotStatus.INITIATING:
        return <Spinner size={28} indicatorColor={theme().onPrimary} />

      case BotStatus.LISTENING:
        return <StopIcon />

      case BotStatus.THINKING:
        return <Spinner size={28} indicatorColor={theme().onPrimary} />

      // case BotStatus.ANSWERING:
      //   return 'STOP'
      default:
        return <MicrophoneIcon height={36} />
    }
  }

  return (
    <Show when={oneClickStore.botStatus !== BotStatus.NOT_STARTED}>
      <div class='absolute z-20 left-1/2 transform -translate-x-1/2 bottom-0 hover:brightness-105 transition-all hover:scale-105'>
        <div
          onClick={props.onStart}
          class='flex h-20 w-20  border-2  border-[var(--onPrimary)] items-center justify-center relative bg-[var(--primaryColor)] rounded-full cursor-pointer'
        >
          <div class='text-[var(--onPrimary)]  font-medium '>{handleRenderButtonContent()}</div>
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
        width: '28px',
        height: '28px',
        'border-radius': '5px',
        'background-color': theme().backgroundAccent,
      }}
    ></div>
  )
}
