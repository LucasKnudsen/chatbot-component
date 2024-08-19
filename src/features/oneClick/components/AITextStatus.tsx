import { SpeakerIcon, Spinner } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Match, Switch } from 'solid-js'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

export const AITextStatus = () => {
  const [contentParent] = createAutoAnimate()

  return (
    <div ref={contentParent}>
      <Switch>
        <Match when={oneClickStore.botStatus === BotStatus.NOT_STARTED}>
          <div class='mt-2'>
            <Spinner size={24} />
          </div>
        </Match>

        <Match when={oneClickStore.botStatus === BotStatus.LISTENING}>
          <div class='mt-2 bg-[var(--onPrimary)] rounded-full mr-2 '>
            <SpeakerIcon />
          </div>
        </Match>

        <Match when={oneClickStore.botStatus === BotStatus.THINKING}>
          <div class='mt-2'>
            <Spinner size={24} />
          </div>
        </Match>

        <Match when={oneClickStore.botStatus === BotStatus.ANSWERING}>
          <div class='mt-2'>
            <Spinner size={24} />
          </div>
        </Match>
      </Switch>
    </div>
  )
}
