import {
  ContextualElement,
  ContextualElementType,
  Resources,
  SourceDocument,
  SourceFact,
  SourceResource,
} from '@/features/contextual'
import { Chat } from '@/features/messages/types'
import { translate } from '@/features/text'
import { parseProxy, randomUUID } from '@/utils'
import { uniqBy } from 'lodash'
import { createStore } from 'solid-js/store'

type ExtendedSourceFact = SourceFact & { source: string }
type ExtendedSourceResource = SourceResource & { source: string }

type BotStore = {
  chatflowId: string
  chat: Chat | null
  history: Chat[]
  loading: boolean
  clientLanguage?: string
  readonly storageKey: string
  readonly hasResources: boolean
}

const [botStore, setBotStore] = createStore<BotStore>({
  chatflowId: '',
  chat: null,
  history: [],
  loading: false,
  clientLanguage: undefined,
  get storageKey() {
    return `${this.chatflowId}_QUESTIONS`
  },
  get hasResources() {
    const q = this.chat
    if (!q) return false

    const anyResourceExists = Object.keys(q.resources).some(
      (key) => q.resources[key as ContextualElementType].length > 0
    )

    return anyResourceExists
  },
})

const initBotStore = (chatflowId: string, clientLanguage?: string) => {
  // init chatflowId and clientLanguage first so that getStoredHistory uses correct storageKey
  setBotStore({
    chatflowId,
    clientLanguage,
  })

  const history = getStoredHistory()

  setBotStore({
    history,
    chatflowId,
    clientLanguage,
  })
}

const getStoredHistory = () => {
  const data = localStorage.getItem(botStore.storageKey)

  if (data) {
    const questions = JSON.parse(data)

    return questions as Chat[]
  }

  return []
}

const storeHistory = (history: Chat[]) => {
  localStorage.setItem(botStore.storageKey, JSON.stringify(history))
}

const addHistory = (newQuestion: Chat) => {
  setBotStore('history', (prev) => {
    const newHistory = [...prev, newQuestion]
    storeHistory(newHistory)
    return newHistory
  })
}

const updateHistory = (chat: Chat) => {
  setBotStore('history', (prev) => {
    prev.pop()

    const newHistory = [...prev, chat]

    storeHistory(newHistory)
    return newHistory
  })
}

const buildUpdatedAnswer = (oldQ: Chat, answer: string) => {
  return {
    ...oldQ,
    answer: oldQ.answer + answer,
  }
}

const updateHistoryAnswer = (answer: string) => {
  const oldQ = botStore.chat

  if (oldQ === null) return

  updateHistory(buildUpdatedAnswer(parseProxy(oldQ), answer))
}

const updateAnswer = (answer: string) => {
  const oldQ = botStore.chat

  if (oldQ === null) return

  setChat(buildUpdatedAnswer(oldQ, answer))
}

const buildQuestion = (question: string, id: string) => {
  const q: Chat = {
    id,
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

  return q
}

const createQuestion = (question: string) => {
  const uuid = randomUUID()

  setChat(buildQuestion(question, uuid))
  addHistory(buildQuestion(question, uuid))
}

const handleFacts = async (facts: ExtendedSourceFact[]) => {
  const oldQ = botStore.chat

  if (oldQ === null) return

  let factElements: ContextualElement[] = facts.map((f) => ({
    id: f.id,
    source: f.source,
    type: ContextualElementType.FACT,
    value: f.value,
    header: f.name,
  }))

  setBotStore(
    'chat',
    'resources',
    'fact',
    factElements.map((f) => ({
      ...f,
      value: '',
      header: '',
    }))
  )

  factElements = await Promise.all(
    factElements.map(async (f) => {
      if (import.meta.env.DEV) return f

      const parsedValue = Array.isArray(f.value) ? f.value.join(', ') : f.value

      const encodedText = `${f.header} | ${parsedValue}`
      const translatedText = await translate(encodedText, botStore.clientLanguage)

      const [header, value] = translatedText.split('|')

      return {
        ...f,
        value,
        header,
      }
    })
  )

  setBotStore('chat', 'resources', 'fact', factElements)

  updateHistory(parseProxy(botStore.chat!))
}

const handleLinkedResources = async (linkedResources: ExtendedSourceResource[]) => {
  const oldQ = botStore.chat

  if (oldQ === null) return

  const resources = linkedResources.reduce<Resources>((acc, resource) => {
    const { link, description, type, id, thumbnail } = resource

    // duplicate existing resources of type
    const resourcesOfType = [
      ...acc[type as keyof Resources],
      {
        id,
        value: link,
        description,
        type: type as ContextualElementType,
        source: resource.source,
        thumbnail,
      },
    ]

    const uniqResourcesOfType = uniqBy(resourcesOfType, 'id')

    return {
      ...acc,
      [type]: uniqResourcesOfType,
    }
  }, oldQ.resources)

  setBotStore('chat', 'resources', (prev) => ({ ...prev, ...resources }))

  updateHistory(parseProxy(botStore.chat!))
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

const setChat = (chat: Chat) => {
  setBotStore('chat', chat)
}

const setLoading = (loading: boolean) => {
  setBotStore('loading', loading)
}

const clear = () => {
  setBotStore('chat', null)
  setBotStore('history', [])
  localStorage.removeItem(botStore.storageKey)
}

const botStoreActions = {
  initBotStore,
  updateAnswer,
  updateHistoryAnswer,
  createQuestion,
  setChat,
  handleSourceDocuments,
  setLoading,
  clear,
}

export { botStore, botStoreActions }
