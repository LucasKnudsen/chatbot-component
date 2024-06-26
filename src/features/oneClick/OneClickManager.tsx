import { configStore } from '../portal-init'
import { createQuery } from '@/hooks'
import { FraiaLoading, fetchPublicChannels } from '../bot'
import { oneClickActions } from './store/oneClickStore'
import { Match, Switch, createSignal, createEffect } from 'solid-js'
import LayoutDefault from '@/layouts/default'
import { SignOutButton } from '../authentication'
import { parseError } from '@/utils/errorHandlers'
import { BotOneClick } from './BotOneClick'

export const OneClickManager = () => {
  const [loading, setLoading] = createSignal<boolean>(true);

  const channelsQuery = createQuery({
    queryFn: async () => {
      const publicChannels = await fetchPublicChannels(configStore.chatSpaceConfig.id);
      oneClickActions.initOneClickStore(publicChannels[0]);
    }
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
