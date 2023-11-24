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

  return (
    <div
      class='flex flex-wrap items-center mx-5 rounded-full px-6 py-2 mt-5'
      style={{
        background: theme().promptBackground,
      }}
    >
      <img src={logo} class='h-8' />

      {/* TODO: Make configurable  */}
      <h1 class='text-2xl ml-3 tracking-widest'>
        FR
        <span
          style={{
            color: theme().primaryColor,
          }}
        >
          AI
        </span>
        A
      </h1>

      <div class='flex-1' />
      <DeleteButton
        sendButtonColor={theme().primaryColor}
        type='button'
        isDisabled={!props.question}
        on:click={props.onClear}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Clear</span>
      </DeleteButton>
    </div>
  )
}
