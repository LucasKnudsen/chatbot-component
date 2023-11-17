import { createSignal, onMount } from 'solid-js'
import { v4 as uuidv4 } from 'uuid'

const [chatId, setChatId] = createSignal<string>('')

export const useChatId = (chatflowid: string) => {
  const storageKey = `${chatflowid}_CHATID`

  const clear = () => {
    const newChatId = uuidv4()

    localStorage.setItem(storageKey, newChatId)

    setChatId(newChatId)
  }

  onMount(() => {
    let chatId = localStorage.getItem(storageKey) ?? uuidv4()

    localStorage.setItem(storageKey, chatId)

    setChatId(chatId!)
  })

  return { chatId, clear }
}
