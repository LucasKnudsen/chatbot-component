import { logDev } from '@/utils'
import { createEffect, createSignal, on } from 'solid-js'
import { audio64, setAudio64 } from '../hooks'
import { oneClickActions } from '../store/oneClickStore'
import { BotStatus } from '../types'
import { isMuted } from './MuteAISwitch'

export let audioRef: any
export const [isPlayingQueue, setIsPlayingQueue] = createSignal(false)
export const AIVoice = () => {
  createEffect(
    on(audio64, () => {
      if (audio64().length === 0) {
        logDev('Queue is empty, cleared audio player')
        oneClickActions.setStatus(BotStatus.IDLE)
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
    try {
      const audioSrc = `data:audio/mp3;base64,${base64}`

      if (audioRef) {
        audioRef.src = audioSrc
        audioRef.play()
        audioRef.muted = isMuted()
        audioRef.onerror = (e: any) => {
          console.error('Error playing audio:', e)
          setAudio64([])
        }
        audioRef.onended = async () => {
          // audioQueue.nested(0).set(none)
          setAudio64((prev) => prev.slice(1))

          if (audio64().length > 0) {
            requestAnimationFrame(() => playAudio(audio64()[0]))
          } else {
            setIsPlayingQueue(false)
          }
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  return <audio ref={audioRef} />
}
