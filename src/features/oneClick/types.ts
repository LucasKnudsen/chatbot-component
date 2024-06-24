export interface ChatMessage {
  message: string
  role: 'assistant' | 'user'
}

export enum BotStatus {
  NOT_STARTED = 'not_started',
  IDLE = 'idle',
  LISTENING = 'listening',
  THINKING = 'thinking',
  ANSWERING = 'answering',
}
