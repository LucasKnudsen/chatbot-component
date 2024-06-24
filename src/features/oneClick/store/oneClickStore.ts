import { createStore } from 'solid-js/store'
import { BotStatus } from '../types'

export type OneClickStore = {
  botStatus: BotStatus
}

const [oneClickStore, setOneClickStore] = createStore<OneClickStore>({
  botStatus: BotStatus.NOT_STARTED,
})

const oneClickActions = {
  setStatus: (status: BotStatus) => {
    setOneClickStore('botStatus', status)
  },
  setOneClickStore,
}

export { oneClickActions, oneClickStore }
