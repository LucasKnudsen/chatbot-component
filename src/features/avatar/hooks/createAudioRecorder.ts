import { Accessor, createSignal, onCleanup } from 'solid-js'

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

export function createAudioRecorder(props?: {
  onStop?: (audioBlob: Blob) => void
}): CreateAudioRecorderReturn {
  const [mediaStream, setMediaStream] = createSignal<MediaStream | null>(null)
  const [mediaRecorder, setMediaRecorder] = createSignal<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = createSignal<boolean>(false)
  const [isPaused, setIsPaused] = createSignal<boolean>(false)
  const [audioBlob, setAudioBlob] = createSignal<Blob | null>(null)
  const [seconds, setSeconds] = createSignal(0)

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
        .getUserMedia({ audio: true })
        .then((stream) => {
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
            props?.onStop?.(audioBlob) // Call the onStop callback with the audioBlob
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
      console.error('Error starting recording:', error)
      alert(error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder()) {
      mediaRecorder()?.stop()
      mediaStream()
        ?.getTracks()
        .forEach((track) => track.stop())
      setMediaRecorder(null)
      setMediaStream(null)
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
