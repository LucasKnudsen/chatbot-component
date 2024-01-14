import { customElement } from 'solid-element'
import { defaultBotProps } from './constants'
import { ChatInitializer } from './features/chat-init'

export const registerWebComponents = () => {
  if (typeof window === 'undefined') return
  // customElement('fraia-fullchatbot', defaultBotProps, Full)

  customElement('fraia-chatbot', defaultBotProps, ChatInitializer)
}
