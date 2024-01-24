import { SignOutButton, authStore } from '@/features/authentication'
import { Channel, ChatSpace } from '@/graphql'
import { Match, Suspense, Switch, createResource, createSignal } from 'solid-js'
import { Bot, botStore, botStoreActions, fetchChannelAccesses } from '..'
import { FraiaLoading } from '../components/FraiaLoading'
import { ChannelsOverview } from './ChannelsOverview'

// BotManager is the entry point for the bot. It handles the initial loading, fetching channels, checking configurations, etc.
export const BotManager = (props: ChatSpace) => {
  const storageKey = `channels-${props.id}`
  const openForPublic = props.isPublic
  const [channelError, setChannelError] = createSignal('')

  const handlePublicChannels = async () => {
    let _channels: Channel[] | undefined = []

    // Get public channels through Lambda

    if (_channels?.length === 0) {
      setChannelError('No channels found')

      return []
    }

    if (!props.isMultiChannel) {
      // If there is only one channel, initialize the bot with it
      botStoreActions.initBotStore(_channels[0])
    }

    return _channels
  }

  const handleChannelAccesses = async () => {
    if (!authStore.userDetails?.email) {
      setChannelError('User details not found')
      return []
    }

    // Get ChannelUserAccess records
    const channelAccess = await fetchChannelAccesses(authStore.userDetails.id, props)
    console.log('Channel Access', channelAccess)

    if (channelAccess?.length === 0) {
      setChannelError('You do not have access to any knowledge channels')

      return []
    }

    return channelAccess
  }

  const [channels] = createResource(async () => {
    setChannelError('')

    // TODO: Proper caching
    //   const localChannels = localStorage.getItem(storageKey)

    //   if (localChannels) {
    //     channels = JSON.parse(localChannels)
    //   }

    try {
      if (openForPublic) {
        // In this case, we don't need to check for access rights, and can fetch all public channels through a Lambda
        return await handlePublicChannels()
      } else {
        // In this case, we need to check the access rights of the user
        return await handleChannelAccesses()
      }

      //   localStorage.setItem(storageKey, JSON.stringify(channels))
    } catch (error) {
      console.error(error)
      setChannelError('Something went wrong')
    }
  })

  return (
    <Suspense fallback={<FraiaLoading />}>
      <Switch>
        <Match when={channelError()}>
          <div class='w-full h-full flex flex-col justify-center items-center animate-fade-in gap-4'>
            <div class='text-lg  text-red-500 text-center'>
              <p class='mb-4'>Error: {channelError()}</p>
            </div>

            <SignOutButton />
          </div>
        </Match>

        <Match when={Boolean(botStore.activeChannel)}>
          <Bot {...props} />
        </Match>

        {/* Overview over all the Channels  */}
        <Match when={props.isMultiChannel && Boolean(!botStore.activeChannel)}>
          <ChannelsOverview chatSpace={props} channels={channels()} />
        </Match>
      </Switch>
    </Suspense>
  )
}
