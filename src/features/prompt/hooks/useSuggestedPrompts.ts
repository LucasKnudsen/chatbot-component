import { extractChatbotResponse } from '@/features/messages'
import { IncomingInput, sendMessageQuery } from '@/features/messages/queries/sendMessageQuery'
import { createSignal } from 'solid-js'

export function useSuggestedPrompts(chatflowid: string, apiHost: string) {
  const [suggestedPrompts, setSuggestedPrompts] = createSignal<string[]>([])
  const [isFetching, setIsFetching] = createSignal(false)

  const clearSuggestions = () => {
    setSuggestedPrompts([])
  }

  const fetchSuggestedPrompts = async () => {
    clearSuggestions()

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

  return { suggestedPrompts, fetchSuggestedPrompts, clearSuggestions, isFetching }
}
