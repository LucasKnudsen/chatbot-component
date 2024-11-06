import { Spinner } from '@/components'
import { configStore } from '@/features/portal-init'
import { Configuration, StreamingAvatarApi } from '@heygen/streaming-avatar'
import { createEffect, onCleanup, Show } from 'solid-js'
import toast from 'solid-toast'
import { heyGenActions, heyGenStore } from '../../../store/heyGenStore'
import { oneClickActions, oneClickStore } from '../../../store/oneClickStore'
import { BotStatus } from '../../../types'
import { fetchAccessToken } from './services'

const DEV_AVATAR_ID = import.meta.env.VITE_DEV_HEYGEN_AVATAR_ID
const DEV_VOICE_ID = import.meta.env.VITE_DEV_HEYGEN_VOICE_ID

const HeyGenAvatar = () => {
  createEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === 'Escape' && heyGenStore.isExpandAvatar) {
        heyGenActions.setIsExpandAvatar(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    onCleanup(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  })
  async function start() {
    if (!heyGenStore.avatar) return
    try {
      const heygenResponse = await heyGenStore.avatar.createStartAvatar({
        newSessionRequest: {
          quality: 'high',
          avatarName: import.meta.env.DEV ? DEV_AVATAR_ID : oneClickStore.activeAgent?.avatar!,
          voice: {
            voiceId: import.meta.env.DEV ? DEV_VOICE_ID : oneClickStore.activeAgent?.voice_id!,
          },
        },
      })

      if (!heygenResponse || !heygenResponse.sessionId) {
        throw new Error('No session ID returned')
      }

      const startTalkCallback = () => {
        oneClickActions.setStatus(BotStatus.ANSWERING)
      }

      const stopTalkCallback = () => {
        oneClickActions.setStatus(BotStatus.IDLE)
      }

      heyGenStore.avatar.addEventHandler('avatar_start_talking', startTalkCallback)
      heyGenStore.avatar.addEventHandler('avatar_stop_talking', stopTalkCallback)

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
    await heyGenStore.avatar.stopAvatar({
      stopSessionRequest: { sessionId: heyGenStore.sessionId },
    })
    heyGenActions.setStream(undefined)
    heyGenActions.setSessionId('')
    heyGenActions.setLoading(false)
    heyGenActions.setInitialized(false)
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

  const handleExpandHeyGen = (value: boolean) => {
    heyGenActions.setIsExpandAvatar(value)
  }

  return (
    <div class='w-full relative h-full flex flex-col justify-center items-center gap-5'>
      <Show when={heyGenStore.loading || !heyGenStore.initialized || !heyGenStore.stream}>
        <div class='absolute flex justify-center items-center'>
          <Spinner size={60} />
        </div>
      </Show>
      <button
        class='all-unset cursor-pointer flex items-center justify-center h-full w-full'
        onDblClick={() => {
          if (heyGenStore.isExpandAvatar) handleExpandHeyGen(false)
          else handleExpandHeyGen(true)
        }}
      >
        <video
          playsinline
          class='w-full h-full object-cover animate-fade-in cursor-pointer'
          muted
          autoplay
          ref={(el) => heyGenActions.setVideoRef(el)}
        >
          <track kind='captions' />
        </video>
      </button>
      {/* <Show when={heyGenStore.initialized && heyGenStore.avatar && heyGenStore.stream}>
        <div class='absolute bottom-2 right-2 cursor-pointer'>
          <Show when={!heyGenStore.isExpandAvatar}>
            <button class='all-unset' onClick={() => handleExpandHeyGen(true)} >
              <FullScreenIcon color={theme().primaryColor} />
            </button>
          </Show>
          <Show when={heyGenStore.isExpandAvatar}>
            <button class='all-unset' onClick={() => handleExpandHeyGen(false)}>
              <ExitFullScreenIcon color={theme().primaryColor} />
            </button>
          </Show>
        </div>
      </Show> */}
    </div>
  )
}

export default HeyGenAvatar
