import { configStore } from '@/features/portal-init'
import { createEffect, on } from 'solid-js'
import { messages, setMessages, useLLM } from '../../hooks'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'
import { Conversation } from '../components/Conversation'
import { InputOneClick } from '../components/InputOneClick'

export const TextChatScreen = () => {
  const { submitNewMessage, cancelQuery } = useLLM({})

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

  const handleInitiateConversation = async () => {
    if (messages().length > 0) return

    const message = oneClickStore.getChatInitiationMessage

    if (!message) return

    oneClickActions.setStatus(BotStatus.INITIATING)

    // Sends the text to the TTS service
    // !isMuted() && (await handleTTS(message))

    // Inject words from welcome message to the conversation as if they were streamed
    setTimeout(async () => {
      setMessages((prev) => [
        ...prev,
        {
          content: '',
          role: 'assistant',
          conversationId: oneClickStore.activeConversationId || '',
          displayName: oneClickStore.botDisplayName,
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
      oneClickActions.setStatus(BotStatus.IDLE)

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
    <div
      class={`w-full overflow-auto  bg-[var(--backgroundColor)] flex flex-col grow justify-end px-5 pb-4`}
      style={{
        height: '100%',
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
        <Conversation />
      </div>

      <InputOneClick
        onSubmit={handleNewMessage}
        cancelQuery={() => {
          cancelQuery()
        }}
      />
    </div>
  )
}
