import { Button, Divider, HeadsetIcon, MicIcon, SendIcon, Spinner } from '@/components'
import { ExitIcon } from '@/components/icons/ExitIcon'
import { TickIcon } from '@/components/icons/TickIcon'
import { createAudioRecorder } from '@/features/avatar'
import { quickTranscribe } from '@/features/knowledge-base'
import { useTheme } from '@/features/theme'
import { BaseChatMode } from '@/graphql'
import { logErrorMessage } from '@/utils'
import { createEffect, createSignal, Show } from 'solid-js'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'

type InputProps = {
  onSubmit: (input: string) => void
  cancelQuery: () => void
}

export const InputOneClick = (props: InputProps) => {
  const [input, setInput] = createSignal('')
  const [textareaHeight, setTextareaHeight] = createSignal('40px')
  const { theme } = useTheme()
  const [isLoading, setIsLoading] = createSignal<boolean>(false)
  const [cancelRecording, setCancelRecording] = createSignal(false)

  const audioRecorder = createAudioRecorder({
    visualizerElementId: 'visualizer',
    visualizerType: 'waveform',
    onStop: (blob) => handleTranscription(blob),
  })

  let textareaRef: HTMLTextAreaElement | undefined

  const handleContainerClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('textarea')) {
      textareaRef?.focus()
    }
  }

  const handleTranscription = async (audioBlob: Blob) => {
    try {
      if (cancelRecording()) return

      setIsLoading(true)

      setInput(await quickTranscribe(audioBlob))
    } catch (error) {
      logErrorMessage(error, 'ChatInput.handleTranscription')
    } finally {
      setIsLoading(false)
    }
  }

  const wrapSubmit = () => {
    if (!input() || oneClickStore.botStatus !== BotStatus.IDLE) return

    props.onSubmit(input())
    setInput('')
  }

  const handleKeyDown = (e: any) => {
    setInput(e.currentTarget.value)

    if (e.key === 'Enter' && e.shiftKey === false) {
      wrapSubmit()
      e.preventDefault()
    }
  }

  const handleRecording = async () => {
    try {
      if (audioRecorder.isRecording()) {
        audioRecorder.stopRecording()
        return
      }
      setCancelRecording(false)
      audioRecorder.startRecording()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const handleCancelRecording = () => {
    setCancelRecording(true)
    audioRecorder.stopRecording()
  }

  createEffect(() => {
    const text = input()
    if (text.length === 0) setTextareaHeight('40px')
    const lineCount = text.split('\n').length
    const charCount = text.length
    const baseHeight = 40
    const lineHeight = 30

    const calculatedHeight =
      Math.max(baseHeight, lineCount * lineHeight, Math.ceil(charCount / 50) * lineHeight) > 150
        ? 150
        : Math.max(baseHeight, lineCount * lineHeight, Math.ceil(charCount / 50) * lineHeight)

    setTextareaHeight(`${calculatedHeight}px`)
  })

  return (
    <div
      class='cursor-pointer'
      onclick={() => {
        if (textareaRef) {
          textareaRef.focus()
        }
      }}
    >
      <Divider margin={0} />
      <div
        onClick={handleContainerClick}
        class='flex flex-col items-center justify-between border border-[var(--bubbleButtonColor)] mt-3 rounded-lg bg-[var(--textInputBackgroundColor)]'
      >
        <Show when={!audioRecorder.isRecording() && !isLoading()}>
          <textarea
            ref={textareaRef}
            value={input()}
            onChange={(e) => setInput(e.currentTarget.value)}
            onPaste={(e) => {
              e.preventDefault()
              const text = e.clipboardData?.getData('text/plain')
              if (text) {
                setInput(text)
              }
            }}
            onKeyDown={handleKeyDown}
            class='grow w-full py-2 text-[16px] text-[var(--textInputTextColor)] bg-transparent px-3 resize-none outline-none'
            placeholder='Message'
            rows={1}
            style={{
              height: textareaHeight(),
              overflow: input()?.length < 50 ? 'auto' : 'hidden',
            }}
          />
        </Show>

        <div class='h-[35px] flex items-center justify-between gap-2 w-full px-1 py-1'>
          <div class='flex items-center'>
            <Show when={audioRecorder.isRecording()}>
              <Button
                disabled={oneClickStore.botStatus !== BotStatus.IDLE}
                onClick={handleCancelRecording}
                class='animate-fade-in'
                style={{
                  background: 'transparent',
                  'outline-color': 'transparent',
                  padding: '0px 5px',
                }}
              >
                <ExitIcon
                  class='text-[var(--primaryColor)] w-6 h-auto'
                  color={theme().primaryColor}
                />
              </Button>
            </Show>
            <Show when={!audioRecorder.isRecording()}>
              <Button
                disabled={oneClickStore.botStatus !== BotStatus.IDLE || isLoading()}
                onClick={() => oneClickActions.setOneClickStore({ chatMode: BaseChatMode.VOICE })}
                class='animate-fade-in'
                style={{
                  background: 'transparent',
                  'outline-color': 'transparent',
                  padding: '0px 5px',
                }}
              >
                <HeadsetIcon class='text-[var(--primaryColor)] w-5 h-auto' />
              </Button>

              <Button
                disabled={oneClickStore.botStatus !== BotStatus.IDLE || isLoading()}
                onClick={handleRecording}
                class='animate-fade-in'
                style={{
                  background: 'transparent',
                  'outline-color': 'transparent',
                  padding: '0px 5px',
                }}
              >
                <MicIcon
                  class='text-[var(--primaryColor)] w-5 h-auto'
                  stroke={theme().primaryColor}
                  style={{
                    'transform-origin': 'center',
                  }}
                />
              </Button>
            </Show>
          </div>

          <div
            id='visualizer'
            class='w-full h-full justify-center items-center'
            style={{
              display: audioRecorder.isRecording() ? 'flex' : 'none',
            }}
          ></div>

          <Show
            when={!oneClickStore.isBotProcessing}
            fallback={
              <button
                class='all-unset mx-3 flex items-center justify-center h-auto'
                onClick={props.cancelQuery}
              >
                <div class='w-3.5 h-3.5 rounded-sm bg-[var(--primaryColor)] ' />
              </button>
            }
          >
            <button
              class='all-unset mx-3 flex items-center justify-center h-auto'
              onClick={audioRecorder?.isRecording() ? handleRecording : wrapSubmit}
            >
              <Show when={isLoading()}>
                <Spinner size={20} />
              </Show>
              <Show when={!isLoading()}>
                {audioRecorder?.isRecording() ? (
                  <TickIcon
                    class='text-[var(--primaryColor)] w-6 h-auto'
                    color={theme().primaryColor}
                  />
                ) : (
                  <SendIcon
                    style={{
                      opacity: oneClickStore.botStatus === BotStatus.IDLE && input() ? 1 : 0.5,
                      fill: theme().primaryColor,
                    }}
                  />
                )}
              </Show>
            </button>
          </Show>
        </div>
      </div>
    </div>
  )
}
