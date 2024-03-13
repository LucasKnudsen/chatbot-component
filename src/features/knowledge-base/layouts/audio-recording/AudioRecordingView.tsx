import { IconButton, MicrophoneIcon } from '@/components'
import { API, Storage } from 'aws-amplify'
import { createSignal, onCleanup } from 'solid-js'
import { KnowledgeBaseTitle, KnowledgeBaseTopBar } from '../../components'

export const AudioRecordingView = (props: { onBack: () => void }) => {
  return (
    <div>
      <KnowledgeBaseTopBar title='Record Audio' onBack={props.onBack} />

      <KnowledgeBaseTitle title='Record audio to train the AI on' />

      <AudioInput />
    </div>
  )
}

const AudioInput = () => {
  const [mediaStream, setMediaStream] = createSignal<MediaStream | null>(null)
  const [mediaRecorder, setMediaRecorder] = createSignal<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = createSignal<boolean>(false)
  const [isLoading, setIsLoading] = createSignal<boolean>(false)

  const handleUpload = async (blob: Blob) => {
    const type = blob.type
    const key = `test.${type.split('/')[1]}`

    try {
      setIsLoading(true)
      console.time('FULL')

      await Storage.put(key, blob, {
        contentType: 'audio/webm',
      })

      const transcription = await API.post('digitaltwinRest', '/transcribe', {
        body: {
          s3Key: `public/${key}`,
          type,
        },
      })

      console.log(transcription)

      //   props.onSubmit(transcription)
    } catch (error) {
      console.error('Uploading transcription error', error)
    }

    console.timeEnd('FULL')

    setIsLoading(false)
  }

  // Function to start recording
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream)
        const audioChunks: Blob[] = [] // Store audio chunks
        let type = 'audio/webm'

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data)
            type = event.data.type.split(';')[0]
          }
        }

        recorder.onstop = async () => {
          // Handle the recording stopped event
          const audioBlob = new Blob(audioChunks, { type })

          handleUpload(audioBlob)
        }

        setMediaStream(stream)
        setMediaRecorder(recorder)
        recorder.start()
        setIsRecording(true)
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error)
        alert('Error accessing microphone')
      })
  }

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorder()) {
      mediaRecorder()?.stop()
      console.log('Stopped recording.')
      mediaStream()
        ?.getTracks()
        .forEach((track) => track.stop())
      setMediaRecorder(null)
      setMediaStream(null)
      setIsRecording(false)
    }
  }

  onCleanup(() => {
    stopRecording() // Stop recording when the component unmounts
  })

  return (
    <>
      {isLoading() ? (
        <div class='animate-ping rounded-full m-1 h-3 w-3 bg-gray-700' />
      ) : isRecording() ? (
        <IconButton onClick={stopRecording}>
          <div class=' animate-pulse m-1 h-3 w-3  ani  bg-gray-700 opacity-75'></div>
        </IconButton>
      ) : (
        <IconButton onClick={startRecording}>
          <MicrophoneIcon height={20} width={20} />
        </IconButton>
      )}
    </>
  )
}
