import logo from '@/assets/logo.png'
import { botStore } from '@/features/bot'
import { useTheme } from '@/features/theme/hooks'
import { Button } from '.'
import { DeleteButton } from './SendButton'

type NavProps = {
  onClear: () => void
  toggleBot: () => void
}

export const Nav = (props: NavProps) => {
  const { theme } = useTheme()

  return (
    <div
      class='flex flex-wrap items-center mx-5 rounded-full px-6 py-2 mt-5'
      style={{
        background: theme().surfaceBackground,
      }}
    >
      <img src={logo} class='h-6' />

      <div class='flex-1' />
      <DeleteButton
        sendButtonColor={theme().primaryColor}
        type='button'
        isDisabled={!botStore.chat}
        on:click={props.onClear}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Clear</span>
      </DeleteButton>

      <Button onClick={props.toggleBot}>Close</Button>
    </div>
  )
}
