import logo from '@/assets/logo.png'
import { Question } from '@/features/messages/question'
import { useTheme } from '@/features/theme/hooks'
import { DeleteButton } from './SendButton'

type NavProps = {
  question: Question | null
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
        isDisabled={!props.question}
        on:click={props.onClear}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Clear</span>
      </DeleteButton>
    </div>
  )
}
