import { createEffect, createSignal, on, onMount } from 'solid-js'
import { v4 as uuidv4 } from 'uuid'
import { botStore } from '..'

const [chatId, setChatId] = createSignal<string>('')

export const useChatId = () => {
  const storageKey = `${botStore.activeChannel.chatflowId!}_CHATID`

  onMount(() => initChatId)

  createEffect(
    on(
      () => botStore.activeChannel,
      () => initChatId()
    )
  )

  const clear = () => {
    const newChatId = uuidv4()

    localStorage.setItem(storageKey, newChatId)

    setChatId(newChatId)
  }

  const initChatId = () => {
    let chatId = localStorage.getItem(storageKey) ?? uuidv4()

    localStorage.setItem(storageKey, chatId)

    setChatId(chatId!)
  }

  return { chatId, clear }
}
