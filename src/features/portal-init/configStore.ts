import { Channel, ChannelUserAccess } from '@/graphql'

import { ChatSpace } from '@/graphql'
import { createStore } from 'solid-js/store'
import { ChatStyleConfig } from './types'

type ChatConfigStore = {
  chatSpaceConfig: ChatSpace
  channels: Channel[] | ChannelUserAccess[]
  isBotOpened: boolean
  isDrawerOpened?: boolean
  clientData?: Record<string, any>
  styleConfig?: ChatStyleConfig
}

const [configStore, setConfigStore] = createStore<ChatConfigStore>({
  isDrawerOpened: false,
  isBotOpened: false,
  chatSpaceConfig: {} as any,
  channels: [],
  clientData: {},
  styleConfig: {},
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

const toggleDrawer = () => {
  setConfigStore('isDrawerOpened', !configStore.isDrawerOpened)
}

const configStoreActions = {
  toggleBot,
  toggleDrawer,
  setConfigStore,
}

export { configStore, configStoreActions, setConfigStore }
