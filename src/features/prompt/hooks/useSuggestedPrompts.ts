import { botStore, currentLanguage } from '@/features/bot'
import {
  IncomingInput,
  PromptCode,
  extractChatbotResponse,
  sendMessageQuery,
} from '@/features/messages'
import { createSignal } from 'solid-js'
import { extractSuggestedPrompts } from '../utils'

export function useSuggestedPrompts(chatflowid: string, apiHost: string) {
  const [suggestedPrompts, setSuggestedPrompts] = createSignal<string[]>([])
  const [isFetching, setIsFetching] = createSignal(false)

  const clearSuggestions = () => {
    setSuggestedPrompts([])
  }

  const fetchSuggestedPrompts = async (language?: string) => {
    clearSuggestions()

    // Take only the questions from today. We don't want to suggest questions from previous days. Take latest 5.
    const previousQuestions = botStore.history
      .filter(
        (question) => new Date(question.createdAt).toDateString() === new Date().toDateString()
      )
      .map((question) => question.question)
      .slice(-5)

    // Don't send if there are no relevant previous questions
    if (previousQuestions.length === 0) {
      return
    }

    const body: IncomingInput = {
      question: '',
      previousQuestions,
      promptCode: PromptCode.SUGGESTED_PROMPTS,
      language: language || currentLanguage(),
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
      const text = extractChatbotResponse(response.data)
      const newPrompts = extractSuggestedPrompts(text)

      setSuggestedPrompts(newPrompts)
    }
  }

  return { suggestedPrompts, fetchSuggestedPrompts, clearSuggestions, isFetching }
}
