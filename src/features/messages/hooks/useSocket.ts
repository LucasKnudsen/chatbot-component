import socketIOClient from 'socket.io-client'
import { createSignal, onCleanup, onMount } from 'solid-js'

export function useSocket(
  apiHost: string,
  onStart: () => void,
  onDocuments: (documents: any) => void,
  onToken: (token: string) => void
) {
  const [socketIOClientId, setSocketIOClientId] = createSignal('')

  const socket = socketIOClient(apiHost as string)

  onMount(() => {
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

  return socketIOClientId
}
