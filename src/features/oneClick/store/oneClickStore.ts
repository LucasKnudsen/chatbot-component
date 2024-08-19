import { Channel, VoiceMode } from '@/graphql'
import { createStore } from 'solid-js/store'
import { RoutingStreamObject, ToolCallStreamObject } from '../hooks/useLLM/utils'
import { InitiateConversationResponse } from '../services'
import { BotStatus } from '../types'

type ActiveAgent = RoutingStreamObject

export type OneClickStore = {
  botStatus: BotStatus
  activeChannel?: Channel | null
  activeConversationId?: string
  activeAgent?: ActiveAgent | null
  chatMode: 'voice' | 'text'
  processingToolCall: ToolCallStreamObject | null
  readonly shouldWelcome: boolean
  readonly isHeyGenMode: boolean
}

const [oneClickStore, setOneClickStore] = createStore<OneClickStore>({
  botStatus: BotStatus.NOT_STARTED,
  activeChannel: null,
  activeAgent: null,
  chatMode: 'voice',
  activeConversationId: '',
  processingToolCall: null,

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
  get isHeyGenMode() {
    return this.activeAgent?.voice_mode === VoiceMode.HEYGEN
  },
})

const initOneClickStore = (channel: Channel, initiationData?: InitiateConversationResponse) => {
  let activeAgent: ActiveAgent = {}

  if (initiationData?.avatarConfig) {
    activeAgent = initiationData.avatarConfig
  }
  // Backward compatibility
  else {
    switch (channel.overrideConfig?.voiceMode) {
      case 'HEYGEN':
        activeAgent.voice_id = channel.overrideConfig?.heygenVoiceId
        activeAgent.avatar = channel.overrideConfig?.heygenAvatarId
        break
      case 'ELEVEN_LABS':
        activeAgent.avatar = channel.avatar
        activeAgent.voice_id = channel.overrideConfig?.elevenLabsVoiceId
        break
      case 'WHISPER':
        activeAgent.avatar = channel.avatar
        activeAgent.voice_id = channel.overrideConfig?.whisperVoiceId

        break
      default:
        break
    }
  }

  setOneClickStore({
    activeChannel: channel,
    activeConversationId: initiationData?.conversationId,
    activeAgent,
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
