import { logDev } from '@/utils'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createEffect, createMemo } from 'solid-js'
import toast from 'solid-toast'
import { createAudioRecorder } from '../avatar'
import { useText } from '../text'
import {
  AvatarOneClick,
  InputOneClick,
  InteractionButton,
  MuteAISwitch,
  isMuted,
} from './components'
import { AIVoice, aiAudioRef, setIsPlayingQueue } from './components/AIVoice'
import { Conversation, expandConversation } from './components/Conversation'
import { setAudio64, useLLM } from './hooks'
import { handleTTS, handleTranscription } from './services'
import { heyGenStore } from './store/heyGenStore'
import { oneClickActions, oneClickStore } from './store/oneClickStore'
import { BotStatus } from './types'

export const BotOneClick = () => {
  const [TopContainerParent] = createAutoAnimate()
  const device = useMediaQuery()
  const { text } = useText()

  const audioRecorder = createAudioRecorder({
    onStop(audioBlob) {
      handleVoiceToVoice(audioBlob)
    },
  })

  const { messages, setMessages, submitNewMessage, cancelQuery } = useLLM({
    initialMessages: [],
  })

  const shouldInitiateNextMessage = createMemo(() => {
    return Boolean(text().welcomeMessage && messages().length === 0)
  })

  const handleTriggerAudio = () => {
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
      setAudio64([])
      setIsPlayingQueue(false)
    }
  }

  const handleButtonRecord = () => {
    if (oneClickStore.botStatus === BotStatus.LISTENING) {
      oneClickActions.setStatus(BotStatus.THINKING)
      audioRecorder.stopRecording()
    } else if (
      oneClickStore.botStatus === BotStatus.ANSWERING ||
      oneClickStore.botStatus === BotStatus.THINKING
    ) {
      cancelQuery()
      handleStopAudio()
      oneClickActions.setStatus(BotStatus.IDLE)
    } else {
      oneClickActions.setStatus(BotStatus.LISTENING)
      audioRecorder.startRecording()
    }
  }

  const handleNewMessage = async (input: string) => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: input,
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
        },
      ])
      const transcribedText = await handleTranscription(audioBlob)

      setMessages((prev) => {
        prev[prev.length - 1].content = transcribedText
        return prev
      })
      submitNewMessage({
        message: transcribedText,
      })
    } catch (error) {
      oneClickActions.setStatus(BotStatus.IDLE)
      toast.error('Error in voice to voice conversion', {
        position: 'top-center',
        className: '!text-base',
      })
    }
  }

  createEffect(() => {
    setTimeout(() => {
      oneClickActions.setStatus(BotStatus.IDLE)
    }, 100)
  })

  // createEffect(() => {
  //   if (!isMuted() && messages().length > 0 && !loading()) {
  //     const lastMessage = messages()[messages().length - 1]
  //     if (lastMessage.role === 'assistant') {
  //       setBotLastResponse(lastMessage.content)
  //     }
  //   }
  // })
  const handelHeyGenMaxWidth = () => {
    if (!heyGenStore.isExpandAvatar) return 'unset'
    if (device() === 'tablet') return '95%'
    if (device() === 'mobile') return '100%'
    return '100%'
  }

  const onInteractionButtonClick = async () => {
    // Checks if the Bot should welcome the user
    if (shouldInitiateNextMessage()) {
      oneClickActions.setStatus(BotStatus.THINKING)
      setMessages((prev) => [...prev, { content: '', role: 'assistant' }])

      const message = oneClickStore.shouldWelcome
        ? text().welcomeMessage
        : text().returnWelcomeMessage || text().welcomeMessage

      await handleTTS(message)
      // Inject words from welcome message to the conversation as if they were streamed
      const words = message.split(' ')
      oneClickActions.setStatus(BotStatus.ANSWERING)

      for (const word of words) {
        setMessages((prev) => {
          prev[prev.length - 1].content += word + ' '

          return [...prev]
        })
        await new Promise((resolve) => setTimeout(resolve, 70)) // 100ms delay between words
      }
    } else {
      handleButtonRecord()
    }

    localStorage.setItem('lastStarted', new Date().toISOString())
  }

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
          class={`relative w-full flex flex-col h-1/2  items-center overflow-hidden ${
            heyGenStore.isExpandAvatar ? '' : 'px-5'
          } bg-white`}
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
              <MuteAISwitch onMute={handleTriggerAudio} />
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
            <InteractionButton
              onStart={onInteractionButtonClick}
              shouldInitiateNextMessage={shouldInitiateNextMessage}
            />
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
              <Conversation
                messages={messages}
                shouldInitiateNextMessage={shouldInitiateNextMessage}
              />
            </div>

            <InputOneClick onSubmit={handleNewMessage} />
          </div>
        </Show>
      </div>
    </>
  )
}
