import { Channel } from '@/graphql'
import { createQuery } from '@/hooks'
import LayoutDefault from '@/layouts/default'
import { parseError } from '@/utils/errorHandlers'
import { Match, Switch, createEffect, createSignal } from 'solid-js'
import { SignOutButton } from '../authentication'
import { FraiaLoading, fetchChannelDetails, fetchPublicChannels } from '../bot'
import { configStore } from '../portal-init'
import { BotOneClick } from './BotOneClick'
import { initiateConversation } from './services'
import { oneClickActions } from './store/oneClickStore'

export const OneClickManager = () => {
  const [loading, setLoading] = createSignal<boolean>(true)

  const channelsQuery = createQuery({
    queryFn: async () => {
      const { chatSpaceConfig } = configStore

      const [channel, conversationId] = await Promise.all([
        new Promise<Channel>(async (resolve) => {
          let channel = null
          if (chatSpaceConfig.defaultChannelId) {
            channel = await fetchChannelDetails(chatSpaceConfig.defaultChannelId)
          } else {
            const publicChannels = await fetchPublicChannels(chatSpaceConfig.id)
            channel = publicChannels[0]
          }

          resolve(channel)
        }),
        new Promise<string>(async (resolve) => {
          let conversationId = await initiateConversation()

          resolve(conversationId)
        }),
      ])

      oneClickActions.initOneClickStore(channel, conversationId)
    },
  })

  createEffect(() => {
    if (!channelsQuery.isLoading()) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  })

  return (
    <Switch>
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
      <Match when={channelsQuery.isSuccess()}>
        <BotOneClick />
      </Match>
    </Switch>
  )
}
