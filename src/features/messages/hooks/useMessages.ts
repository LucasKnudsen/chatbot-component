import { MessageType } from '@/features/bot/components/Bot'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { v4 as uuidv4 } from 'uuid'

export function useMessages(chatflowid: string, welcomeMessage: string) {
  const storageKey = `${chatflowid}_EXTERNAL`
  const [chatId, setChatId] = createSignal(uuidv4())

  const [messages, _setMessages] = createSignal<MessageType[]>(
    [
      {
        message: welcomeMessage,
        type: 'apiMessage',
      },
    ],
    { equals: false }
  )

  const storeMessages = (allMessage: MessageType[]) => {
    localStorage.setItem(storageKey, JSON.stringify({ chatId: chatId(), chatHistory: allMessage }))
  }

  const updateLastMessage = (text: string) => {
    setAndSaveMessages((data) => {
      const updated = data.map((item, i) => {
        if (i === data.length - 1) {
          return { ...item, message: item.message + text }
        }
        return item
      })

      return [...updated]
    })
  }

  const updateLastMessageSourceDocuments = (sourceDocuments: any) => {
    setAndSaveMessages((data) => {
      const updated = data.map((item, i) => {
        if (i === data.length - 1) {
          return { ...item, sourceDocuments: sourceDocuments }
        }
        return item
      })
      storeMessages(updated)
      return [...updated]
    })
  }

  const setAndSaveMessages = (value: (prev: MessageType[]) => MessageType[]) => {
    _setMessages((data) => {
      const updated = value(data)

      storeMessages(updated)

      return [...updated]
    })
  }

  const appendMessage = (message: MessageType) => {
    setAndSaveMessages((data) => [...data, message])
  }

  const deleteChat = () => {
    try {
      localStorage.removeItem(storageKey)
      setChatId(uuidv4())

      _setMessages([
        {
          message: welcomeMessage,
          type: 'apiMessage',
        },
      ])
    } catch (error: any) {
      const errorData =
        error.response.data || `${error.response.status}: ${error.response.statusText}`
      console.error(`error: ${errorData}`)
    }
  }

  onMount(() => {
    const chatMessage = localStorage.getItem(storageKey)

    if (chatMessage) {
      const objChatMessage = JSON.parse(chatMessage)

      setChatId(objChatMessage.chatId)

      const loadedMessages = objChatMessage.chatHistory.map((message: MessageType) => {
        const chatHistory: MessageType = {
          message: message.message,
          type: message.type,
        }

        if (message.sourceDocuments) chatHistory.sourceDocuments = message.sourceDocuments

        return chatHistory
      })

      _setMessages([...loadedMessages])
    }
  })

  onCleanup(() => {
    _setMessages([
      {
        message: welcomeMessage,
        type: 'apiMessage',
      },
    ])
  })

  return {
    messages,
    chatId,
    updateLastMessage,
    updateLastMessageSourceDocuments,
    deleteChat,
    appendMessage,
  }
}
