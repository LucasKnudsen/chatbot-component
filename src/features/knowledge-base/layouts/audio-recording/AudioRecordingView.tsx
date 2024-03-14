import { IconButton, MicrophoneIcon } from '@/components'
import { API, Storage } from 'aws-amplify'
import { Match, Switch, createSignal, onCleanup } from 'solid-js'
import { KnowledgeBaseTitle, KnowledgeBaseTopBar } from '../../components'

export const AudioRecordingView = (props: { onBack: () => void }) => {
  return (
    <div class='h-full flex flex-col'>
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
  const [audioBlob, setAudioBlob] = createSignal<Blob | null>(null)

  const handleUpload = async (blob: Blob) => {
    setAudioBlob(blob)

    const type = blob.type
    const key = `test.${type.split('/')[1]}`

    const audioUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = audioUrl
    link.download = `fraia-recording-${Date.now()}.${blob.type.split('/')[1]}`
    link.click()

    return

    try {
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
    <div class='flex flex-col grow justify-center items-center gap-8'>
      <Switch>
        <Match when={audioBlob()}>
          <audio controls src={URL.createObjectURL(audioBlob()!)} />
        </Match>

        <Match when={!audioBlob()}>
          <>
            <MicrophoneIcon class='h-24 w-24' />

            {/* RECORDING BUTTONS  */}
            <Switch
              fallback={
                <IconButton onClick={startRecording}>
                  <div class='outline-white w-12 h-12 bg-red-400 rounded-full flex justify-center items-center'>
                    <div class=' w-5 h-5 bg-white rounded-full' />
                  </div>
                </IconButton>
              }
            >
              <Match when={isRecording()}>
                <div class='flex gap-8'>
                  {/* <IconButton onClick={stopRecording}>
              <div class='outline-white w-12 h-12 bg-[var(--primaryColor)] rounded-full flex justify-center items-center'>
                
              </div>
            </IconButton> */}
                  <IconButton onClick={stopRecording}>
                    <div class='outline-white w-12 h-12 bg-[var(--primaryColor)] rounded-full flex justify-center items-center'>
                      <div class=' w-5 h-5 bg-white ' />
                    </div>
                  </IconButton>
                </div>
              </Match>
            </Switch>

            {/* RECORDING TEXT  */}
            <p class='italic text-[var(--primaryColor)]'>
              <Switch fallback={'Please press the button to start recording'}>
                <Match when={isRecording()}>
                  Currently recording... End the recording to upload the content to your knowledge
                  base.
                </Match>
              </Switch>
            </p>
          </>
        </Match>
      </Switch>
    </div>
  )
}
