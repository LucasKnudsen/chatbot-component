import {
  ContextualElement,
  ContextualElementType,
  Resources,
  SourceDocument,
  SourceFact,
  SourceResource,
} from '@/features/contextual'
import { translate } from '@/features/text'
import { createEffect, createMemo, createSignal, onMount } from 'solid-js'
import { Chat } from '../types'

type ExtendedSourceFact = SourceFact & { source: string }
type ExtendedSourceResource = SourceResource & { source: string }

export const useQuestion = (chatflowid: string, clientLanguage?: string) => {
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

  const handleFacts = async (facts: ExtendedSourceFact[]) => {
    const oldQ = question()

    if (oldQ === null) return

    let factElements: ContextualElement[] = facts.map((f) => ({
      id: f.id,
      source: f.source,
      type: ContextualElementType.FACT,
      value: f.value,
      header: f.name,
    }))

    factElements = await Promise.all(
      factElements.map(async (f) => {
        if (import.meta.env.DEV) return f

        const encodedText = `${f.header} | ${f.value}`
        const translatedText = await translate(encodedText, clientLanguage)

        const [header, value] = translatedText.split('|')

        return {
          ...f,
          value,
          header,
        }
      })
    )

    const updatedQ: Chat = {
      ...oldQ,
      resources: {
        ...oldQ.resources,
        fact: factElements,
      },
    }

    setQuestion(updatedQ)
    updateHistory(updatedQ)
  }

  const handleLinkedResources = async (linkedResources: ExtendedSourceResource[]) => {
    const oldQ = question()

    if (oldQ === null) return

    const resources = linkedResources.reduce<Resources>((acc, resource) => {
      const { link, description, type, id, thumbnail } = resource

      const resourcesOfType = acc[type as keyof Resources]

      if (resourcesOfType.find((el) => el.id === link)) return acc

      resourcesOfType.push({
        id,
        value: link,
        description,
        type: type as ContextualElementType,
        source: resource.source,
        thumbnail,
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

  const handleSourceDocuments = async (documents: SourceDocument[]) => {
    if (!documents) return
    if (documents.length === 0) return

    const uniqueFacts: ExtendedSourceFact[] = []
    const uniqueResources: ExtendedSourceResource[] = []

    documents.forEach((doc) => {
      const { facts, linked_resources, source } = doc.metadata

      facts.forEach((fact) => {
        const existingFact = uniqueFacts.find((f) => f.id === fact.id)
        if (!existingFact) {
          uniqueFacts.push({ ...fact, source })
        }
      })

      linked_resources.forEach((resource) => {
        const existingResource = uniqueResources.find((r) => r.id === resource.id)
        if (!existingResource) {
          uniqueResources.push({ ...resource, source })
        }
      })
    })

    await handleLinkedResources(uniqueResources)
    await handleFacts(uniqueFacts)
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
