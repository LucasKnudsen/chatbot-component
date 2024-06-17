import { Accessor, Component } from 'solid-js'
import { useTheme } from '../theme'
import { SendIcon, EditIcon } from '@/components'

interface InputOneClickProps {
  isStart: Accessor<boolean>
}
export const InputOneClick: Component<InputOneClickProps> = ({ isStart }) => {
  const { theme } = useTheme()

  return (
    <div class={isStart() ? `py-5 border-t border-[${theme().borderColor}]` : ''}>
      {isStart() ? (
        <div class='flex items-center justify-between mx-5 border border-[var(--bubbleButtonColor)] px-3 py-0 rounded-lg bg-[var(--textInputBackgroundColor)]'>
          <EditIcon />
          <input
            class='w-4/5 h-4/5 tex-[15px]'
            placeholder='You can write here your query too'
          />
          <SendIcon color={'rgb(170, 170, 170)'} />
        </div>
      ) : (
        <div class='text-center mb-2 flex gap-2 justify-center text-[var(--primaryColor)]'>
          <span>Please tap the</span>
          <span class='font-bold'>START</span>
          <span>button to start the AI</span>
        </div>
      )}
    </div>
  )
}
