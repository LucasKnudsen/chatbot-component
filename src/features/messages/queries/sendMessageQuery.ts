import { MessageType } from '@/features/bot/components/Bot'
import { sendRequest } from '@/utils/index'
import { API } from 'aws-amplify'

export type IncomingInput = {
  question: string
  history: MessageType[]
  overrideConfig?: Record<string, unknown>
  socketIOClientId?: string
  chatId?: string
}

export type MessageRequest = {
  chatflowid: string
  apiHost?: string
  body?: IncomingInput
}

export async function sendMessageQuery({ body, chatflowid, apiHost }: MessageRequest) {
  try {
    // TODO: Test timeout of the REST API. (There's a 30 second timeout on AppSync)
    const answer = await API.post('digitaltwinRest', '/flowise/middleware', {
      body: {
        chatflowid,
        apiHost,
        ...body,
      },
    })

    return {
      data: answer,
    }
  } catch (error) {
    return { error: error as Error }
  }
}

export const isStreamAvailableQuery = ({
  chatflowid,
  apiHost = 'http://localhost:3000',
}: MessageRequest) =>
  sendRequest<any>({
    method: 'GET',
    url: `${apiHost}/api/v1/chatflows-streaming/${chatflowid}`,
  })
