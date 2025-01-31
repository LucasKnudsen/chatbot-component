import { SignOutButton, authStore } from '@/features/authentication'
import { configStore, configStoreActions } from '@/features/portal-init'
import { Match, Switch, createEffect, createSignal } from 'solid-js'
import {
  Bot,
  FraiaLoading,
  botStore,
  botStoreActions,
  fetchChannelAccesses,
  fetchPublicChannels,
} from '..'

import { createQuery } from '@/hooks'
import LayoutDefault from '@/layouts/default'
import { logDev } from '@/utils'
import { parseError } from '@/utils/errors/errorHandlers'
import { ChannelsOverview } from './ChannelsOverview'

export const BotManager = () => {
  const openForPublic = configStore.chatSpaceConfig.isPublic
  const [loading, setLoading] = createSignal<boolean>(true)

  const channelsQuery = createQuery({
    queryFn: async () => {
      if (openForPublic) {
        logDev('Is public')
        // In this case, we don't need to check for access rights, and can fetch all public channels through a Lambda
        const publicChannels = await fetchPublicChannels(configStore.chatSpaceConfig.id)

        if (publicChannels?.length === 0) {
          throw new Error('No public channels found')
        }

        if (!configStore.chatSpaceConfig.isMultiChannel) {
          // If there is only one channel, initialize the bot with it
          await botStoreActions.initBotStore(publicChannels[0])
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

  createEffect(() => {
    if (!channelsQuery.isLoading()) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [channelsQuery.isLoading()])

  return (
    <Switch>
      {/* TEST UI  */}
      {/* <Match when={true}>
      </Match> */}

      {/* Loading  */}
      <Match when={loading()}>
        <FraiaLoading isLoading={channelsQuery.isLoading()} />
      </Match>

      {/* Simplistic error handling */}
      <Match when={channelsQuery.error()}>
        <LayoutDefault>
          <div class='h-full flex flex-col justify-center  animate-fade-in gap-4'>
            <div class='text-lg text-red-500 text-center'>
              <p class='mb-4'>Error: {parseError(channelsQuery.error())?.message}</p>
            </div>

            <SignOutButton />
          </div>
        </LayoutDefault>
      </Match>

      {/* Single Knowledge Base View */}
      <Match when={Boolean(botStore.activeChannel)}>
        <Bot />
      </Match>

      {/* Overview over all the Channels  */}
      <Match when={Boolean(!botStore.activeChannel)}>
        <ChannelsOverview channels={channelsQuery.data() || []} />
      </Match>
    </Switch>
  )
}
