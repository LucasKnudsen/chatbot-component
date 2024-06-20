import { Accessor, Component } from 'solid-js'
import { useTheme } from '../theme'
import { SendIcon, EditIcon } from '@/components'

interface InputOneClickProps {
  isStart: Accessor<boolean>

}
export const InputOneClick: Component<InputOneClickProps> = ({ isStart }) => {
  const { theme } = useTheme()

  return (
    <div class={`py-3 border-t border-[${theme().borderColor}] w-full`}>
        <div class='flex items-center justify-between mx-5 border border-[var(--bubbleButtonColor)] px-3 py-0 rounded-lg bg-[var(--textInputBackgroundColor)]'>
          <EditIcon />
          <input
            class='w-4/5 h-4/5 tex-[15px]'
            placeholder='You can write here your query too'
          />
          <SendIcon color={'rgb(170, 170, 170)'} />
        </div>
    </div>
  )
}
