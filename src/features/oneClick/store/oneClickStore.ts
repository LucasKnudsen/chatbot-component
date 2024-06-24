import { createStore } from 'solid-js/store'
import { BotStatus } from '../types'
import { Channel } from '@/graphql'

export type OneClickStore = {
  botStatus: BotStatus
  activeChannel?: Channel | null
}

const [oneClickStore, setOneClickStore] = createStore<OneClickStore>({
  botStatus: BotStatus.NOT_STARTED,
  activeChannel: null
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
