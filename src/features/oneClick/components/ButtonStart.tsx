import buttonStartBg from '@/assets/buttonStartBg.png'
import { Accessor } from 'solid-js'
import { useTheme } from '../../theme'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

interface Props {
  onStart: () => void
  isStart: Accessor<boolean>
}
export const ButtonStart = (props: Props) => {
  const handleRenderButtonContent = () => {
    if (!props.isStart()) {
      return 'START'
    }
    if (
      oneClickStore.botStatus === BotStatus.THINKING ||
      oneClickStore.botStatus === BotStatus.ANSWERING
    ) {
      return 'STOP'
    }
    return <StopIcon />
  }
  return (
    <div
      onClick={props.onStart}
      class='flex w-52 h-52 items-center justify-center relative'
      style={{
        'background-image': `url(${buttonStartBg})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
      }}
    >
      <div class='text-white h-full w-full flex items-center justify-center rounded-full cursor-pointer'>
        {handleRenderButtonContent()}
      </div>
    </div>
  )
}

const StopIcon = () => {
  const { theme } = useTheme()
  return (
    <div
      style={{
        width: '34px',
        height: '34px',
        'border-radius': '5px',
        'background-color': theme().backgroundAccent,
      }}
    ></div>
  )
}
