import { MicrophoneIcon, Spinner } from '@/components'
import { Show } from 'solid-js'
import { useTheme } from '../../../theme'
import { oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'

export const MIC_VISUALIZER_ID = 'mic-audio-visualizer'
export const AI_VOICE_VISUALIZER_ID = 'ai-voice-visualizer'

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
        return <div class='w-7 h-7 rounded-md bg-[var(--onPrimary)]' />

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
      <div class='relative hover:brightness-105 transition-all hover:scale-105 z-20'>
        <div
          onClick={props.onStart}
          class='flex h-20 w-20 z-20  border-2  border-[var(--onPrimary)] items-center justify-center relative bg-[var(--primaryColor)] rounded-full cursor-pointer'
          style={{
            opacity: oneClickStore.isBotProcessing ? 0.5 : 1,
          }}
        >
          <div class='text-[var(--onPrimary)]  font-medium '>{handleRenderButtonContent()}</div>
        </div>

        <div id={MIC_VISUALIZER_ID} class='absolute z-10  h-20 w-20 top-0 rounded-full' />

        <div id={AI_VOICE_VISUALIZER_ID} class='absolute z-10  h-20 w-20 top-0 rounded-full' />
      </div>
    </Show>
  )
}
