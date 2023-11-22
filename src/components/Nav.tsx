import logo from '@/assets/logo.png'
import { Chat } from '@/features/messages/types'
import { useTheme } from '@/features/theme/hooks'
import { DeleteButton } from './SendButton'

type NavProps = {
  question: Chat | null
  onClear: () => void
}

export const Nav = (props: NavProps) => {
  const { theme } = useTheme()
  const { primaryColor } = theme()

  return (
    <div class='flex flex-wrap items-center px-5 py-5'>
      <img src={logo} class='h-8' />

      {/* TODO: Make configurable  */}
      <h1 class='text-4xl ml-3' style={{ 'letter-spacing': '0.2rem' }}>
        FR
        <span
          style={{
            color: primaryColor,
          }}
        >
          AI
        </span>
        A
      </h1>

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
