export interface ChatMessage {
  content: string
  role: 'assistant' | 'user'
  conversationId: string
  displayName?: string
}

export enum BotStatus {
  NOT_STARTED = 'not_started',
  IDLE = 'idle',
  LISTENING = 'listening',
  THINKING = 'thinking',
  ANSWERING = 'answering',
}
