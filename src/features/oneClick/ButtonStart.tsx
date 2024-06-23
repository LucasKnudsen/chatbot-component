import { Accessor, Component } from 'solid-js';
import buttonStartBg from '@/assets/buttonStartBg.png';
import { useTheme } from '../theme';
import { BOT_STATUS } from './BotOneClick';

interface Props {
  onStart: () => void,
  isStart: Accessor<boolean>
  status: Accessor<string>
}
export const ButtonStart = (props: Props ) => {
  const handleRenderButtonContent = () => {
    if (!props.isStart()) {
      return 'START';
    }
    if (props.status() === BOT_STATUS.THINKING || props.status() === BOT_STATUS.ANSWERING) {
      return 'STOP'
    }
    return <StopIcon />
  }
  return (
    <div onClick={props.onStart} class='flex w-52 h-52 items-center justify-center relative' 
      style={{ 
        'background-image': `url(${buttonStartBg})`, 
        'background-repeat': 'no-repeat',
        'background-size': "cover",
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
    <div style={{
      width: '34px',
      height: '34px',
      'border-radius': '5px',
      'background-color': theme().backgroundAccent
    }}>
    </div>
  )
}