import { NewSessionData, StreamingAvatarApi } from '@heygen/streaming-avatar'
import { createStore } from 'solid-js/store'

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
}

export { heyGenActions, heyGenStore }
