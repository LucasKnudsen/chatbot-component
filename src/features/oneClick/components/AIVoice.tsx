import { logDev, logErrorToServer } from '@/utils'
import { createEffect, createSignal, on } from 'solid-js'
import { audio64, isCanceled, setAudio64 } from '../hooks'
import { oneClickActions, oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'
import { isMuted } from './MuteAISwitch'

export let aiAudioRef: HTMLAudioElement
export const [isPlayingQueue, setIsPlayingQueue] = createSignal(false)

export const AIVoice = () => {
  createEffect(
    on(audio64, () => {
      logDev('Audio Queue:', audio64().length)

      if (audio64().length === 0) {
        logDev('Queue is empty, cleared audio player')

        if (oneClickStore.isBotProcessing) {
          oneClickActions.setStatus(BotStatus.IDLE)
        }

        setIsPlayingQueue(false)
      }

      if (isPlayingQueue()) return

      if (audio64().length > 0) {
        playAudio(audio64()[0])
        setIsPlayingQueue(true)
      }
    })
  )

  const playAudio = (base64: string) => {
    logDev('Is Canceled:', isCanceled())

    if (isCanceled()) {
      setAudio64((prev) => prev.slice(1))
      return
    }

    try {
      const audioSrc = `data:audio/mp3;base64,${base64}`

      if (aiAudioRef) {
        aiAudioRef.src = audioSrc
        aiAudioRef.play()
        oneClickActions.setStatus(BotStatus.ANSWERING)

        aiAudioRef.muted = isMuted()
        aiAudioRef.onerror = (e: any) => {
          logDev('Error playing audio:', e)
          setAudio64([])
        }
        aiAudioRef.onended = async () => {
          // audioQueue.nested(0).set(none)
          setAudio64((prev) => prev.slice(1))

          if (audio64().length > 0) {
            playAudio(audio64()[0])
          } else {
            setIsPlayingQueue(false)
          }
        }
      }
    } catch (error) {
      logErrorToServer({
        error,
        context: {
          description: 'Error playing audio in AIVoice',
        },
      })
    }
  }

  return <audio ref={aiAudioRef} />
}
