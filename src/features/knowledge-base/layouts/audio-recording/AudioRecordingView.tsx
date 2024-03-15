import { Button, IconButton, MicrophoneIcon, TypingBubble } from '@/components'
import { ChannelDocumentType } from '@/graphql'
import { createAudioRecorder, createMutation } from '@/hooks'
import { Match, Show, Switch } from 'solid-js'
import { KnowledgeBaseTitle, KnowledgeBaseTopBar } from '../../components'
import { indexDocument, mergeTranscriptBySpeaker, transcribeAudio } from '../../services'

export const AudioRecordingView = (props: { onBack: () => void }) => {
  return (
    <div class='h-full flex flex-col pb-9 lg:pb-20 '>
      <KnowledgeBaseTopBar title='Record Audio' onBack={props.onBack} />

      <KnowledgeBaseTitle title='Record audio to train the AI on' />

      <AudioInput />
    </div>
  )
}

const AudioInput = () => {
  const audioRecorder = createAudioRecorder()

  const uploadMutation = createMutation({
    mutationFn: async () => {
      const audioBlob = audioRecorder.audioBlob()
      if (!audioBlob) {
        throw new Error('No audio blob found')
      }

      const audioFile = new File([audioBlob], 'audio.wav', { type: audioBlob.type })

      const transcriptionResponse = await transcribeAudio(audioFile)

      console.log(transcriptionResponse)

      const mergedTrascript = mergeTranscriptBySpeaker(transcriptionResponse.transcription)

      const concatinatedText = mergedTrascript
        .map((chunk) => `${chunk.speaker}: ${chunk.text}`)
        .join(' ')

      const textFile = new File([concatinatedText], 'raw.txt', {
        type: 'text/plain',
      })

      await indexDocument({
        originalFile: audioFile,
        parsedTextFile: textFile,
        documentParams: {
          title: `app-recording-${new Date().toISOString()}`,
          documentType: ChannelDocumentType.TRANSCRIPTION,
          includeInLibrary: false,
        },
      })
    },
  })

  return (
    <div class='flex flex-col grow'>
      <div class='flex flex-col grow justify-center items-center gap-16 '>
        <Switch>
          <Match when={uploadMutation.isSuccess()}>
            <>
              <p class='italic text-[var(--primaryColor)] text-center'>Complete!</p>
            </>
          </Match>

          <Match when={uploadMutation.isLoading()}>
            <>
              <TypingBubble />
              <p class='italic text-[var(--primaryColor)] text-center'>
                Uploading content to your knowledge base...
              </p>
            </>
          </Match>

          <Match when={audioRecorder.audioBlob()}>
            <audio controls src={URL.createObjectURL(audioRecorder.audioBlob()!)} />
            <p class='italic text-[var(--primaryColor)] text-center'>
              Recording complete. Press the button to upload the content to your knowledge base.
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

      <Show when={!uploadMutation.isLoading()}>
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
