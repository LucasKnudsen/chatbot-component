import { createSignal, onMount } from 'solid-js'
import { Question } from '../question'

export const useQuestion = (chatflowid: string) => {
  const storageKey = `${chatflowid}_QUESTIONS`

  const [question, setQuestion] = createSignal<Question | null>(null)

  const storeQuestions = (allQuestions: Question[]) => {
    localStorage.setItem(storageKey, JSON.stringify(allQuestions))
  }

  const getHistory = () => {
    const data = localStorage.getItem(storageKey)

    if (data) {
      const questions = JSON.parse(data)

      return questions as Question[]
    }

    return []
  }

  const updateAnswer = (answer: string) => {
    const oldQ = question()

    if (oldQ === null) return

    const updatedQuestion: Question = {
      question: oldQ.question,
      answer: (oldQ.answer ?? '') + answer,
    }

    setQuestion(updatedQuestion)

    const history = getHistory()
    history.pop()
    storeQuestions([...history, updatedQuestion])
  }

  const createQuestion = (question: string) => {
    const q: Question = {
      question: question,
      answer: null,
    }

    setQuestion(q)

    storeQuestions([...getHistory(), q])
  }

  const clear = () => {
    setQuestion(null)
    localStorage.removeItem(storageKey)
  }

  onMount(() => {
    const history = getHistory()

    if (history.length > 0) {
      setQuestion(history[history.length - 1])
    }
  })

  return {
    question,
    updateAnswer,
    createQuestion,
    clear,
  }
}
