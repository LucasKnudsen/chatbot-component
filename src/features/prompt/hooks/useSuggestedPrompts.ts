import { botStore, currentLanguage } from '@/features/bot'
import {
  IncomingInput,
  PromptCode,
  extractChatbotResponse,
  sendMessageQuery,
} from '@/features/messages'
import { createStore } from 'solid-js/store'
import { extractSuggestedPrompts } from '../utils'

type SuggestedPromptsStore = {
  prompts: string[]
  isFetching: boolean
}

const [suggestedPromptsStore, setSuggestedPromptsStore] = createStore<SuggestedPromptsStore>({
  prompts: [],
  isFetching: false,
})

const clear = () => {
  setSuggestedPromptsStore({
    prompts: [],
    isFetching: false,
  })
}

const fetch = async (language?: string) => {
  clear()

  // Take only the questions from today. We don't want to suggest questions from previous days. Take latest 5.
  const previousQuestions = botStore.history
    .filter((question) => new Date(question.createdAt).toDateString() === new Date().toDateString())
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

  setSuggestedPromptsStore({ isFetching: true })
  const response = await sendMessageQuery(body)
  setSuggestedPromptsStore({ isFetching: false })

  if (response.data) {
    const text = extractChatbotResponse(response.data)
    const newPrompts = extractSuggestedPrompts(text)

    setSuggestedPromptsStore({ prompts: newPrompts })
  }
}

const suggestedPromptsStoreActions = {
  clear,
  setSuggestedPromptsStore,
  fetch,
}

export { suggestedPromptsStore, suggestedPromptsStoreActions }
