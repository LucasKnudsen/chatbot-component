import { Channel, ChannelUserAccess } from '@/graphql'

import { ChatSpace } from '@/graphql'
import { createStore } from 'solid-js/store'

type ChatConfigStore = {
  isBotOpened: boolean
  chatSpaceConfig: ChatSpace
  channels: Channel[] | ChannelUserAccess[]
}

const [configStore, setConfigStore] = createStore<ChatConfigStore>({
  isBotOpened: false,
  chatSpaceConfig: {} as any,
  channels: [],
})

const openBot = () => {
  setConfigStore({ isBotOpened: true })

  document.body.style.overflow = 'hidden'
}

const closeBot = () => {
  setConfigStore({ isBotOpened: false })

  document.body.style.overflow = 'auto'
}

const toggleBot = () => {
  configStore.isBotOpened ? closeBot() : openBot()
}

const configStoreActions = {
  toggleBot,
  setConfigStore,
}

export { configStore, configStoreActions, setConfigStore }
