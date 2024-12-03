import { Channel, ChannelUserAccess } from '@/graphql'

import { ClientDataKeys } from '@/constants/ClientData'
import { ChatSpace } from '@/graphql'
import { createStore } from 'solid-js/store'
import { ChatStyleConfig } from './types'

type ChatConfigStore = {
  chatSpaceConfig: ChatSpace
  channels: Channel[] | ChannelUserAccess[]
  isBotOpened: boolean
  isDrawerOpened?: boolean
  clientData?: Record<ClientDataKeys & string, any> & Record<string, any>
  styleConfig?: ChatStyleConfig
  isInFullScreenMode?: boolean
  allowFullScreen?: boolean
}

const [configStore, setConfigStore] = createStore<ChatConfigStore>({
  isDrawerOpened: false,
  isBotOpened: false,
  chatSpaceConfig: {} as any,
  channels: [],
  clientData: {
    fraia_user_id: '',
    fraia_user_email: '',
  },
  styleConfig: {},
  isInFullScreenMode: false,
  allowFullScreen: false,
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
