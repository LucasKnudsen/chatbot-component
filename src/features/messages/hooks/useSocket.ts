import { botStore } from '@/features/bot'
import { SourceDocument } from '@/features/contextual'
import { isStreamAvailableQuery } from '@/features/messages/queries/sendMessageQuery'
import { logDev } from '@/utils'
import socketIOClient, { Socket } from 'socket.io-client'
import { createEffect, createSignal, on, onCleanup, onMount } from 'solid-js'
import { setIsLoadingSocket } from '..'

export function useSocket({
  onStart,
  onToken,
}: {
  onStart?: () => void
  onDocuments?: (documents: SourceDocument[]) => void
  onToken?: (token: string) => void
}) {
  const [isChatFlowAvailableToStream, setIsChatFlowAvailableToStream] = createSignal(false)

  const [socketIOClientId, setSocketIOClientId] = createSignal('')

  let socket: Socket

  // When the active channel changes, we need to reconnect to the socket server.
  createEffect(
    on(
      () => botStore.activeChannel,
      () => {
        socket && handleCleanup()

        setTimeout(() => {
          initSocket()
        }, 1000)
      }
    )
  )

  const initSocket = async () => {
    console.log('socket', socket)
    if (socket) return
    socket = socketIOClient(botStore.activeChannel!.apiHost as string)

    const { data } = await isStreamAvailableQuery({
      chatflowId: botStore.activeChannel!.chatflowId!,
      apiHost: botStore.activeChannel!.apiHost!,
    })

    if (data) {
      socket.id && setSocketIOClientId(socket.id)
      setIsChatFlowAvailableToStream(data?.isStreaming ?? false)
    }

    socket.on('connect', () => {
      logDev('Initiated chat stream', socket.id)

      setIsLoadingSocket(false)
      setSocketIOClientId(socket.id)
    })

    socket.on('start', () => onStart?.())

    // socket.on('sourceDocuments', (docs) => onDocuments?.(docs))

    socket.on('token', (t) => onToken?.(t))
  }

  const handleCleanup = () => {
    logDev('Closing socket connection')
    socket.disconnect()
    setSocketIOClientId('')
    setIsChatFlowAvailableToStream(false)
  }

  onMount(initSocket)
  onCleanup(handleCleanup)

  return { socketIOClientId, isChatFlowAvailableToStream }
}
