import powerIcon from '@/assets/power-icon.svg'
import { Button, MicrophoneIcon, NewChatIcon, Spinner, VolumeIcon } from '@/components'
import { configStoreActions } from '@/features/portal-init'
import { logErrorToServer } from '@/utils'
import { createEffect, createMemo, createSignal, Match, onCleanup, Show, Switch } from 'solid-js'
import { useTheme } from '../theme'
import { initiateConversation } from './services'
import { heyGenStore } from './store/heyGenStore'
import { oneClickActions, oneClickStore } from './store/oneClickStore'
import { BotStatus } from './types'

export const NavOneClick = () => {
  const { theme } = useTheme()

  const renderInteractionStatus = createMemo(() => {
    switch (oneClickStore.botStatus) {
      case BotStatus.IDLE:
        return <IdleStatus />

      case BotStatus.NOT_STARTED:
        return <StatusText text='Connecting..' />

      case BotStatus.LISTENING:
        return <ListeningStatus />

      case BotStatus.THINKING:
        return <ThinkingStatus />

      case BotStatus.ANSWERING:
        return <AnsweringStatus />

      default:
        return
    }
  }, [oneClickStore.botStatus])

  return (
    <Show when={!heyGenStore.isExpandAvatar}>
      <div class='flex items-center w-full pt-5 px-5'>
        <div
          class='flex flex-wrap items-enter rounded-full p-2.5 z-50 w-full'
          style={{
            background: theme().surfaceBackground,
          }}
        >
          <div class='flex relative items-center w-full justify-center'>
            {renderInteractionStatus()}

            <Button
              onClick={configStoreActions.toggleBot}
              padding='6px'
              class='!absolute -top-0.5 right-0 border border-[var(--onPrimary)] animate-fade-in'
              style={{ 'outline-color': 'transparent' }}
            >
              <img class='m-auto h-3' src={powerIcon} />
            </Button>
          </div>
        </div>
      </div>
    </Show>
  )
}

const StatusText = ({ text }: { text: string }) => {
  return (
    <div class='animate-fade-in-slow h-6 flex items-center'>
      <p class='font-semibold text-sm opacity-50'>{text}</p>
    </div>
  )
}

const IdleStatus = () => {
  const { theme } = useTheme()
  const [currentIndex, setCurrentIndex] = createSignal(0)
  const [loading, setLoading] = createSignal(false)

  createEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex == 0 ? 1 : 0))
    }, 5000)

    onCleanup(() => clearInterval(interval))
  })

  const initiateNewConversation = async () => {
    setLoading(true)

    try {
      const initiateData = await initiateConversation(oneClickStore.activeChannel!.id)

      oneClickActions.resetConversation(initiateData.conversationId)
    } catch (error) {
      logErrorToServer({
        error,
        context: {
          description: 'Error initiating a new conversation',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div class='absolute left-1 -top-0.5'>
        <Button
          style={{ background: 'transparent', 'outline-color': 'transparent' }}
          onClick={initiateNewConversation}
        >
          {loading() ? (
            <Spinner size={20} />
          ) : (
            <NewChatIcon
              class=' text-[var(--primaryColor)] w-6 h-auto -mt-0.5'
              stroke-width={1.8}
            />
          )}
        </Button>
      </div>

      <Switch>
        <Match when={currentIndex() === 0}>
          <img src={theme().navbarLogoUrl} class='h-6 cursor-pointer animate-fade-in-slow' />
        </Match>
        <Match when={currentIndex() === 1}>
          <StatusText text='Press or type to interact..' />
        </Match>
      </Switch>
    </>
  )
}

const ListeningStatus = () => {
  const [currentIndex, setCurrentIndex] = createSignal(0)

  createEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex == 0 ? 1 : 0))
    }, 5000)

    onCleanup(() => clearInterval(interval))
  })

  return (
    <>
      <div class='absolute left-1 animate-pulse'>
        <MicrophoneIcon class=' text-[var(--primaryColor)] w-5 h-auto ' />
      </div>

      <Switch>
        <Match when={currentIndex() === 0}>
          <StatusText text='Listening..' />
        </Match>
        <Match when={currentIndex() === 1}>
          <StatusText text='Press ⏹️ to end recording..' />
        </Match>
      </Switch>
    </>
  )
}

const ThinkingStatus = () => {
  const [currentIndex, setCurrentIndex] = createSignal(0)

  createEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex == 0 ? 1 : 0))
    }, 3000)

    onCleanup(() => clearInterval(interval))
  })

  return (
    <>
      <div class='absolute left-1 animate-pulse'>
        <Spinner size={20} />
      </div>

      <Switch>
        <Match when={currentIndex() === 0}>
          <StatusText text='Thinking..' />
        </Match>
        <Match when={currentIndex() === 1}>
          <StatusText text='Press to cancel..' />
        </Match>
      </Switch>
    </>
  )
}

const AnsweringStatus = () => {
  const [currentIndex, setCurrentIndex] = createSignal(0)

  createEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex == 0 ? 1 : 0))
    }, 5000)

    onCleanup(() => clearInterval(interval))
  })

  return (
    <>
      <div class='absolute left-1 animate-pulse'>
        <VolumeIcon class=' text-[var(--primaryColor)] w-5  h-auto ' />
      </div>
      <Switch>
        <Match when={currentIndex() === 0}>
          <StatusText text='Answering..' />
        </Match>
        <Match when={currentIndex() === 1}>
          <StatusText text='Press to interrupt..' />
        </Match>
      </Switch>
    </>
  )
}
