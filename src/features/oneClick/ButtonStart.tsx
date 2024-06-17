import { Accessor, Component } from 'solid-js';
import buttonStartBg from '@/assets/buttonStartBg.png';
import { useTheme } from '../theme';

interface ButtonStartProps {
  onStart: () => void,
  isStart: Accessor<boolean>
}
export const ButtonStart: Component<ButtonStartProps> = ({ onStart, isStart }) => {
  return (
    <div onClick={onStart} class='flex w-52 h-52 items-center justify-center relative' 
      style={{ 
        'background-image': `url(${buttonStartBg})`, 
        'background-repeat': 'no-repeat',
        'background-size': "cover",
      }} 
      >
      <div class='text-white h-full w-full flex items-center justify-center rounded-full cursor-pointer'>
        {isStart() ? <StopIcon /> : 'START'  }
      </div>
    </div>
  )
}

const StopIcon = () => {
  const { theme } = useTheme()
  return (
    <div style={{
      width: '36px',
      height: '36px',
      'border-radius': '5px',
      'background-color': theme().backgroundAccent
    }}>
    </div>
  )
}