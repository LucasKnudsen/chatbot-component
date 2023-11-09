import { isStreamAvailableQuery } from '@/queries/sendMessageQuery'
import socketIOClient from 'socket.io-client'
import { createSignal, onCleanup, onMount } from 'solid-js'

export function useSocket(
  chatflowid: string,
  apiHost: string,
  onStart: () => void,
  onDocuments: (documents: any) => void,
  onToken: (token: string) => void
) {
  const [isChatFlowAvailableToStream, setIsChatFlowAvailableToStream] = createSignal(false)

  const [socketIOClientId, setSocketIOClientId] = createSignal('')

  const socket = socketIOClient(apiHost as string)

  onMount(async () => {
    const { data } = await isStreamAvailableQuery({
      chatflowid: chatflowid,
      apiHost: apiHost,
    })

    if (data) {
      setIsChatFlowAvailableToStream(data?.isStreaming ?? false)
    }

    socket.on('connect', () => {
      setSocketIOClientId(socket.id)
    })

    socket.on('start', onStart)

    socket.on('sourceDocuments', onDocuments)

    socket.on('token', onToken)
  })

  onCleanup(() => {
    socket.disconnect()
    setSocketIOClientId('')
  })

  return { socketIOClientId, isChatFlowAvailableToStream }
}
