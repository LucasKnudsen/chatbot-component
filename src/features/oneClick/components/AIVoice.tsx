import { Accessor, createEffect, createSignal, on, Setter } from 'solid-js'
import { oneClickActions } from '../store/oneClickStore'
import { BotStatus } from '../types'
import { isMuted } from './MuteAISwitch'

interface AIVoiceProps {
  audioQueue: Accessor<string[]>
  setAudioQueue: Setter<string[]>
}

export let audioRef: any
export const [isPlayingQueue, setIsPlayingQueue] = createSignal(false)
export const AIVoice = (props: AIVoiceProps) => {

  createEffect(
    on(props.audioQueue, () => {
      if (props.audioQueue().length === 0) {
        console.log('Queue is empty, cleared audio player')
        oneClickActions.setStatus(BotStatus.IDLE);
        setIsPlayingQueue(false)
      }

      if (isPlayingQueue()) return

      if (props.audioQueue().length > 0) {
        playAudio(props.audioQueue()[0])
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
          props.setAudioQueue([])
        }
        audioRef.onended = async () => {
          // audioQueue.nested(0).set(none)
          props.setAudioQueue((prev) => prev.slice(1))

          if (props.audioQueue().length > 0) {
            console.log('Playing audio bite', props.audioQueue()[0].slice(0, 100))
            requestAnimationFrame(() => playAudio(props.audioQueue()[0]))
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
