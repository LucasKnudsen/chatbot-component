import {
  ContextualElement,
  ContextualElementType,
  Resources,
  SourceDocument,
  SourceFact,
  SourceResource,
} from '@/features/contextual'
import uniqBy from 'lodash/uniqBy'
import { createEffect, createMemo, createSignal, onMount } from 'solid-js'
import { Chat } from '../types'

export const useQuestion = (chatflowid: string) => {
  const storageKey = `${chatflowid}_QUESTIONS`

  const [question, setQuestion] = createSignal<Chat | null>(null)
  const [history, setHistory] = createSignal<Chat[]>(getStoredHistory())

  function getStoredHistory() {
    const data = localStorage.getItem(storageKey)

    if (data) {
      const questions = JSON.parse(data)

      return questions as Chat[]
    }

    return []
  }

  const addHistory = (question: Chat) => {
    setHistory((prev) => [...prev, question])
  }

  const updateHistory = (question: Chat) => {
    setHistory((prev) => {
      prev.pop()
      return [...prev, question]
    })
  }

  createEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(history()))
  })

  const updateAnswer = (answer: string) => {
    const oldQ = question()

    if (oldQ === null) return

    const updatedQuestion: Chat = {
      ...oldQ,
      answer: oldQ.answer + answer,
    }

    setQuestion(updatedQuestion)

    updateHistory(updatedQuestion)
  }

  const createQuestion = (question: string) => {
    const q: Chat = {
      createdAt: new Date().toISOString(),
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

    addHistory(q)
  }

  const hasResources = createMemo(() => {
    const q = question()
    if (!q) return false

    const anyResourceExists = Object.keys(q.resources).some(
      (key) => q.resources[key as ContextualElementType].length > 0
    )

    return anyResourceExists
  })

  const clear = () => {
    setQuestion(null)
    setHistory([])
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

    updateHistory(updatedQ)
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

    updateHistory(updatedQ)
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
    const historyData = history()

    if (historyData.length > 0) {
      setQuestion(historyData[historyData.length - 1])
    }
  })

  return {
    question,
    history,
    updateAnswer,
    setQuestion,
    createQuestion,
    handleSourceDocuments,
    clear,
    hasResources,
  }
}
