import logo from '@/assets/logo.png'
import { MessageType } from '@/features/bot'
import { useTheme } from '@/features/theme/hooks'
import { DeleteButton } from './SendButton'

type NavProps = {
  messages: MessageType[]
  onClear: () => void
}

export const Nav = (props: NavProps) => {
  const { theme } = useTheme()
  const { primaryColor } = theme()

  return (
    <div class='flex flex-wrap items-center px-5 py-5'>
      <img src={logo} class='h-8' />

      <div class='flex-1' />
      <DeleteButton
        sendButtonColor={primaryColor}
        type='button'
        isDisabled={props.messages.length === 1}
        on:click={props.onClear}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Clear</span>
      </DeleteButton>
    </div>
  )
}
