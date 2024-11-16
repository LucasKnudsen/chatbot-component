import { Button, Menu2Icon, NewChatIcon, Spinner } from '@/components'
import { ExitFullScreenIcon } from '@/components/icons/ExitFullScreen'
import { FullScreenIcon } from '@/components/icons/FullScreenIcon'
import { configStore, configStoreActions } from '@/features/portal-init'
import { logErrorToServer } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { createSignal, Show } from 'solid-js'
import usePopper from 'solid-popper'
import { initiateConversation } from '../services'
import { oneClickActions, oneClickStore } from '../store/oneClickStore'

const MenuItem = ({ Icon, text, onClick }: { text: string; Icon: any; onClick?: () => void }) => {
  const handleOnClick = () => {
    onClick?.()
  }

  return (
    <button
      class='flex items-center justify-start gap-3 px-4 py-2  bg-[var(--surfaceBackground)] hover:bg-[var(--surfaceHoveredBackground)]'
      onClick={handleOnClick}
    >
      <Icon class='text-[var(--primaryColor)] w-6 h-6 -mt-0.5' stroke-width={1.5} />

      <p class='font-semibold text-sm text-[var(--textColor)] opacity-80'>{text}</p>
    </button>
  )
}

export const NavMenu = () => {
  const [isPopoverOpen, setIsPopoverOpen] = createSignal(false)
  const [loading, setLoading] = createSignal(false)
  const device = useMediaQuery()
  const [anchor, setAnchor] = createSignal(null)
  const [popper, setPopper] = createSignal(null)

  usePopper(anchor, popper, {
    placement: 'auto',
  })

  const handleFullScreen = () => {
    configStoreActions.setConfigStore('isInFullScreenMode', !configStore.isInFullScreenMode)
    setIsPopoverOpen(false)
  }

  const initiateNewConversation = async () => {
    if (loading()) return

    setLoading(true)

    try {
      const initiateData = await initiateConversation(oneClickStore.activeChannel!)

      oneClickActions.resetConversation(initiateData.conversationId)
    } catch (error) {
      logErrorToServer({
        error,
        context: {
          description: 'Error initiating a new conversation',
        },
      })
    } finally {
      setIsPopoverOpen(false)

      setLoading(false)
    }
  }

  return (
    <>
      <Button
        ref={setAnchor}
        onClick={() => setIsPopoverOpen(!isPopoverOpen())}
        style={{
          outline: 'none',
          background: 'transparent',
        }}
      >
        <Menu2Icon class='text-[var(--primaryColor)] w-6 h-auto' />
      </Button>

      <Show when={isPopoverOpen()}>
        <div
          ref={setPopper}
          class='flex flex-col op rounded-lg overflow-hidden shadow-lg mt-3 bg-[var(--backgroundColor)]'
        >
          <MenuItem text='New Conversation' Icon={<Spinner size={24} />} />

          <MenuItem text='New Conversation' Icon={NewChatIcon} onClick={initiateNewConversation} />

          <MenuItem
            text='New Conversation'
            Icon={loading() ? <Spinner size={24} /> : <NewChatIcon />}
            onClick={initiateNewConversation}
          />

          <Show when={device() === 'desktop'}>
            <MenuItem
              text={configStore.isInFullScreenMode ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              Icon={configStore.isInFullScreenMode ? ExitFullScreenIcon : FullScreenIcon}
              onClick={handleFullScreen}
            />
          </Show>
        </div>
      </Show>
    </>
  )
}
