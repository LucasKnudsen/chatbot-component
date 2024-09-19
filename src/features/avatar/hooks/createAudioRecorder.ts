import { useTheme } from '@/features/theme'
import { Priority } from '@/graphql'
import { logErrorToServer } from '@/utils'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import { Accessor, createSignal, onCleanup } from 'solid-js'

type CreateAudioRecorderProps = {
  onStop?: (audioBlob: Blob) => void
  visualizerElementId?: string
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

export function createAudioRecorder(props: CreateAudioRecorderProps): CreateAudioRecorderReturn {
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
        mode: 10,
        radial: true,
        useCanvas: false,
        onCanvasDraw: (instance) => {
          const container = document.getElementById(props.visualizerElementId!)

          console.log('Setting up audio motion', container)

          if (!container) return

          const bars = instance.getBars()
          const totalFrequency = bars.reduce((sum, bar) => sum + bar.value[0], 0)
          const avgFrequency = totalFrequency / bars.length

          const dynamicSize = 80 + avgFrequency * 500

          container.style.width = `${dynamicSize}px`
          container.style.height = `${dynamicSize}px`

          container.style.backgroundColor = theme().surfaceHoveredBackground!

          container.style.top = `calc(50% - ${dynamicSize / 2}px)`
          container.style.left = `calc(50% - ${dynamicSize / 2}px)`
        },
      })
    }
  }

  let intervalId: number | null = null

  const startTimer = () => {
    if (intervalId !== null) return // Prevent multiple intervals
    intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000) as any
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
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          if (props.visualizerElementId) {
            setupAudioMotion()
            const micStream = audioMotion!.audioCtx!.createMediaStreamSource(stream)
            // connect microphone stream to analyzer
            audioMotion!.connectInput(micStream)
            // mute output to prevent feedback loops from the speakers
            audioMotion!.volume = 0

            setMicStream(micStream)
          } else {
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
          alert(error)
        })
    } catch (error) {
      logErrorToServer({
        error,
        priority: Priority.MEDIUM,
        context: {
          description: 'Error authenticating user',
        },
      })
      alert(error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder()) {
      mediaRecorder()?.stop()
      mediaStream()
        ?.getTracks()
        .forEach((track) => track.stop())
      audioMotion?.disconnectInput(micStream(), true)
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
