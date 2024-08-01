import { NewSessionData, StreamingAvatarApi } from '@heygen/streaming-avatar'
import { createStore } from 'solid-js/store'
import { BotStatus } from '../types'
import { cleanContentForSpeech } from '../utils'
import { oneClickActions } from './oneClickStore'

export type HeyGenStore = {
  initialized: boolean
  sessionId: NewSessionData['sessionId']
  stream: MediaStream | undefined
  loading: boolean
  videoRef: HTMLVideoElement | null
  avatar: StreamingAvatarApi | null
  isExpandAvatar: boolean
}

const [heyGenStore, setHeyGenStore] = createStore<HeyGenStore>({
  initialized: false,
  sessionId: '',
  stream: undefined,
  loading: false,
  videoRef: null,
  avatar: null,
  isExpandAvatar: false,
})

const handleSpeak = async (response: string) => {
  if (!heyGenStore.initialized || !heyGenStore.avatar || response.length === 0) {
    return
  }

  if (heyGenStore.videoRef) heyGenStore.videoRef.muted = false

  const cleanedResponse = cleanContentForSpeech(response)

  try {
    return await heyGenStore.avatar.speak({
      taskRequest: {
        text: cleanedResponse,
        sessionId: heyGenStore.sessionId,
        taskType: 'repeat',
      },
    })
  } catch (error) {
    oneClickActions.setStatus(BotStatus.IDLE)
    console.error('Error speaking:', error)
  }
}

const heyGenActions = {
  setInitialized: (initialized: boolean) => {
    setHeyGenStore('initialized', initialized)
  },
  setSessionId: (sessionId: NewSessionData['sessionId']) => {
    setHeyGenStore('sessionId', sessionId)
  },
  setStream: (stream: MediaStream | undefined) => {
    setHeyGenStore('stream', stream)
  },
  setLoading: (loading: boolean) => {
    setHeyGenStore('loading', loading)
  },
  setVideoRef: (videoRef: HTMLVideoElement) => {
    setHeyGenStore('videoRef', videoRef)
  },
  setAvatar: (avatar: StreamingAvatarApi) => {
    setHeyGenStore('avatar', avatar)
  },
  setIsExpandAvatar: (isExpandAvatar: boolean) => {
    setHeyGenStore('isExpandAvatar', isExpandAvatar)
  },
  handleSpeak,
}

export { heyGenActions, heyGenStore }
