import { Socket } from 'socket.io-client'
import { createSignal } from 'solid-js'

export const [initiatingLLMStream, isInitiatingLLMStream] = createSignal(false)
export const [LLMStreamId, setLLMStreamingId] = createSignal('')
export const [LLMStreamSocket, setLLMStreamSocket] = createSignal<Socket | null>(null)
