import { Spinner } from '@/components'
import { configStore } from '@/features/portal-init'
import { Configuration, NewSessionData, StreamingAvatarApi } from '@heygen/streaming-avatar'
import { Accessor, createEffect, createSignal, on, onCleanup, Show } from 'solid-js'
import toast from 'solid-toast'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'
import { isMuted } from '../MuteAISwitch'
import { fetchAccessToken } from './services'

const DEV_AVATAR_ID = import.meta.env.VITE_DEV_HEYGEN_AVATAR_ID
const DEV_VOICE_ID = import.meta.env.VITE_DEV_HEYGEN_VOICE_ID

const HeyGenAvatar = (props: { botResponse: Accessor<string>; onResetMessage: () => void }) => {
  const [initialized, setInitialized] = createSignal<boolean>(false)
  const [sessionId, setSessionId] = createSignal<NewSessionData['sessionId']>()
  const [stream, setStream] = createSignal<MediaStream | undefined>(undefined)
  const [loading, setLoading] = createSignal(false)

  let videoRef: HTMLVideoElement
  let avatar: StreamingAvatarApi

  async function start() {
    if (!avatar) return
    try {
      const heygenResponse = await avatar.createStartAvatar({
        newSessionRequest: {
          quality: 'low',
          avatarName: import.meta.env.DEV
            ? DEV_AVATAR_ID
            : oneClickStore.activeChannel?.overrideConfig?.heygenAvatarId!,
          voice: {
            voiceId: import.meta.env.DEV
              ? DEV_VOICE_ID
              : oneClickStore.activeChannel?.overrideConfig?.heygenVoiceId!,
          },
        },
      })

      if (!heygenResponse || !heygenResponse.sessionId) {
        throw new Error('No session ID returned')
      }

      setSessionId(heygenResponse.sessionId)

      setStream(avatar.mediaStream)
    } catch (error) {
      toast.error('Error starting session. Please reload', {
        position: 'top-center',
        className: '!text-base',
      })
      console.error('Error starting session:', error)
    } finally {
      setLoading(false)
    }
  }

  async function endSession() {
    if (!initialized() || !avatar) {
      return
    }
    await avatar.stopAvatar({ stopSessionRequest: { sessionId: sessionId() } })
    setStream(undefined)
    setLoading(false)
    setInitialized(false)
    props.onResetMessage()
  }

  onCleanup(() => {
    endSession()
  })

  async function init() {
    try {
      setLoading(true)
      const newToken = await fetchAccessToken()
      avatar = new StreamingAvatarApi(
        new Configuration({ accessToken: newToken, jitterBuffer: 200 })
      )
      setInitialized(true)
    } catch (err) {
      toast.error('Error initializing avatar', {
        position: 'top-center',
        className: '!text-base',
      })
      console.error(err)
      setLoading(false)
    }
  }

  createEffect(() => {
    if (configStore.isBotOpened) {
      init()
    } else {
      endSession()
    }
  })

  createEffect(() => {
    if (initialized()) {
      setTimeout(() => {
        start()
      }, 100)
    }
  })

  createEffect(() => {
    if (stream() && videoRef) {
      videoRef.srcObject = stream() as MediaStream
      videoRef.onloadedmetadata = () => {
        videoRef!.play()
      }
    }
  })

  async function handleSpeak(response: string) {
    if (!initialized() || !avatar || isMuted() || response.length === 0) {
      return
    }

    videoRef.muted = false

    try {
      await avatar.speak({
        taskRequest: {
          text: response,
          sessionId: sessionId(),
        },
      })
    } catch (error) {
      toast.error('Error speaking. Please try again', {
        position: 'top-center',
        className: '!text-base',
      })
      console.error('Error speaking:', error)
    } finally {
      oneClickActions.setStatus(BotStatus.IDLE)
    }
  }

  createEffect(
    on(props.botResponse, () => {
      if (props.botResponse().length > 0) {
        handleSpeak(props.botResponse())
      }
    })
  )

  return (
    <div class='w-full relative h-full flex flex-col justify-center items-center gap-5'>
      <Show when={loading() || !initialized() || !stream()}>
        <div class='absolute flex justify-center items-center'>
          <Spinner size={60} />
        </div>
      </Show>

      <video
        playsinline
        class='w-full h-full object-cover animate-fade-in'
        muted
        autoplay
        ref={(el) => (videoRef = el)}
      >
        <track kind='captions' />
      </video>
    </div>
  )
}

export default HeyGenAvatar
