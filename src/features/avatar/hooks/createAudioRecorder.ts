import { useTheme } from '@/features/theme'
import { logErrorMessage, shadowQuerySelector} from '@/utils'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { Accessor, createSignal, onCleanup } from 'solid-js'
import { createWaveform } from './createWaveform'

type CreateAudioRecorderProps = {
  onStop?: (audioBlob: Blob) => void
  visualizerElementId?: string
  visualizerType?: 'circle' | 'waveform'
}

type CreateAudioRecorderReturn = {
  startRecording: () => void
  stopRecording: () => void
  pauseRecording: () => void
  resumeRecording: () => void
  isRecording: Accessor<boolean>
  isPaused: Accessor<boolean>
  audioBlob: Accessor<Blob | null>
  seconds: Accessor<number>
}

export function createAudioRecorder(
  props: CreateAudioRecorderProps = { visualizerType: 'circle' }
): CreateAudioRecorderReturn {
  const [mediaStream, setMediaStream] = createSignal<MediaStream | null>(null)
  const [micStream, setMicStream] = createSignal<MediaStreamAudioSourceNode | null>(null)
  const [mediaRecorder, setMediaRecorder] = createSignal<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = createSignal<boolean>(false)
  const [isPaused, setIsPaused] = createSignal<boolean>(false)
  const [audioBlob, setAudioBlob] = createSignal<Blob | null>(null)
  const [seconds, setSeconds] = createSignal(0)

  const { theme } = useTheme()

  let audioMotion: AudioMotionAnalyzer | null = null

  const setupAudioMotion = () => {
    if (!audioMotion && props.visualizerElementId) {
      audioMotion = new AudioMotionAnalyzer(undefined, {
        mode: props.visualizerType === 'waveform' ? 1 : 10,
        radial: props.visualizerType === 'circle',
        useCanvas: false,
        onCanvasDraw: (instance) => {
          const container = shadowQuerySelector(`#${props.visualizerElementId}`)

          if (!container) return

          const bars = instance.getBars()
          const totalFrequency = bars.reduce((sum, bar) => sum + bar.value[0], 0)
          const avgFrequency = totalFrequency / bars.length
          if (avgFrequency === 0) return

          if (props.visualizerType === 'circle') {
            container.style.transform = `scale(${1 + avgFrequency * 0.2})`
            container.style.opacity = '1'
          } else {
            let waveformInstance = (container as any)._waveform
            if (!waveformInstance) {
              waveformInstance = createWaveform({
                container,
                primaryColor: theme().primaryColor || 'black'
              });
              (container as any)._waveform = waveformInstance
            }

            waveformInstance.updateWaveform(bars)
          }
          container.style.opacity = '1'
        },
      })
    }
  }

  let intervalId: ReturnType<typeof setInterval> | null = null

  const startTimer = () => {
    if (intervalId !== null) return // Prevent multiple intervals
    intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
  }

  const pauseTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const resetTimer = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
    setSeconds(0)
  }

  const startRecording = () => {
    try {
      if (!window.MediaRecorder) {
        throw new Error('MediaRecorder is not supported in this browser');
      }
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          if (props.visualizerElementId) {
            setupAudioMotion()
            if (!audioMotion || !audioMotion.audioCtx) {
              throw new Error('Failed to initialize audio visualizer')
            }
            const micStream = audioMotion.audioCtx.createMediaStreamSource(stream)
            // connect microphone stream to analyzer
            audioMotion.connectInput(micStream)
            // mute output to prevent feedback loops from the speakers
            audioMotion.volume = 0

            setMicStream(micStream)
          }

          const recorder = new MediaRecorder(stream)
          const audioChunks: Blob[] = []
          let type = 'audio/webm'

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              audioChunks.push(event.data)
              type = event.data.type.split(';')[0]
            }
          }

          recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type })
            setAudioBlob(audioBlob)
            props.onStop?.(audioBlob) // Call the onStop callback with the audioBlob
            resetTimer()
          }

          setMediaStream(stream)
          setMediaRecorder(recorder)
          recorder.start(1000)
          setIsRecording(true)
          startTimer()
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error)
          logErrorMessage(error, 'createAudioRecorder.startRecording')
        })
    } catch (error) {
      logErrorMessage(error, 'createAudioRecorder.startRecording')
    }
  }

  const cleanupAudioMotion = () => {
    if (audioMotion) {
      audioMotion.disconnectInput(micStream(), true)
      audioMotion.destroy()
      audioMotion = null
    }
  }

  const stopRecording = () => {
    if (mediaRecorder()) {
      mediaRecorder()?.stop()
      mediaStream()
        ?.getTracks()
        .forEach((track) => track.stop())
      cleanupAudioMotion()
      setMediaRecorder(null)
      setMediaStream(null)
      setMicStream(null)
      setIsRecording(false)
      setIsPaused(false) // Reset paused state
      pauseTimer()
    }
  }

  const pauseRecording = () => {
    if (mediaRecorder() && mediaRecorder()?.state === 'recording') {
      mediaRecorder()?.pause()
      setIsPaused(true)
      pauseTimer()
    }
  }

  const resumeRecording = () => {
    if (mediaRecorder() && mediaRecorder()?.state === 'paused') {
      mediaRecorder()?.resume()
      setIsPaused(false)
      startTimer()
    }
  }

  onCleanup(() => {
    stopRecording() // Stop recording when the component unmounts
  })

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    isPaused,
    audioBlob,
    seconds,
  }
}
