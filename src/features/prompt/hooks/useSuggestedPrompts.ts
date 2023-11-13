import { MessageType } from '@/features/bot/components/Bot'
import { IncomingInput, sendMessageQuery } from '@/features/messages/queries/sendMessageQuery'
import { Accessor, createSignal, onMount } from 'solid-js'

export function useSuggestedPrompts(
  chatflowid: string,
  apiHost: string,
  messages: Accessor<MessageType[]>
) {
  const [suggestedPrompts, setSuggestedPrompts] = createSignal<string[]>([])

  const clearSuggestions = () => {
    setSuggestedPrompts([])
  }

  const fetchSuggestedPrompts = async () => {
    clearSuggestions()

    const body: IncomingInput = {
      question:
        'Please give me three concise prompts to ask you about the context. This should be in array format format e.g. ["What is your name?", "What is your age?", "What is your email?"]. Do not say anything else, just send me back an array.',
      history: messages(),
      // chatId: '123',
    }

    console.log('sending message', body)

    const response = await sendMessageQuery({
      chatflowid,
      apiHost,
      body,
    })

    if (response.data) {
      try {
        const items = JSON.parse(response.data)

        if (!Array.isArray(items)) return

        setSuggestedPrompts(items)
      } catch (error) {
        return
      }
    }
  }

  onMount(() => {
    if (messages().length > 1) {
      fetchSuggestedPrompts()
    }
  })

  return { suggestedPrompts, fetchSuggestedPrompts, clearSuggestions }
}
