import { MessageType } from '@/components/Bot'
import { sendRequest } from '@/utils/index'
// import { API } from 'aws-amplify'

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

export function sendMessageQuery({ body }: MessageRequest) {
  // return API.post('digitaltwinRest', '/flowise/middleware', body!)
}

export const isStreamAvailableQuery = ({
  chatflowid,
  apiHost = 'http://localhost:3000',
}: MessageRequest) =>
  sendRequest<any>({
    method: 'GET',
    url: `${apiHost}/api/v1/chatflows-streaming/${chatflowid}`,
  })
