import { Channel } from '@/graphql'
import { createStore } from 'solid-js/store'
import { BotStatus } from '../types'

export type OneClickStore = {
  botStatus: BotStatus
  activeChannel?: Channel | null
  chatMode: 'voice' | 'text'
}

const [oneClickStore, setOneClickStore] = createStore<OneClickStore>({
  botStatus: BotStatus.NOT_STARTED,
  activeChannel: null,
  chatMode: 'voice',
})

const initOneClickStore = (channel: Channel) => {
  setOneClickStore('activeChannel', {
    ...channel,
  })
}

const oneClickActions = {
  setStatus: (status: BotStatus) => {
    setOneClickStore('botStatus', status)
  },
  setOneClickStore,
  initOneClickStore,
}

export { oneClickActions, oneClickStore }
