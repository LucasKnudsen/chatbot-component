import {
  ContextualElement,
  ContextualElementType,
  Resources,
  SourceDocument,
  SourceFact,
  SourceResource,
} from '@/features/contextual'
import uniqBy from 'lodash/uniqBy'
import { createSignal, onMount } from 'solid-js'
import { Chat } from '../types'

export const useQuestion = (chatflowid: string) => {
  const storageKey = `${chatflowid}_QUESTIONS`

  const [question, setQuestion] = createSignal<Chat | null>(null)

  const storeQuestions = (allQuestions: Chat[]) => {
    localStorage.setItem(storageKey, JSON.stringify(allQuestions))
  }

  const updateLastHistory = (question: Chat) => {
    const history = getHistory()
    history.pop()
    storeQuestions([...history, question])
  }

  const getHistory = () => {
    const data = localStorage.getItem(storageKey)

    if (data) {
      const questions = JSON.parse(data)

      return questions as Chat[]
    }

    return []
  }

  const updateAnswer = (answer: string) => {
    const oldQ = question()

    if (oldQ === null) return

    const updatedQuestion: Chat = {
      question: oldQ.question,
      answer: oldQ.answer + answer,
      resources: oldQ.resources,
    }

    setQuestion(updatedQuestion)

    updateLastHistory(updatedQuestion)
  }

  const createQuestion = (question: string) => {
    const q: Chat = {
      question: question,
      answer: '',
      resources: {
        fact: [],
        iframe: [],
        picture: [],
        link: [],
        video: [],
      },
    }

    setQuestion(q)

    storeQuestions([...getHistory(), q])
  }

  const clear = () => {
    setQuestion(null)
    localStorage.removeItem(storageKey)
  }

  const handleFacts = (source: string, facts: SourceFact[]) => {
    const oldQ = question()

    if (oldQ === null) return

    const factElements: ContextualElement[] = facts.map((f) => ({
      id: f.id,
      source,
      type: ContextualElementType.FACT,
      value: f.value,
      header: f.name,
    }))

    const allFacts = [...oldQ.resources.fact, ...factElements]

    const uniqFactElements = uniqBy(allFacts, 'id')

    const updatedQ: Chat = {
      ...oldQ,
      resources: {
        ...oldQ.resources,
        fact: uniqFactElements,
      },
    }

    setQuestion(updatedQ)

    updateLastHistory(updatedQ)
  }

  const handleLinkedResources = (source: string, linkedResources: SourceResource[]) => {
    const oldQ = question()

    if (oldQ === null) return

    const resources = linkedResources.reduce<Resources>((acc, resource) => {
      const { link, description, type } = resource

      const resourcesOfType = acc[type as keyof Resources]

      if (resourcesOfType.find((el) => el.id === link)) return acc

      resourcesOfType.push({
        id: link,
        value: link,
        description,
        type: type as ContextualElementType,
        source,
      })

      return {
        ...acc,
        [type]: resourcesOfType,
      }
    }, oldQ.resources)

    const updatedQ = {
      ...oldQ,
      resources,
    }

    setQuestion(updatedQ)

    updateLastHistory(updatedQ)
  }

  const handleSourceDocuments = (documents: SourceDocument[]) => {
    if (!documents) return
    if (documents.length === 0) return

    documents.forEach((doc) => {
      const { facts, linked_resources } = doc.metadata

      handleFacts(doc.metadata.source, facts)
      handleLinkedResources(doc.metadata.source, linked_resources)
    })
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
    handleSourceDocuments,
    clear,
  }
}
