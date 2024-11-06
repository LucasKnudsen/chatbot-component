import { Button, KeyboardIcon } from '@/components'
import { createAudioRecorder } from '@/features/avatar'
import { BaseChatMode } from '@/graphql'
import { logDev, logErrorToServer } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { isCanceled, setAudio64, setIsCanceled, setMessages, useLLM } from '../../hooks'
import { handleTranscription } from '../../services'
import { heyGenStore } from '../../store/heyGenStore'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'
import { aiAudioRef, AIVoice, setIsPlayingQueue } from '../components/AIVoice'
import { AvatarOneClick } from '../components/AvatarOneClick'
import { InteractionButton, MIC_VISUALIZER_ID } from '../components/InteractionButton'

export const VoiceChatScreen = () => {
  const device = useMediaQuery()

  const audioRecorder = createAudioRecorder({
    visualizerElementId: MIC_VISUALIZER_ID,
    onStop(audioBlob) {
      handleVoiceToVoice(audioBlob)
    },
  })

  const { submitNewMessage, cancelQuery } = useLLM({})

  const handleInterruptHeygen = async (retryLimit: number = 0) => {
    if (!heyGenStore.initialized && !heyGenStore.avatar) {
      return
    }
    if (heyGenStore.videoRef) heyGenStore.videoRef.muted = true

    try {
      await heyGenStore.avatar?.interrupt({
        interruptRequest: {
          sessionId: heyGenStore.sessionId,
        },
      })
    } catch (error: any) {
      try {
        const errorResponse = await error.response.json()
        logDev(errorResponse)
        if (errorResponse?.code == 400010) {
          if (retryLimit < 5) {
            setTimeout(() => {
              handleInterruptHeygen(retryLimit++)
            }, 1000)
          }
        }
      } catch (error2) {
        logDev('Error interrupting:', error, error2)
      }
    }
  }

  const handleStopAudio = () => {
    if (aiAudioRef) {
      handleInterruptHeygen()

      aiAudioRef.pause()
      aiAudioRef.src = ''
      aiAudioRef.currentTime = 0
      setAudio64([])
      setIsPlayingQueue(false)
    }
  }

  const handleButtonRecord = () => {
    switch (oneClickStore.botStatus) {
      case BotStatus.LISTENING:
        oneClickActions.setStatus(BotStatus.THINKING)
        audioRecorder.stopRecording()
        break

      case BotStatus.THINKING:
        cancelQuery()
        break

      default:
        cancelQuery()
        handleStopAudio()

        setTimeout(() => {
          audioRecorder.startRecording()
          oneClickActions.setStatus(BotStatus.LISTENING)
        }, 100)
        break
    }
  }

  const handleVoiceToVoice = async (audioBlob: Blob) => {
    setIsCanceled(false)

    try {
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          content: '',
          conversationId: oneClickStore.activeConversationId || '',
        },
      ])
      const transcribedText = await handleTranscription(audioBlob)

      // If the user cancels the recording, we don't want to send the message
      if (!isCanceled()) {
        setMessages((prev) => {
          prev[prev.length - 1].content = transcribedText
          return prev
        })
        submitNewMessage({
          withSpeech: true,
          message: transcribedText,
        })
      } else {
        // If the user cancels the recording, we need to remove the message
        setMessages((prev) => {
          if (prev[prev.length - 1].role === 'user') {
            prev.pop()
            return prev
          }
          return prev
        })
        setIsCanceled(false)
      }
    } catch (error) {
      logErrorToServer({
        error,
        context: {
          description: 'Error in voice to voice',
        },
      })
      oneClickActions.setStatus(BotStatus.IDLE)
    }
  }

  const handelHeyGenMaxWidth = () => {
    if (!heyGenStore.isExpandAvatar) return 'unset'
    if (device() === 'tablet') return '95%'
    if (device() === 'mobile') return '100%'
    return '100%'
  }

  return (
    <>
      <AIVoice />

      {/* Avatar Component */}
      <div
        class={`relative w-full flex flex-col h-full  items-center px-5 `}
        style={{
          'max-width': handelHeyGenMaxWidth(),
        }}
      >
        {/* <div class='absolute left-8 top-4 z-20 '>
            <Show
              when={
                oneClickStore.botStatus !== BotStatus.NOT_STARTED && !heyGenStore.isExpandAvatar
              }
              keyed
            >
              <MuteAISwitch onMute={handleMuteAudio} />
            </Show>
          </div> */}

        <div class='h-2/3 w-full flex items-center'>
          <AvatarOneClick />
        </div>

        <div
          class={`flex w-full grow ${
            heyGenStore.isExpandAvatar ? 'opacity-75 hover:opacity-100' : ''
          } z-20`}
          style={{
            position: heyGenStore.isExpandAvatar ? 'absolute' : 'unset',
            bottom: heyGenStore.isExpandAvatar ? '15vh' : 'unset',
          }}
        >
          <div class='flex flex-row items-center justify-evenly w-full '>
            <div>
              <Button
                onClick={() => {
                  oneClickActions.setOneClickStore({
                    chatMode: BaseChatMode.TEXT,
                  })
                }}
                style={{ background: 'transparent', padding: '12px' }}
                class='outline-1 outline-[var(--primaryColor)] '
              >
                <KeyboardIcon class='text-[var(--primaryColor)] w-6 h-6' />
              </Button>
            </div>

            <InteractionButton onStart={handleButtonRecord} />

            <div>
              <Button
                style={{ background: 'transparent', padding: '12px' }}
                class='outline-1 outline-[var(--primaryColor)] '
              >
                <div class='w-5 h-5 rounded-md bg-[var(--primaryColor)]' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
