import { botStore, currentLanguage } from '@/features/bot'
import { logErrorMessage } from '@/utils'
import { IncomingInput, PromptCode, extractChatbotResponse } from 'archive/messages'
import { API } from 'aws-amplify'
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
  const previousQuestions = botStore.activeHistory
    .filter((chat) => new Date(chat.timestamp).toDateString() === new Date().toDateString())
    .slice(-5)
    .map((chat) => chat.question)

  // Don't send if there are no relevant previous questions
  if (previousQuestions.length === 0) {
    return
  }

  const body: IncomingInput = {
    question: '',
    previousQuestions,
    promptCode: PromptCode.SUGGESTED_PROMPTS,
    language: language || currentLanguage(),
  }

  setSuggestedPromptsStore({ isFetching: true })

  try {
    const response = await API.post('digitaltwinRest', '/flowise/middleware', {
      body,
    })

    if (response) {
      const text = extractChatbotResponse(response)
      const newPrompts = extractSuggestedPrompts(text)

      setSuggestedPromptsStore({ prompts: newPrompts })
    }
  } catch (error) {
    logErrorMessage(error, 'SuggestedPromptStore.fetch')
  } finally {
    setSuggestedPromptsStore({ isFetching: false })
  }
}

const suggestedPromptsStoreActions = {
  clear,
  setSuggestedPromptsStore,
  fetch,
}

export { suggestedPromptsStore, suggestedPromptsStoreActions }
