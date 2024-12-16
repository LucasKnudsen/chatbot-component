import { authStore } from '@/features/authentication'
import { botStore, botStoreActions, createHistoryRecord } from '@/features/bot'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { Channel, SubscriptionEvent } from '@/graphql'
import {
  SubscriptionHelper,
  clearAllSubscriptionsOfType,
  clearSubscription,
  logDev,
  logErrorMessage,
} from '@/utils'
import socketIOClient from 'socket.io-client'
import {
  IncomingInput,
  LLMStreamId,
  LLMStreamSocket,
  PromptCode,
  isInitiatingLLMStream,
  isStreamAvailableQuery,
  sendMessageQuery,
  setLLMStreamSocket,
  setLLMStreamingId,
} from '.'
import { ChatResponse } from './types'

export const queryLLM = async (message: string) => {
  if (message.trim() === '') {
    return
  }

  botStoreActions.setLoading(true)

  suggestedPromptsStoreActions.clear()

  // Get the last 15 messages from the chat history
  const memory = botStore.activeHistory.slice(-15).flatMap((chat) => [
    { type: 'userMessage', message: chat.question },
    { type: 'apiMessage', message: chat.answer },
  ]) as { type: 'apiMessage' | 'userMessage'; message: string }[]

  botStoreActions.buildQuestion(message)

  const body: IncomingInput = {
    question: message,
    sessionId: authStore.sessionId,
    channelId: botStore.activeChannel!.id,
    memory,
    promptCode: PromptCode.QUESTION,
    socketIOClientId: LLMStreamId(),
  }

  // Fires without waiting for response, as the response is handled by a socket connection
  const [flowiseResponse] = await Promise.allSettled([
    sendMessageQuery(body),
    // detectLanguage(message, true),
  ])

  botStoreActions.setLoading(false)

  suggestedPromptsStoreActions.fetch()

  setTimeout(() => {
    createHistoryRecord(botStore.activeChannel?.activeChat!)
  }, 500)

  const text = flowiseResponse.status === 'fulfilled' ? flowiseResponse.value?.data : null

  return text
}

export const initiateChatConnection = async (channelId: string) => {
  const cacheName = 'chat-listener'

  const chatId = `${channelId}#${authStore.sessionId}`

  if (!chatId) {
    console.warn('No chatId')
    return
  }

  clearSubscription(chatId, cacheName) // Clear previous subscription if exists

  logDev('Initiated chat sub', chatId)

  const onNext = (data: SubscriptionEvent) => {
    logDev('Chat sub onNext', data)
    const response = JSON.parse(data.data) as ChatResponse

    // If the chatflow is not available to stream, we update the answer here
    // if (!isChatFlowAvailableToStream()) {
    //   botStoreActions.updateAnswer(response.text)
    // }

    // Uses the source documents from the end result rather than sockets (they are the same, and doesnt stream in anyway)
    botStoreActions.handleSourceDocuments(response.sourceDocuments)

    // Saves end answer in history rather than at every stream update
    // botStoreActions.updateAnswerInHistory(response.text)

    botStoreActions.setLoading(false)
    suggestedPromptsStoreActions.fetch()
  }

  try {
    SubscriptionHelper<SubscriptionEvent>({
      query: 'subscribe2channel',
      variables: { sessionId: chatId },
      cache: {
        key: chatId,
        type: cacheName,
      },
      onNext,
    })
  } catch (error) {
    logErrorMessage(error, 'initiateChatConnection')
  }
}

export const initLLMStream = async (channel: Channel) => {
  return await new Promise(async (resolve) => {
    let socket = LLMStreamSocket()

    if (socket != null) {
      // Prevent multiple socket connections
      logDev('Socket already exists')
      return
    }

    socket = socketIOClient(channel.apiHost as string)

    if (socket == null) {
      console.warn('No socket')
      return
    }

    setLLMStreamSocket(socket)

    const { data } = await isStreamAvailableQuery({
      chatflowId: channel.chatflowId!,
      apiHost: channel.apiHost!,
    })

    logDev('Streaming available query: ', data)

    if (data) {
      socket.id && setLLMStreamingId(socket.id)
    }

    socket.on('connect', () => {
      logDev('Initiated chat stream', socket!.id)

      isInitiatingLLMStream(false)
      setLLMStreamingId(socket.id!)
      resolve(socket)
    })

    // socket.on('start', () => onStart?.())

    socket.on('sourceDocuments', botStoreActions.handleSourceDocuments)

    socket.on('token', botStoreActions.updateAnswer)

    socket.on('end', () => logDev('Socket stopped'))

    socket.on('disconnect', () => {
      logDev('Socket disconnected')
      isInitiatingLLMStream(false)
      setLLMStreamingId('')
      botStoreActions.setLoading(false)
      setLLMStreamSocket(null)
    })
  })
}

export const clearLLMStream = () => {
  const socket = LLMStreamSocket()

  if (!socket) {
    console.warn('No socket')
    return
  }

  socket.disconnect()
}

export const clearChannelConnection = () => {
  clearAllSubscriptionsOfType('chat-listener')
  clearLLMStream()
}
