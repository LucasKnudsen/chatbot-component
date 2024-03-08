import {
  Bot,
  FraiaLoading,
  botStore,
  botStoreActions,
  fetchChannelAccesses,
  fetchPublicChannels,
} from '..'
import { Match, Switch } from 'solid-js'
import { SignOutButton, authStore } from '@/features/authentication'
import { configStore, configStoreActions } from '@/features/portal-init'

import { ChannelsOverview } from './ChannelsOverview'
import { createQuery } from '@/hooks'
import { logDev } from '@/utils'

export const BotManager = () => {
  const openForPublic = configStore.chatSpaceConfig.isPublic

  const channelsQuery = createQuery({
    queryFn: async () => {
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

        configStoreActions.setConfigStore('channels', publicChannels)

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

        configStoreActions.setConfigStore('channels', channelAccesses)

        return channelAccesses
      }
    },
  })

  return (
    <Switch>
      {/* Loading  */}
      <Match when={channelsQuery.isLoading()}>
        <FraiaLoading />
      </Match>

      {/* Simplistic error handling */}
      <Match when={channelsQuery.error()}>
        <div class='w-full h-full flex flex-col justify-center items-center animate-fade-in gap-4'>
          <div class='text-lg  text-red-500 text-center'>
            <p class='mb-4'>Error: {channelsQuery.error()?.message}</p>
          </div>

          <SignOutButton />
        </div>
      </Match>

      {/* Single Knowledge Base View */}
      <Match when={Boolean(botStore.activeChannel)}>
        <Bot />
      </Match>

      {/* Overview over all the Channels  */}
      <Match when={Boolean(!botStore.activeChannel)}>
        <ChannelsOverview
          chatSpace={configStore.chatSpaceConfig}
          channels={channelsQuery.data() || []}
        />
      </Match>
    </Switch>
  )
}
