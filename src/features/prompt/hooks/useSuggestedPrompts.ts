import { MessageType } from '@/features/bot/components/Bot'
import { extractChatbotResponse } from '@/features/messages'
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
        'Based on our history so far, give me 2 short concise follow up prompts that would encourage me to proceed with the conversation. The questions need to be non-repetitive. Please provide the questions in a JSON array format like ["Question 1?", "Question 2?", "Question 3?"]. Do not say anything else, just send me back an array.',
      history: [],
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
      console.log(response.data)

      const text = extractChatbotResponse(response.data)
      let questionsArray: string[] = []

      try {
        // In case the response is a stringified JSON array
        questionsArray = JSON.parse(text)
      } catch (error) {
        // In case the response is a string with newlines
        questionsArray = text.split('\n').map((question) => question.replace(/^\d+\.\s/, ''))
      } finally {
        setSuggestedPrompts(questionsArray)
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
