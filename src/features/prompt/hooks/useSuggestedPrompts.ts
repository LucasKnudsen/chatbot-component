import { botStore, currentLanguage } from '@/features/bot'
import {
  IncomingInput,
  PromptCode,
  extractChatbotResponse,
  scrollChatWindowToBottom,
  sendMessageQuery,
} from '@/features/messages'
import { createEffect, createSignal, on } from 'solid-js'

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

  createEffect(
    on(
      () => isFetching(),
      () =>
        setTimeout(() => {
          suggestedPrompts().length === 0 && scrollChatWindowToBottom()
        }, 200),
      { defer: true }
    )
  )

  return { suggestedPrompts, fetchSuggestedPrompts, clearSuggestions, isFetching }
}
