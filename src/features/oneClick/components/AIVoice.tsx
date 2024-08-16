import { logDev } from '@/utils'
import { createEffect, createSignal, on } from 'solid-js'
import { audio64, setAudio64 } from '../hooks'
import { oneClickActions } from '../store/oneClickStore'
import { BotStatus } from '../types'
import { isMuted } from './MuteAISwitch'

export let aiAudioRef: any
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

      if (aiAudioRef) {
        aiAudioRef.src = audioSrc
        aiAudioRef.play()
        aiAudioRef.muted = isMuted()
        aiAudioRef.onerror = (e: any) => {
          console.error('Error playing audio:', e)
          setAudio64([])
        }
        aiAudioRef.onended = async () => {
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

  return <audio ref={aiAudioRef} />
}
