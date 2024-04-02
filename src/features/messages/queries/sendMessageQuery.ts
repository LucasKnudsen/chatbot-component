import { botStore } from '@/features/bot'
import { configStore } from '@/features/portal-init'
import { sendRequest } from '@/utils/index'
import { API } from 'aws-amplify'

export enum PromptCode {
  QUESTION = 'question',
  SUGGESTED_PROMPTS = 'suggestedPrompts',
}

export type ShortTermMemory = {
  type: 'apiMessage' | 'userMessage'
  message: string
}

export type IncomingInput = {
  promptCode: PromptCode
  question: string
  channelId?: string
  sessionId?: string
  language?: string

  previousQuestions?: string[]
  memory?: ShortTermMemory[]
  overrideConfig?: Record<string, unknown>
  socketIOClientId?: string
}

export async function sendMessageQuery(body: IncomingInput) {
  try {
    const answer = await API.post('digitaltwinRest', '/flowise/middleware', {
      body,
    })

    return {
      data: answer,
    }
  } catch (error) {
    return { error: error as Error }
  }
}

export async function flowiseMessageQuery(body: IncomingInput) {
  if (!botStore.activeChannel) throw new Error('No active channel')

  const { apiHost, chatflowId, apiKey, id } = botStore.activeChannel
  const { database } = configStore.chatSpaceConfig

  try {
    const response = await fetch(`${apiHost}/api/v1/prediction/${chatflowId}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey!,
      },

      body: JSON.stringify({
        overrideConfig: {
          database,
          tableName: `fraia_${(id as any).replaceAll('-', '_')}`, // This should be documented
          returnSourceDocuments: true,
        },
        chatflowid: botStore.activeChannel.chatflowId,
        apiHost: botStore.activeChannel.apiHost,
        question: body.question,
        history: body.memory,
        socketIOClientId: body.socketIOClientId,
      }),
    })

    return response
  } catch (error) {
    console.error('Error querying flowise', error)
  }
}

export const isStreamAvailableQuery = ({
  chatflowId,
  apiHost = 'http://localhost:3000',
}: {
  chatflowId: string
  apiHost?: string
}) =>
  sendRequest<any>({
    method: 'GET',
    url: `${apiHost}/api/v1/chatflows-streaming/${chatflowId}`,
  })
