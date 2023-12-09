import { MessageType } from '@/features/bot/components/Bot'
import { sendRequest } from '@/utils/index'
import { API } from 'aws-amplify'

export enum PromptCode {
  QUESTION = 'question',
  SUGGESTED_PROMPTS = 'suggestedPrompts',
}

export type IncomingInput = {
  promptCode: PromptCode
  question: string
  channelId?: string
  language?: string

  previousQuestions?: string[]
  history?: MessageType[]
  overrideConfig?: Record<string, unknown>
  socketIOClientId?: string
  chatId?: string
}

export async function sendMessageQuery(body: IncomingInput) {
  try {
    // TODO: Test timeout of the REST API. (There's a 30 second timeout on AppSync)
    const answer = await API.post('digitaltwinRest', '/fraia/middleware', {
      body,
    })

    return {
      data: answer,
    }
  } catch (error) {
    return { error: error as Error }
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
