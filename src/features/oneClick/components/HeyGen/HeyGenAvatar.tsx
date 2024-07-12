import { Spinner } from '@/components'
import { configStore } from '@/features/portal-init'
import { Configuration, StreamingAvatarApi } from '@heygen/streaming-avatar'
import { createEffect, onCleanup, Show } from 'solid-js'
import toast from 'solid-toast'
import {  oneClickStore } from '../../store/oneClickStore'
import { fetchAccessToken } from './services'
import { heyGenStore, heyGenActions } from '../../store/heyGenStore'

const DEV_AVATAR_ID = import.meta.env.VITE_DEV_HEYGEN_AVATAR_ID
const DEV_VOICE_ID = import.meta.env.VITE_DEV_HEYGEN_VOICE_ID

const HeyGenAvatar = (props: { onResetMessage: () => void }) => {
  async function start() {
    if (!heyGenStore.avatar) return
    try {
      const heygenResponse = await heyGenStore.avatar.createStartAvatar({
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

      heyGenActions.setSessionId(heygenResponse.sessionId)
      heyGenActions.setStream(heyGenStore.avatar.mediaStream)
    } catch (error) {
      toast.error('Error starting session. Please reload', {
        position: 'top-center',
        className: '!text-base',
      })
      console.error('Error starting session:', error)
    } finally {
      heyGenActions.setLoading(false)
    }
  }

  async function endSession() {
    if (!heyGenStore.initialized || !heyGenStore.avatar) {
      return
    }
    await heyGenStore.avatar.stopAvatar({ stopSessionRequest: { sessionId: heyGenStore.sessionId } })
    heyGenActions.setStream(undefined)
    heyGenActions.setLoading(false)
    heyGenActions.setInitialized(false)
    props.onResetMessage()
  }

  onCleanup(() => {
    endSession()
  })

  async function init() {
    try {
      heyGenActions.setLoading(true)
      const newToken = await fetchAccessToken()
      const updateAvatar = new StreamingAvatarApi(
        new Configuration({ accessToken: newToken, jitterBuffer: 200 })
      )
      heyGenActions.setAvatar(updateAvatar)
      heyGenActions.setInitialized(true)
    } catch (err) {
      toast.error('Error initializing avatar', {
        position: 'top-center',
        className: '!text-base',
      })
      console.error(err)
      heyGenActions.setLoading(false)
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
    if (heyGenStore.initialized) {
      setTimeout(() => {
        start()
      }, 100)
    }
  })

  createEffect(() => {
    if (heyGenStore.stream && heyGenStore.videoRef) {
      heyGenStore.videoRef.srcObject = heyGenStore.stream as MediaStream
      heyGenStore.videoRef.onloadedmetadata = () => {
        heyGenStore.videoRef!.play()
      }
    }
  })

  return (
    <div class='w-full relative h-full flex flex-col justify-center items-center gap-5'>
      <Show when={heyGenStore.loading || !heyGenStore.initialized || !heyGenStore.stream}>
        <div class='absolute flex justify-center items-center'>
          <Spinner size={60} />
        </div>
      </Show>

      <video
        playsinline
        class='w-full h-full object-cover animate-fade-in'
        muted
        autoplay
        ref={(el) => (heyGenActions.setVideoRef(el))}
      >
        <track kind='captions' />
      </video>
    </div>
  )
}

export default HeyGenAvatar
