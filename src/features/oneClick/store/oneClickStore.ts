import { Channel, VoiceMode } from '@/graphql'
import { createStore } from 'solid-js/store'
import { BotStatus } from '../types'

export type OneClickStore = {
  botStatus: BotStatus
  activeChannel?: Channel | null
  activeConversationId?: string
  chatMode: 'voice' | 'text'
  isHeyGenMode: boolean
  isProcessingToolCall: boolean
  readonly shouldWelcome: boolean
}

const [oneClickStore, setOneClickStore] = createStore<OneClickStore>({
  botStatus: BotStatus.NOT_STARTED,
  activeChannel: null,
  chatMode: 'voice',
  isHeyGenMode: true,
  activeConversationId: '',
  isProcessingToolCall: false,

  get shouldWelcome() {
    const datetime = localStorage.getItem('lastStarted')

    if (!datetime) {
      return true
    }

    const lastStarted = new Date(datetime)
    const now = new Date()

    const diff = now.getTime() - lastStarted.getTime()

    return diff > 1000 * 60 * 60 * 24
  },
})

const initOneClickStore = (channel: Channel, conversationId: string) => {
  const isHeyGenMode = channel.overrideConfig?.voiceMode === VoiceMode.HEYGEN

  setOneClickStore({
    activeChannel: channel,
    activeConversationId: conversationId,
    isHeyGenMode,
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
