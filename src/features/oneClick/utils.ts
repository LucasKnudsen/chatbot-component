import { BaseChatMode } from '@/graphql'
import { messages, setMessages } from './hooks'
import { handleTTS } from './services'
import { oneClickActions, oneClickStore } from './store/oneClickStore'
import { BotStatus } from './types'

export function cleanContentForSpeech(content: string): string {
  // Removing markdown headers and other unwanted characters
  let cleanedContent = content.replace(/[#_*~`>+\=\[\]\(\)]/g, '').replace(/\n/g, ' ')

  // Removing URLs
  cleanedContent = cleanedContent.replace(/https?:\/\/[^\s]+/g, '')

  return cleanedContent
}

export const handleInitiateConversation = async () => {
  if (messages().length > 0) return

  const message = oneClickStore.getChatInitiationMessage

  if (!message) return

  oneClickActions.setStatus(BotStatus.INITIATING)

  // Sends the text to the TTS service
  if (oneClickStore.chatMode === BaseChatMode.VOICE) {
    await handleTTS(message)
  }

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

    // If the chat mode is text, we set the bot to idle after the welcome message
    if (oneClickStore.chatMode === BaseChatMode.TEXT) {
      oneClickActions.setStatus(BotStatus.IDLE)
    }

    localStorage.setItem('lastStarted', new Date().toISOString())
  }, 1000)
}
