import { Nav } from '@/components/Nav'
import { Channel, ChatSpace } from '@/graphql'
import { Match, Suspense, Switch, createResource, createSignal } from 'solid-js'
import { Bot, botStore, botStoreActions, fetchChannels } from '..'
import { FraiaLoading } from './FraiaLoading'

// BotManager is the entry point for the bot. It handles the initial loading, fetching channels, checking configurations, etc.
export const BotManager = (props: ChatSpace) => {
  const storageKey = 'fraiaChannels'
  const [channelError, setChannelError] = createSignal('')

  const [channels] = createResource(async () => {
    // TODO: Get all channels (Public lambda vs private graphql)

    try {
      let channels: Channel[] | undefined

      const localChannels = localStorage.getItem(storageKey)

      if (localChannels) {
        channels = JSON.parse(localChannels)
      }

      channels = await fetchChannels(props)

      if (!channels) {
        setChannelError('Channels not found')
        return
      }

      if (!props.isMultiChannel) {
        // If there is only one channel, initialize the bot with it
        botStoreActions.initBotStore(channels[0])
      }

      localStorage.setItem(storageKey, JSON.stringify(channels))

      setChannelError('')

      return channels
    } catch (error) {
      console.error(error)
      setChannelError('Something went wrong')
    }
  })

  return (
    <div
      class={
        'fixed top-0 left-0  flex flex-col h-full w-full  overflow-hidden animate-fade-in z-50'
      }
    >
      <Nav />

      <Suspense fallback={<FraiaLoading />}>
        <Switch>
          <Match when={channelError()}>
            <div class='text-lg  text-red-500 text-center'>
              <p class='mb-4'>Error: {channelError()}</p>
            </div>
          </Match>

          <Match when={Boolean(botStore.activeChannel)}>
            <Bot channels={channels()!} {...props} />
          </Match>

          <Match when={props.isMultiChannel && Boolean(!botStore.activeChannel)}>
            <div class='w-full h-full flex flex-col justify-center items-center  animate-fade-in gap-4'>
              <div class='text-lg  text-red-500 text-center'>
                <p class='mb-4'>Please select a channel</p>
              </div>
            </div>
          </Match>
        </Switch>
      </Suspense>
    </div>
  )
}
