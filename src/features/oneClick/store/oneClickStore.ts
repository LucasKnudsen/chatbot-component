import { Channel, VoiceMode } from '@/graphql'
import { createStore } from 'solid-js/store'
import { RoutingStreamObject } from '../hooks/useLLM/utils'
import { InitiateConversationResponse } from '../services'
import { BotStatus } from '../types'

type AgentAvatarConfig = RoutingStreamObject

type IndicationMessage = {
  message: string
  metadata: Record<string, any>
}

export type OneClickStore = {
  botStatus: BotStatus
  activeChannel?: Channel | null
  activeConversationId?: string
  initialAgent?: AgentAvatarConfig | null
  activeAgent?: AgentAvatarConfig | null
  chatMode: 'voice' | 'text'
  indicationMessage: IndicationMessage | null
  readonly getChatInitiationMessage: string | null
  readonly isHeyGenMode: boolean
  readonly botDisplayName: string
}

const [oneClickStore, setOneClickStore] = createStore<OneClickStore>({
  botStatus: BotStatus.NOT_STARTED,
  activeChannel: null,
  activeAgent: null,
  initialAgent: null,
  chatMode: 'voice',
  activeConversationId: '',
  indicationMessage: null,

  get getChatInitiationMessage() {
    if (!this.activeChannel?.welcomeText) {
      return null
    }

    const datetime = localStorage.getItem('lastStarted')

    if (!datetime) {
      return this.activeChannel.welcomeText
    }

    const lastStarted = new Date(datetime)
    const now = new Date()

    const diff = now.getTime() - lastStarted.getTime()

    if (diff < 1000 * 60 * 60 * 24) {
      return this.activeChannel.welcomeBackText || this.activeChannel.welcomeText
    } else {
      return this.activeChannel.welcomeText
    }
  },
  get isHeyGenMode() {
    return this.activeAgent?.voice_mode === VoiceMode.HEYGEN
  },

  get botDisplayName() {
    return (
      this.activeAgent?.display_name ||
      this.initialAgent?.display_name ||
      this.activeChannel?.botDisplayName ||
      'Assistant'
    )
  },
})

const initOneClickStore = (channel: Channel, initiationData?: InitiateConversationResponse) => {
  let activeAgent: AgentAvatarConfig = {}

  if (initiationData?.avatarConfig) {
    activeAgent = initiationData.avatarConfig
  }
  // Backward compatibility
  else {
    activeAgent.voice_mode = channel.overrideConfig?.voiceMode

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
    initialAgent: { ...activeAgent },
  })
}

const resetConversation = (conversationId: string) => {
  const initialAgent = { ...oneClickStore.initialAgent }

  setOneClickStore('activeConversationId', conversationId)
  setOneClickStore('activeAgent', initialAgent)
}

const oneClickActions = {
  setStatus: (status: BotStatus) => {
    setOneClickStore('botStatus', status)
  },
  setOneClickStore,
  initOneClickStore,
  resetConversation,
}

export { oneClickActions, oneClickStore }
