import { speechSynthesis } from '@/services/speechSynthesis'
import { createSignal } from 'solid-js'
import { setAudio64 } from '../../hooks'
import { heyGenActions, heyGenStore } from '../../store/heyGenStore'
import { oneClickStore } from '../../store/oneClickStore'

type PendingRequest = {
  status: 'pending' | 'done'
  index: number
}

export const [ttsRequestsPending, setTtsRequestsPending] = createSignal<PendingRequest[]>([])

export const handleTTS = async (sentence: string) => {
  setTtsRequestsPending((prev) => [...prev, { status: 'pending', index: prev.length }])
  const requestIndex = ttsRequestsPending().length - 1

  if (oneClickStore.isHeyGenMode) {
    handleHeyGenTTS(sentence, requestIndex)
  } else {
    handleDefaultTTS(sentence, requestIndex)
  }
}

const handleHeyGenTTS = async (sentence: string, requestIndex: number) => {
  if (requestIndex === 0) {
    if (!heyGenStore.sessionId) {
      const interval = setInterval(async () => {
        if (heyGenStore.sessionId) {
          clearInterval(interval)
          await new Promise((resolve) => setTimeout(resolve, 500)) // Wait for the session to be in right state
          await heyGenActions.handleSpeak(sentence)
          ttsRequestsPending()[requestIndex].status = 'done'
        }
      }, 500)
    } else {
      await heyGenActions.handleSpeak(sentence)
      ttsRequestsPending()[requestIndex].status = 'done'
    }
  } else {
    // Check if the previous request is done before sending the next one
    const interval = setInterval(async () => {
      if (ttsRequestsPending()[requestIndex - 1]?.status === 'done') {
        clearInterval(interval)
        await heyGenActions.handleSpeak(sentence)

        ttsRequestsPending()[requestIndex].status = 'done'
      }
    }, 500)
  }
}

const handleDefaultTTS = async (sentence: string, requestIndex: number) => {
  const response = await speechSynthesis(sentence, oneClickStore.activeChannel?.id!, requestIndex)

  if (requestIndex === 0) {
    setAudio64((prev) => [...prev, response.audio])

    ttsRequestsPending()[requestIndex].status = 'done'
    return
  }

  // Check if the previous request is done before sending the next one
  const interval = setInterval(async () => {
    if (ttsRequestsPending()[requestIndex - 1]?.status === 'done') {
      setAudio64((prev) => [...prev, response.audio])

      ttsRequestsPending()[requestIndex].status = 'done'

      clearInterval(interval)
    }
  }, 500)
}
