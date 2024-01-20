import { createStore } from 'solid-js/store'

type ChatConfigStore = {
  isBotOpened: boolean
}

const [configStore, setConfigStore] = createStore<ChatConfigStore>({
  isBotOpened: false,
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
}

export { configStore, configStoreActions, setConfigStore }
