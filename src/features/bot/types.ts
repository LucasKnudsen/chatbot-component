export type ChatMessage =
  | {
      content: string
      role: 'user'
      conversationId: string
      displayName?: string
    }
  | {
      content: string
      role: 'assistant'
      conversationId: string
      displayName: string
    }

export enum BotStatus {
  NOT_STARTED = 'not_started',
  INITIATING = 'initiating',
  IDLE = 'idle',
  LISTENING = 'listening',
  THINKING = 'thinking',
  ANSWERING = 'answering',
}
