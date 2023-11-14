import { MessageType } from '@/features/bot/components/Bot'
import { IncomingInput, sendMessageQuery } from '@/features/messages/queries/sendMessageQuery'
import { Accessor, createSignal, onMount } from 'solid-js'

// Follow-up questions related to a blockchain company
const dummySuggestions = [
  'What is your primary blockchain platform for development?',
  'Can you describe a smart contract you recently developed?',
  'What strategies do you use for cryptocurrency trading?',
]

export function useSuggestedPrompts(
  chatflowid: string,
  apiHost: string,
  messages: Accessor<MessageType[]>
) {
  const [suggestedPrompts, setSuggestedPrompts] = createSignal<string[]>([])
  const [isFetching, setIsFetching] = createSignal(false)

  const clearSuggestions = () => {
    setSuggestedPrompts([])
  }

  const fetchSuggestedPrompts = async () => {
    clearSuggestions()

    // remove sourceDocuments key from messages
    const history = messages().map((message) => {
      const { sourceDocuments, ...rest } = message
      return rest
    })

    const body: IncomingInput = {
      question:
        'Please give me three concise prompts to ask you about the context. This should be in array format format e.g. ["Question 1?", "Question 2?", "Question 3?"]. Do not say anything else, just send me back an array.',
      history,
      // chatId: '123',
    }

    setIsFetching(true)
    const response = await sendMessageQuery({
      chatflowid,
      apiHost,
      body,
    })
    setIsFetching(false)

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

  return { suggestedPrompts, fetchSuggestedPrompts, clearSuggestions, isFetching }
}
