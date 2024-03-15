import { Button, IconButton, MicrophoneIcon, TypingBubble } from '@/components'
import { ChannelDocumentType } from '@/graphql'
import { createAudioRecorder, createMutation } from '@/hooks'
import { logDev } from '@/utils'
import { Match, Show, Switch, createEffect, createSignal } from 'solid-js'
import { KnowledgeBaseTitle, KnowledgeBaseTopBar } from '../../components'
import { indexDocument, mergeTranscriptBySpeaker, transcribeAudio } from '../../services'

export const AudioRecordingView = (props: { onBack: () => void }) => {
  return (
    <div class='h-full flex flex-col pb-9 lg:pb-20 '>
      <KnowledgeBaseTopBar title='Record Audio' onBack={props.onBack} />

      <KnowledgeBaseTitle title='Train your AI with a new recording' />

      <AudioInput onBack={props.onBack} />
    </div>
  )
}

const AudioInput = (props: { onBack: () => void }) => {
  const [loadingStatus, setLoadingStatus] = createSignal('')

  const audioRecorder = createAudioRecorder()

  const uploadMutation = createMutation({
    mutationFn: async () => {
      const audioBlob = audioRecorder.audioBlob()
      if (!audioBlob) {
        throw new Error('No audio blob found')
      }

      const audioFile = new File([audioBlob], 'audio.wav', { type: audioBlob.type })

      setLoadingStatus('Uploading audio...')

      setTimeout(() => {
        setLoadingStatus('Transcribing audio...')
      }, 2000)

      const transcriptionResponse = await transcribeAudio(audioFile)

      console.log(transcriptionResponse)

      const mergedTrascript = mergeTranscriptBySpeaker(transcriptionResponse.transcription)

      const concatinatedText = mergedTrascript
        .map((chunk) => `${chunk.speaker}: ${chunk.text}`)
        .join(' ')

      const textFile = new File([concatinatedText], 'raw.txt', {
        type: 'text/plain',
      })

      setLoadingStatus('Integrating new knowledge...')

      return await indexDocument({
        originalFile: audioFile,
        parsedTextFile: textFile,
        documentParams: {
          title: `app-recording-${new Date().toISOString()}`,
          documentType: ChannelDocumentType.TRANSCRIPTION,
          includeInLibrary: false,
        },
      })
    },
    onSuccess: () => {
      logDev('Success!')
      setLoadingStatus('')
    },
    onError: (error) => {
      console.error('Uploading audio failed: ', error)
      setLoadingStatus('')
    },
  })

  createEffect(() => {
    if (uploadMutation.isSuccess()) {
      setTimeout(() => {
        props.onBack()
      }, 3000)
    }
  })

  return (
    <div class='flex flex-col grow'>
      <div class='flex flex-col grow justify-center items-center gap-16 '>
        <Switch>
          <Match when={uploadMutation.isSuccess()}>
            <p class='text-3xl  italic text-[var(--primaryColor)] text-center'>Complete!</p>
          </Match>

          <Match when={uploadMutation.isLoading()}>
            <>
              <TypingBubble />
              <p class='italic text-[var(--primaryColor)] text-center'>{loadingStatus()}</p>
              <p class='italic text-xs text-[var(--primaryColor)] text-center'>
                (This may take a while.)
              </p>
            </>
          </Match>

          <Match when={audioRecorder.audioBlob()}>
            <audio controls src={URL.createObjectURL(audioRecorder.audioBlob()!)} />
            <p class='italic text-[var(--primaryColor)] text-center'>
              Recording complete. Press the button below to upload the content to your knowledge
              base.
            </p>
          </Match>

          <Match when={!audioRecorder.audioBlob()}>
            <>
              <div class='relative flex justify-center items-center'>
                <Show when={audioRecorder.isRecording()}>
                  <div class='absolute animate-ping border border-[var(--primaryColor)] rounded-full h-20 w-20 '></div>
                </Show>
                <MicrophoneIcon class='h-24 w-24 text-[var(--primaryColor)]' />
              </div>

              {/* RECORDING BUTTONS  */}
              <Switch
                fallback={
                  <IconButton onClick={audioRecorder.startRecording}>
                    <div class='outline-[var(--onPrimary)] w-12 h-12 bg-red-500 rounded-full flex justify-center items-center'>
                      <div class=' w-5 h-5 bg-[var(--onPrimary)] rounded-full' />
                    </div>
                  </IconButton>
                }
              >
                <Match when={audioRecorder.isRecording()}>
                  <div class='flex gap-8'>
                    {/* <IconButton onClick={audioRecorder.pauseRecording()}>
                    <div class='outline-[var(--onPrimary)] w-12 h-12 bg-[var(--primaryColor)] rounded-full flex justify-center items-center'></div>
                  </IconButton> */}

                    <IconButton onClick={audioRecorder.stopRecording}>
                      <div class='outline-[var(--onPrimary)] w-12 h-12 bg-[var(--primaryColor)] rounded-full flex justify-center items-center'>
                        <div class=' w-4 h-4 bg-[var(--onPrimary)] ' />
                      </div>
                    </IconButton>
                  </div>
                </Match>
              </Switch>

              {/* RECORDING TEXT  */}
              <p class='italic text-[var(--primaryColor)] text-center'>
                <Switch
                  fallback={
                    <>
                      Please press the button to start recording.
                      <br />
                    </>
                  }
                >
                  <Match when={audioRecorder.isRecording()}>
                    Currently recording...
                    <br />
                    End the recording to upload the content to your knowledge base.
                  </Match>
                </Switch>
              </p>
            </>
          </Match>
        </Switch>
      </div>

      <Show when={!uploadMutation.isLoading() && !uploadMutation.isSuccess()}>
        <Button
          class='w-full lg:w-52'
          disabled={!audioRecorder.audioBlob()}
          onClick={() => uploadMutation.mutate()}
        >
          Upload content
        </Button>
      </Show>
    </div>
  )
}
