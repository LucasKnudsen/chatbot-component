import { useTheme } from '@/features/theme'
import { logDev, logErrorToServer } from '@/utils'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { createEffect, createSignal, on } from 'solid-js'
import { audio64, isCanceled, setAudio64 } from '../hooks'
import { oneClickActions, oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'
import { AI_VOICE_VISUALIZER_ID } from './InteractionButton'
import { isMuted } from './MuteAISwitch'

export const AI_VOICE_AUDIO_ID = 'ai-voice-audio'

export let aiAudioRef: HTMLAudioElement

export const [isPlayingQueue, setIsPlayingQueue] = createSignal(false)

export const AIVoice = () => {
  const { theme } = useTheme()

  let audioMotion: AudioMotionAnalyzer | null = null

  const setupAudioMotion = () => {
    if (!audioMotion && aiAudioRef) {
      // Instantiate AudioMotionAnalyzer when aiAudioRef is available
      audioMotion = new AudioMotionAnalyzer(undefined, {
        source: aiAudioRef,
        mode: 10,
        radial: true,
        useCanvas: false,
        onCanvasDraw: (instance) => {
          const container = document.getElementById(AI_VOICE_VISUALIZER_ID)

          if (!container) return

          // Get frequency bars data
          const bars = instance.getBars()
          const totalFrequency = bars.reduce((sum, bar) => sum + bar.value[0], 0)
          const avgFrequency = totalFrequency / bars.length

          // Set the dynamic size of the circle based on the average frequency
          const dynamicSize = 80 + avgFrequency * 700 // Adjust factor to exaggerate effect

          container.style.width = `${dynamicSize}px`
          container.style.height = `${dynamicSize}px`

          // Apply the theme color as background
          container.style.backgroundColor = theme().surfaceHoveredBackground!

          // Adjust position to keep the circle centered
          container.style.top = `calc(50% - ${dynamicSize / 2}px)`
          container.style.left = `calc(50% - ${dynamicSize / 2}px)`
        },
      })
    }
  }

  createEffect(on(() => aiAudioRef, setupAudioMotion))

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

  return <audio id={AI_VOICE_AUDIO_ID} ref={aiAudioRef} />
}
