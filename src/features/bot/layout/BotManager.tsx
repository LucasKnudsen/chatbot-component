import { SignOutButton, authStore } from '@/features/authentication'
import { configStore } from '@/features/portal-init'
import { Channel, ChannelUserAccess } from '@/graphql'
import { logDev } from '@/utils'
import { createQuery } from '@tanstack/solid-query'
import { Match, Switch } from 'solid-js'
import { Bot, botStore, botStoreActions, fetchChannelAccesses, fetchPublicChannels } from '..'
import { FraiaLoading } from '../components/FraiaLoading'
import { ChannelsOverview } from './ChannelsOverview'

export const BotManager = () => {
  // const storageKey = `channels-${props.id}`
  const openForPublic = configStore.chatSpaceConfig.isPublic

  const channelsQuery = createQuery(() => ({
    queryKey: ['channels'],
    queryFn: async (): Promise<Channel[] | ChannelUserAccess[]> => {
      logDev('Fetching channels', openForPublic)
      if (openForPublic) {
        // In this case, we don't need to check for access rights, and can fetch all public channels through a Lambda
        const publicChannels = await fetchPublicChannels(configStore.chatSpaceConfig.id)

        if (publicChannels?.length === 0) {
          throw new Error('No public channels found')
        }

        if (!configStore.chatSpaceConfig.isMultiChannel) {
          // If there is only one channel, initialize the bot with it
          botStoreActions.initBotStore(publicChannels[0])
        }

        return publicChannels
      } else {
        // In this case, we fetch and show a list of access rights of the user
        if (!authStore.userDetails?.id) {
          throw new Error('No user details found')
        }

        // Get ChannelUserAccess records
        const channelAccesses = await fetchChannelAccesses(
          authStore.userDetails.id,
          configStore.chatSpaceConfig.id
        )

        if (channelAccesses?.length === 0) {
          throw new Error(
            'You currently do not have access to any knowledge channels. Contact your administrator.'
          )
        }

        return channelAccesses
      }
    },
  }))

  return (
    <Switch>
      <Match when={channelsQuery.isPending}>
        <FraiaLoading />
      </Match>

      <Match when={channelsQuery.isError}>
        <div class='w-full h-full flex flex-col justify-center items-center animate-fade-in gap-4'>
          <div class='text-lg  text-red-500 text-center'>
            <p class='mb-4'>Error: {channelsQuery.error?.message}</p>
          </div>

          <SignOutButton />
        </div>
      </Match>

      <Match when={Boolean(botStore.activeChannel)}>
        <Bot />
      </Match>

      {/* Overview over all the Channels  */}
      <Match when={Boolean(!botStore.activeChannel)}>
        <ChannelsOverview chatSpace={configStore.chatSpaceConfig} channels={channelsQuery.data} />
      </Match>
    </Switch>
  )
}
