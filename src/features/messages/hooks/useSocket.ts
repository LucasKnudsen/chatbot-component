import { SourceDocument } from '@/features/contextual'
import { isStreamAvailableQuery } from '@/features/messages/queries/sendMessageQuery'
import { logDev } from '@/utils'
import socketIOClient from 'socket.io-client'
import { createSignal, onCleanup, onMount } from 'solid-js'

export function useSocket({
  chatflowId,
  apiHost,
  onStart,
  onToken,
}: {
  chatflowId: string
  apiHost: string
  onStart?: () => void
  onDocuments?: (documents: SourceDocument[]) => void
  onToken?: (token: string) => void
}) {
  const [isChatFlowAvailableToStream, setIsChatFlowAvailableToStream] = createSignal(false)

  const [socketIOClientId, setSocketIOClientId] = createSignal('')

  const socket = socketIOClient(apiHost as string)

  onMount(async () => {
    const { data } = await isStreamAvailableQuery({
      chatflowId,
      apiHost,
    })

    if (data) {
      socket.id && setSocketIOClientId(socket.id)
      setIsChatFlowAvailableToStream(data?.isStreaming ?? false)
    }

    socket.on('connect', () => {
      logDev('In connect', socket.id)

      setSocketIOClientId(socket.id)
    })

    socket.on('start', () => onStart?.())

    // socket.on('sourceDocuments', (docs) => onDocuments?.(docs))

    socket.on('token', (t) => onToken?.(t))
  })

  onCleanup(() => {
    socket.disconnect()
    setSocketIOClientId('')
    setIsChatFlowAvailableToStream(false)
  })

  return { socketIOClientId, isChatFlowAvailableToStream }
}
