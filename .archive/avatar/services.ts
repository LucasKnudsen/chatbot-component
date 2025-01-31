import { PROMPT_IDS } from '@/constants/ai/prompting'
import { authStore } from '../../src/features/authentication'
import { configStore } from '../../src/features/portal-init'
import { botStore } from '../bot'
import { LLMStreamId, PromptCode } from '../messages'

export const hey = 'hey'

export const buildBodyForLLM = () => {
  if (!botStore.activeChannel) throw new Error('No active channel')

  const memory = botStore.activeHistory.slice(-15).flatMap((chat) => [
    { type: 'userMessage', message: chat.question },
    { type: 'apiMessage', message: chat.answer },
  ]) as { type: 'apiMessage' | 'userMessage'; message: string }[]

  const { id } = botStore.activeChannel
  const { database } = configStore.chatSpaceConfig

  return {
    knowledgeBaseId: id,
    promptId: PROMPT_IDS.DEFAULT_RESPONSE,
    database,
    sessionId: authStore.sessionId,
    channelId: botStore.activeChannel!.id,
    memory,
    promptCode: PromptCode.QUESTION,
    socketIOClientId: LLMStreamId(),
  }
}
