import { logDev, logErrorToServer } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createEffect, on } from 'solid-js'
import { createAudioRecorder } from '../avatar'
import { configStore } from '../portal-init'
import {
  AvatarOneClick,
  InputOneClick,
  InteractionButton,
  MIC_VISUALIZER_ID,
  MuteAISwitch,
  isMuted,
} from './components'
import { AIVoice, aiAudioRef, setIsPlayingQueue } from './components/AIVoice'
import { Conversation, expandConversation } from './components/Conversation'
import { isCanceled, setAudio64, setIsCanceled, useLLM } from './hooks'
import { handleTTS, handleTranscription } from './services'
import { heyGenStore } from './store/heyGenStore'
import { oneClickActions, oneClickStore } from './store/oneClickStore'
import { BotStatus } from './types'

export const BotOneClick = () => {
  const [TopContainerParent] = createAutoAnimate()
  const device = useMediaQuery()

  const audioRecorder = createAudioRecorder({
    visualizerElementId: MIC_VISUALIZER_ID,
    onStop(audioBlob) {
      handleVoiceToVoice(audioBlob)
    },
  })

  const { messages, setMessages, submitNewMessage, cancelQuery } = useLLM({
    initialMessages: [],
  })

  const handleMuteAudio = () => {
    if (!aiAudioRef) return
    aiAudioRef.muted = isMuted()

    handleStopAudio()
  }

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

  const handleNewMessage = async (input: string) => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: input,
        conversationId: oneClickStore.activeConversationId || '',
      },
    ])
    submitNewMessage({
      message: input,
    })
  }

  const handleVoiceToVoice = async (audioBlob: Blob) => {
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

  const handleInitiateConversation = async () => {
    if (messages().length > 0) return

    const message = oneClickStore.getChatInitiationMessage

    if (!message) return

    oneClickActions.setStatus(BotStatus.INITIATING)

    // Sends the text to the TTS service
    !isMuted() && (await handleTTS(message))

    // Inject words from welcome message to the conversation as if they were streamed
    setTimeout(async () => {
      setMessages((prev) => [
        ...prev,
        {
          content: '',
          role: 'assistant',
          conversationId: oneClickStore.activeConversationId || '',
        },
      ])

      const words = message.split(' ')

      for (const word of words) {
        setMessages((prev) => {
          prev[prev.length - 1].content += word + ' '

          return [...prev]
        })
        await new Promise((resolve) => setTimeout(resolve, 50)) // 100ms delay between words
      }

      // If the user is muted, we need to manually set the bot status to idle
      isMuted() && oneClickActions.setStatus(BotStatus.IDLE)

      localStorage.setItem('lastStarted', new Date().toISOString())
    }, 1000)
  }

  createEffect(
    on(
      () => configStore.isBotOpened,
      () => {
        configStore.isBotOpened && handleInitiateConversation()
      }
    )
  )

  return (
    <>
      <div
        ref={TopContainerParent}
        data-testid='BotOneClick'
        class={`relative flex flex-col w-full h-full items-center justify-center animate-fade-in ${
          heyGenStore.isExpandAvatar ? '' : 'mt-[20px]'
        } overflow-hidden`}
      >
        {/* Voice Only Component */}

        <AIVoice />

        {/* Avatar Component */}
        <div
          class={`relative w-full flex flex-col h-1/2  items-center  ${
            heyGenStore.isExpandAvatar ? '' : 'px-5'
          } `}
          style={{
            height: heyGenStore.isExpandAvatar ? '100%' : '50%',
            'max-width': handelHeyGenMaxWidth(),
          }}
        >
          <div class='absolute left-8 top-4 z-20 '>
            <Show
              when={
                oneClickStore.botStatus !== BotStatus.NOT_STARTED && !heyGenStore.isExpandAvatar
              }
              keyed
            >
              <MuteAISwitch onMute={handleMuteAudio} />
            </Show>
          </div>

          <div class='h-full w-full'>
            <AvatarOneClick />
          </div>

          <div
            class={`${heyGenStore.isExpandAvatar ? 'opacity-75 hover:opacity-100' : ''} z-20`}
            style={{
              position: heyGenStore.isExpandAvatar ? 'absolute' : 'unset',
              bottom: heyGenStore.isExpandAvatar ? '15vh' : 'unset',
            }}
          >
            <InteractionButton onStart={handleButtonRecord} />
          </div>
        </div>
        <Show when={!heyGenStore.isExpandAvatar}>
          <div
            class={`w-full overflow-auto ${
              expandConversation() ? 'absolute z-[100] end-0 bg-[var(--backgroundColor)]' : ''
            } flex flex-col grow justify-end px-5 pb-4`}
            style={{
              height: expandConversation() ? '100%' : '50%',
              transition: '0.4s height ease',
              bottom: 0,
            }}
          >
            <div
              class='overflow-auto'
              style={{
                height: '100%',
                transition: '0.4s height ease-in-out',
                'scrollbar-width': 'none',
              }}
            >
              <Conversation messages={messages} />
            </div>

            <InputOneClick
              onSubmit={handleNewMessage}
              cancelQuery={() => {
                cancelQuery()
                handleStopAudio()
              }}
            />
          </div>
        </Show>
      </div>
    </>
  )
}
