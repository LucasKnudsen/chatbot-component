import { Spinner } from '@/components'
import { Configuration, NewSessionData, StreamingAvatarApi } from '@heygen/streaming-avatar'
import axios from 'axios'
import { Accessor, createEffect, createSignal, onMount, Show } from 'solid-js'
import toast from 'solid-toast'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'
import { isMuted } from '../MuteAISwitch'

const HEYGEN_API_KEY = import.meta.env.VITE_HEYGEN_TOKEN

const HeyGenAvatar = (props: { botResponse?: Accessor<string> }) => {
  const [initialized, setInitialized] = createSignal<boolean>(false)
  const [data, setData] = createSignal<NewSessionData>()
  const [stream, setStream] = createSignal<MediaStream | undefined>(undefined)
  const [loading, setLoading] = createSignal(false)

  let mediaStream: HTMLVideoElement
  let avatar: StreamingAvatarApi

  // async function updateToken() {
  //   const newToken = await fetchAccessToken()
  //   console.log('Updating Access Token:', newToken) // Log token for debugging
  //   avatar = new StreamingAvatarApi(new Configuration({ accessToken: newToken }))

  //   const startTalkCallback = (e: any) => {
  //     console.log('Avatar started talking', e)
  //   }

  //   const stopTalkCallback = (e: any) => {
  //     console.log('Avatar stopped talking', e)
  //   }

  //   console.log('Adding event handlers:', avatar)
  //   avatar.addEventHandler('avatar_start_talking', startTalkCallback)
  //   avatar.addEventHandler('avatar_stop_talking', stopTalkCallback)

  //   setInitialized(true)
  // }

  async function start() {
    if (!avatar) return
    try {
      setLoading(true)
      const res = await avatar.createStartAvatar({
        newSessionRequest: {
          quality: 'low',
          avatarName: oneClickStore.activeChannel?.overrideConfig?.heygenAvatarId!,
          voice: { voiceId: oneClickStore.activeChannel?.overrideConfig?.heygenVoiceId! },
        },
      })
      setData(res)
      setLoading(false)
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

  async function fetchAccessToken() {
    try {
      const url = 'https://api.heygen.com/v1/streaming.create_token'
      const response = await axios(url, {
        method: 'POST',
        headers: {
          'x-api-key': HEYGEN_API_KEY,
        },
      })

      return response.data?.data?.token || ''
    } catch (error) {
      toast.error('Error fetching access token', {
        position: 'top-center',
        className: '!text-base',
      })
      console.error('Error fetching access token:', error)
      return ''
    }
  }

  // async function closeSession() {
  //   try {
  //     const url = `https://api.heygen.com/v1/streaming.stop`
  //     await axios(url, {
  //       method: 'POST',
  //       params: { sessionId: data()?.sessionId },
  //       headers: {
  //         'x-api-key': token,
  //       },
  //     })
  //   } catch (err) {
  //     console.error('Error closing session:', err)
  //   }
  // }

  async function endSession() {
    if (!initialized() || !avatar) {
      return
    }
    await avatar.stopAvatar({ stopSessionRequest: { sessionId: data()?.sessionId } })
    setStream(undefined)
  }

  onMount(() => {
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
      } finally {
        setLoading(false)
      }
    }
    init()

    return () => {
      endSession()
    }
  })

  createEffect(() => {
    if (initialized()) {
      setTimeout(() => {
        start()
      }, 2000)
    }
  })

  createEffect(() => {
    if (stream() && mediaStream) {
      mediaStream.srcObject = stream() as MediaStream
      mediaStream.onloadedmetadata = () => {
        mediaStream!.play()
      }
    }
  })

  async function handleSpeak(response: string) {
    if (!initialized() || !avatar || isMuted()) {
      return
    }

    mediaStream.muted = false
    await avatar
      .speak({
        taskRequest: {
          text: response,
          sessionId: data()?.sessionId,
        },
      })
      .catch(() => {
        toast.error('Error speaking. Please try again', {
          position: 'top-center',
          className: '!text-base',
        })
      })
      .finally(() => {
        oneClickActions.setStatus(BotStatus.IDLE)
      })
  }

  createEffect(() => {
    if (props.botResponse && props.botResponse().length > 0 && !isMuted()) {
      handleSpeak(props.botResponse())
    }
  })

  return (
    <div class='w-full h-full flex flex-col justify-center items-center gap-5'>
      <Show when={loading() || !initialized() || !stream()}>
        <Spinner size={60} />
      </Show>
      <Show when={!loading() && stream() && initialized()}>
        <video
          playsinline
          class='w-full h-full object-cover'
          muted
          autoplay
          ref={(el) => (mediaStream = el)}
        >
          <track kind='captions' />
        </video>
      </Show>
    </div>
  )
}

export default HeyGenAvatar
