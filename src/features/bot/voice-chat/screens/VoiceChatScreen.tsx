import { createEffect, on } from 'solid-js'

import { Button, KeyboardIcon, XIcon } from '@/components'
import { createAudioRecorder } from '@/features/avatar'
import { configStore } from '@/features/portal-init'
import { BaseChatMode } from '@/graphql'
import { logDev, logErrorMessage } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { isCanceled, setAudio64, setIsCanceled, setMessages, useLLM } from '../../hooks'
import { handleTranscription } from '../../services'
import { heyGenStore } from '../../store/heyGenStore'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'
import { handleInitiateConversation } from '../../utils'
import { aiAudioRef, AIVoice, setIsPlayingQueue } from '../components/AIVoice'
import { AvatarOneClick } from '../components/AvatarOneClick'
import { InteractionButton, MIC_VISUALIZER_ID } from '../components/InteractionButton'

export const VoiceChatScreen = () => {
  const device = useMediaQuery()

  const audioRecorder = createAudioRecorder({
    visualizerElementId: MIC_VISUALIZER_ID,
    visualizerType: 'circle',
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

      case BotStatus.ANSWERING:
        cancelQuery()
        handleStopAudio()
        break

      default:
        audioRecorder.startRecording()
        oneClickActions.setStatus(BotStatus.LISTENING)
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
      console.log('transcribedText', transcribedText)

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
      logErrorMessage(error, 'VoiceChatScreen.handleVoiceToVoice')
      oneClickActions.setStatus(BotStatus.IDLE)
    }
  }

  const handelHeyGenMaxWidth = () => {
    if (!heyGenStore.isExpandAvatar) return 'unset'
    if (device() === 'tablet') return '95%'
    if (device() === 'mobile') return '100%'
    return '100%'
  }

  const handleCancelInteraction = () => {
    switch (oneClickStore.botStatus) {
      case BotStatus.LISTENING:
        oneClickActions.setStatus(BotStatus.THINKING)
        audioRecorder.stopRecording()
        break

      case BotStatus.THINKING:
        cancelQuery()
        break

      case BotStatus.ANSWERING:
        cancelQuery()
        handleStopAudio()
        break

      default:
        break
    }
  }

  createEffect(
    on(
      () => configStore.isBotOpened,
      () => {
        configStore.isBotOpened && handleInitiateConversation()
      },
    ),
  )

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

        <AvatarOneClick />

        <div
          class={` w-full grow ${
            heyGenStore.isExpandAvatar ? 'opacity-75 hover:opacity-100' : ''
          } z-20`}
          style={{
            position: heyGenStore.isExpandAvatar ? 'absolute' : 'unset',
            bottom: heyGenStore.isExpandAvatar ? '15vh' : 'unset',
          }}
        >
          <div class='flex flex-row items-center justify-evenly w-full h-[150px] '>
            <div>
              <Button
                disabled={oneClickStore.botStatus !== BotStatus.IDLE}
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
                onClick={handleCancelInteraction}
                disabled={!oneClickStore.isBotProcessing}
                style={{ background: 'transparent', padding: '12px' }}
                class='outline-1 outline-[var(--primaryColor)] '
              >
                <XIcon class='text-[var(--primaryColor)]' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
