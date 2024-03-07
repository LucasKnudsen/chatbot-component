import { authStore } from '@/features/authentication'
import { SourceDocument, SourceFact, SourceResource } from '@/features/contextual'
import { initLLMStream } from '@/features/messages'
import { configStore } from '@/features/portal-init'
import { translate } from '@/features/text'
import {
  Channel,
  ChannelDocument,
  ChannelHistoryItem,
  ChannelUserAccess,
  ContextualElement,
  ContextualElementType,
} from '@/graphql'
import { parseProxy } from '@/utils'
import { uniqBy } from 'lodash'
import { createStore, reconcile } from 'solid-js/store'
import { SYSTEM_DEFAULT_LANGUAGE, fetchChannelHistory } from '..'

type ExtendedSourceFact = SourceFact & { source: string }
type ExtendedSourceResource = SourceResource & { source: string }

type ActiveChannelType = Channel & {
  history: ChannelHistoryItem[]
  library: ChannelDocument[]
  access?: ChannelUserAccess
  activeChat?: Partial<ChannelHistoryItem> | null
}

type BotStore = {
  activeChannel: ActiveChannelType | null
  channels: Channel[]
  isAwaitingAnswer: boolean
  isSidebarOpen: boolean
  readonly storageKey: string
  readonly activeHistory: ChannelHistoryItem[]
  readonly activeFacts: ContextualElement[]
  readonly activeContextuals: ContextualElement[]
  readonly activeAnswer: string
  toggleSidebar: () => void
}

const [botStore, setBotStore] = createStore<BotStore>({
  activeChannel: null,
  channels: [],
  isAwaitingAnswer: false,
  isSidebarOpen: false,

  get storageKey() {
    if (!this.activeChannel) {
      console.error('No active channel')
      return ''
    }

    return `${this.activeChannel.chatflowId}_QUESTIONS`
  },

  get activeHistory() {
    return this.activeChannel?.history || []
  },

  get activeFacts() {
    const chat = this.activeChannel?.activeChat as ChannelHistoryItem
    if (!chat) return []

    return chat.resources?.filter((el) => el.type === ContextualElementType.fact) || []
  },

  get activeContextuals() {
    const chat = this.activeChannel?.activeChat as ChannelHistoryItem
    if (!chat) return []

    return chat.resources?.filter((el) => el.type !== ContextualElementType.fact) || []
  },

  get activeAnswer() {
    const chat = this.activeChannel?.activeChat as ChannelHistoryItem
    if (!chat) return ''

    return chat.answer || ''
  },

  toggleSidebar: () => {
    setBotStore('isSidebarOpen', (isOpen) => !isOpen)
  },
})

const initBotStore = async (channel: Channel) => {
  let history: ChannelHistoryItem[] = []

  if (authStore.sessionId) {
    // Fetch history from API
    ;[history] = await Promise.all([
      fetchChannelHistory(channel.id, authStore.sessionId),
      // initiateChatConnection(channel.id),
      initLLMStream(channel),
    ])
  } else {
    // Check and load history from local storage
    history = getLocalHistory()
    await Promise.all([initLLMStream(channel)])
  }

  setBotStore({
    activeChannel: {
      ...channel,
      history,
      library: [],
      access: undefined,
      activeChat: undefined,
    },
  })
}

const getLocalHistory = () => {
  const data = localStorage.getItem(botStore.storageKey)

  if (data) {
    const questions = JSON.parse(data)

    return questions as ChannelHistoryItem[]
  }

  return []
}

const storeLocalHistory = (history: ChannelHistoryItem[]) => {
  localStorage.setItem(botStore.storageKey, JSON.stringify(history))
}

const addToHistory = (item: ChannelHistoryItem) => {
  setBotStore('activeChannel', 'history', (prev) => {
    const newHistory = [...prev, item]

    storeLocalHistory(newHistory)

    return parseProxy(newHistory)
  })
}

// const updateHistory = (chat: ChannelHistoryItem) => {
//   setBotStore('activeChannel', 'history', (prev) => {
//     prev.pop()

//     const newHistory = [...prev, chat]

//     storeLocalHistory(newHistory)
//     return newHistory
//   })
// }

// const updateAnswerInHistory = (answer: string) => {
//   const activeChat = botStore.activeChannel?.activeChat

//   if (activeChat == null) return

//   const updatedChat = {
//     ...activeChat,
//     answer: activeChat.answer + answer,
//   }

//   updateHistory(parseProxy(updatedChat))
// }

const updateAnswer = (answer: string, shouldOverrideAnswer: boolean = false) => {
  const activeChat = botStore.activeChannel?.activeChat

  if (activeChat == null) return

  setBotStore(
    'activeChannel',
    'activeChat',
    'answer',
    shouldOverrideAnswer ? answer : activeChat.answer + answer
  )

  return
}

const buildQuestion = (question: string) => {
  const ownerId = authStore.sessionId
  const channelId = botStore.activeChannel?.id

  if (!ownerId || !channelId) throw new Error('No owner or channel id')

  const newHistoryItem: Partial<ChannelHistoryItem> = {
    ownerId,
    channelId,
    timestamp: new Date().toISOString(),
    question: question,
    answer: '',
    resources: [],
    updatedAt: new Date().toISOString(),
  }

  setActiveChat(newHistoryItem)
}

const handleFacts = async (facts: ExtendedSourceFact[]) => {
  const activeChat = botStore.activeChannel?.activeChat

  if (activeChat == null) return

  let factElements: ContextualElement[] = facts.map((f) => ({
    id: f.id,
    source: f.source,
    type: ContextualElementType.fact,
    value: f.value,
    header: f.name,
    __typename: 'ContextualElement',
  }))

  setBotStore(
    'activeChannel',
    'activeChat',
    'resources',
    factElements.map((f) => ({
      ...f,
      value: '',
      header: '',
    }))
  )

  factElements = await Promise.all(
    factElements.map(async (f) => {
      const parsedValue = Array.isArray(f.value) ? f.value.join(', ') : f.value

      const encodedText = `${f.header} | ${parsedValue}`
      const translatedText = await translate(
        encodedText,
        configStore.chatSpaceConfig.defaultLanguage || SYSTEM_DEFAULT_LANGUAGE
      )

      const [header, value] = translatedText.split('|')

      return {
        ...f,
        value,
        header,
      }
    })
  )

  setBotStore('activeChannel', 'activeChat', 'resources', factElements)

  // updateHistory(parseProxy(botStore.activeChannel?.activeChat!))
}

const handleLinkedResources = async (linkedResources: ExtendedSourceResource[]) => {
  const activeChat = botStore.activeChannel?.activeChat

  if (activeChat == null) return

  const contextualElements: ContextualElement[] = linkedResources.map((r) => ({
    id: r.id,
    source: r.source,
    type: r.type as ContextualElementType,
    value: r.link,
    header: r.description,
    __typename: 'ContextualElement',
  }))

  const uniqueElements = uniqBy(contextualElements, 'id')

  setBotStore('activeChannel', 'activeChat', 'resources', (prev) => ({
    ...prev,
    ...uniqueElements,
  }))

  // updateHistory(parseProxy(botStore.activeChannel?.activeChat!))
}

const handleSourceDocuments = async (documents: SourceDocument[]) => {
  if (!documents) return
  if (documents.length === 0) return

  const uniqueFacts: ExtendedSourceFact[] = []
  const uniqueResources: ExtendedSourceResource[] = []

  documents.forEach((doc) => {
    const { facts, linked_resources, source } = doc.metadata

    facts?.forEach((fact) => {
      const existingFact = uniqueFacts.find((f) => f.id === fact.id)
      if (!existingFact) {
        uniqueFacts.push({ ...fact, source })
      }
    })

    linked_resources?.forEach((resource) => {
      const existingResource = uniqueResources.find((r) => r.id === resource.id)
      if (!existingResource) {
        uniqueResources.push({ ...resource, source })
      }
    })
  })

  await handleLinkedResources(uniqueResources)
  await handleFacts(uniqueFacts)
}

const setActiveChat = (chat: Partial<ChannelHistoryItem> | null) => {
  console.log('Setting active chat: ', chat)
  setBotStore('activeChannel', 'activeChat', reconcile(parseProxy(chat)))
}

const setLoading = (loading: boolean) => {
  setBotStore('isAwaitingAnswer', loading)
}

const resetActiveChannel = () => {
  setBotStore('activeChannel', null)
}

const clear = () => {
  // setBotStore('chat', null)
  // setBotStore('history', [])
  localStorage.removeItem(botStore.storageKey)
}

const botStoreActions = {
  initBotStore,
  updateAnswer,
  addToHistory,
  setBotStore,
  buildQuestion,
  setActiveChat,
  resetActiveChannel,
  handleSourceDocuments,
  setLoading,
  clear,
}

export { botStore, botStoreActions }
