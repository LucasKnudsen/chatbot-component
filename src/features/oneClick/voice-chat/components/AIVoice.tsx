import { useTheme } from '@/features/theme'
import { logDev, logErrorToServer, shadowQuerySelector } from '@/utils'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { createEffect, createSignal, on } from 'solid-js'
import { audio64, isCanceled, setAudio64 } from '../../hooks'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'
import { AI_VOICE_VISUALIZER_ID } from './InteractionButton'

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
          const container = shadowQuerySelector(`#${AI_VOICE_VISUALIZER_ID}`)

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

  createEffect(() => {
    if (aiAudioRef) {
      // Play some initial audio to trigger the browser to allow audio playback
      aiAudioRef.muted = true
      aiAudioRef.volume = 0
      aiAudioRef.src = `data:audio/mp3;base64,${initialBase64}`
      aiAudioRef.play()
    }
  })

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

  const playAudio = async (base64: string) => {
    logDev('Is Canceled:', isCanceled())

    if (isCanceled()) {
      setAudio64((prev) => prev.slice(1))
      return
    }

    try {
      const audioSrc = `data:audio/mp3;base64,${base64}`

      if (aiAudioRef) {
        setupAudioMotion()

        aiAudioRef.src = audioSrc
        aiAudioRef.muted = false
        aiAudioRef.volume = 1
        oneClickActions.setStatus(BotStatus.ANSWERING)

        aiAudioRef.onerror = (e: any) => {
          logDev('Error playing audio:', e)
          setAudio64([])
          oneClickActions.setStatus(BotStatus.IDLE)
          setIsPlayingQueue(false)
        }
        aiAudioRef.onended = async () => {
          setAudio64((prev) => prev.slice(1))

          if (audio64().length > 0) {
            playAudio(audio64()[0])
          } else {
            setIsPlayingQueue(false)
          }
        }

        aiAudioRef.onplay = async () => {
          logDev('Playing audio')
        }

        await aiAudioRef.play()
      }
    } catch (error: any) {
      logDev('Error playing audio:', error)

      oneClickActions.setStatus(BotStatus.IDLE)
      setIsPlayingQueue(false)
      setAudio64([])

      if (error?.name !== 'NotAllowedError') {
        logErrorToServer({
          error,
          context: {
            description: 'Error playing audio in AIVoice',
          },
        })
      }
    }
  }

  return <audio ref={aiAudioRef} crossorigin='anonymous' />
}

const initialBase64 = `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4QCBEWjOCjERwCMTECCIyHMeUAgEwIMETjTsw5wAiSOiCcxJgqhTKvAVTHERgXIecGxxlDxhUIoKSGLgGrEBAUySkZGF3QoJLA41sTAcBqIMGEdIeYj2YKggXVyJZh1Bak2VFjgYkvyoPgAhxq0CjJJlpTBQS2Rn//PkxNd5LDnMAN6yvAMaGXBjpaIALjDBukIBlvOFCyywq8dpRyqFaQGXQKSpRyBwJpClu0mFYACAIyxAmFQEtrAjNCIDJALPi1gORNBNADaMYEKEg60HHk1DDgMypqaIi9RCE1c0Sn0EZinJklK6AgaYYMICyKZLRxYsaRAxIySZw4Q6BQkflcFy0aQECKgGSQl+pqOCGcKqZihKGYgpfAwwGwqDhdMWZLes9Liv+KqLBiSZhglpQc7YUXTuYoJFlyHAZAk0qULlF5y4AGed5Q9PgcIBWZMg9SmREWICAEKQBEA6wS7AMcICy9hAeBjllEIqaSfD0iQ5QSmInwPKkYRpFgQBGdHMOhay2ZS4GAgQkwgQ6EVLCJQArUxBTUUzLjEwMDccTcGDemhg81iQawUNoqmYSZE5hIA7YEBL4p/IHKAuSsMMFFomehjCelhdxQtE0tkMHDGhcQ0YEDWops7z0K6ZTHkjRwAdIALCAG6Y5Q/gM3SLhrcjWBAosGRoiMGaBgVIpHKFFkRGJFxOtXMMFyhg4cADWChVg2WKNpyEQiyKHZAmAApOp4rufpeLJErkvWBBcRUWJINYEZVItyXUxlOpI1ThdzlN3R9WCXEhKW2p5iU3O/+USf9IkVEg//PkxLxj5DmsANZwCDzYMLsGjmQrBzAVQQBGTfLoqHJrJaqXFzVIF4lO2aNCUFQRLsQWaOrC7Uqa8misIiiqkiMjy0FaTHkJKdzKGLKYrwQqCg0iAUoUKkECBpmFklppqtaru0tJla/WdR+KP07NBKm4t0akxGdbsn0CCploGrmi0PJGpiAZwIeieEJZ8ps0dXqQzP20fmPQM7M5Ln2htQVbKkS1Sq6FK8mDMhaiuVwGTLldB5nJpHagVSpk5clNwMEFiosGFCmhnIjODio7F+i5q1EwpQ/ztOmtVTJ04pHVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV`
