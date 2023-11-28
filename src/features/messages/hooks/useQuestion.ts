// import {
//   ContextualElement,
//   ContextualElementType,
//   Resources,
//   SourceDocument,
//   SourceFact,
//   SourceResource,
// } from '@/features/contextual'
// import { translate } from '@/features/text'
// import { createSignal, onMount } from 'solid-js'
// import { Chat } from '../types'

// type ExtendedSourceFact = SourceFact & { source: string }
// type ExtendedSourceResource = SourceResource & { source: string }

// const [question, setQuestion] = createSignal<Chat | null>(null)
// const [history, setHistory] = createSignal<Chat[]>([])

// export const useQuestion = (chatflowid: string, clientLanguage?: string) => {
//   const storageKey = `${chatflowid}_QUESTIONS`

//   // createEffect(() => {
//   //   localStorage.setItem(storageKey, JSON.stringify(history()))
//   // })

//   const handleFacts = async (facts: ExtendedSourceFact[]) => {
//     const oldQ = question()

//     if (oldQ === null) return

//     let factElements: ContextualElement[] = facts.map((f) => ({
//       id: f.id,
//       source: f.source,
//       type: ContextualElementType.FACT,
//       value: f.value,
//       header: f.name,
//     }))

//     factElements = await Promise.all(
//       factElements.map(async (f) => {
//         const encodedText = `${f.header} | ${f.value}`
//         const translatedText = await translate(encodedText, clientLanguage)

//         const [header, value] = translatedText.split('|')

//         return {
//           ...f,
//           value,
//           header,
//         }
//       })
//     )

//     const updatedQ: Chat = {
//       ...oldQ,
//       resources: {
//         ...oldQ.resources,
//         fact: factElements,
//       },
//     }

//     setQuestion(updatedQ)
//     updateHistory(updatedQ)
//   }

//   const handleLinkedResources = async (linkedResources: ExtendedSourceResource[]) => {
//     const oldQ = question()

//     if (oldQ === null) return

//     const resources = linkedResources.reduce<Resources>((acc, resource) => {
//       const { link, description, type, id, thumbnail } = resource

//       const resourcesOfType = acc[type as keyof Resources]

//       if (resourcesOfType.find((el) => el.id === link)) return acc

//       resourcesOfType.push({
//         id,
//         value: link,
//         description,
//         type: type as ContextualElementType,
//         source: resource.source,
//         thumbnail,
//       })

//       return {
//         ...acc,
//         [type]: resourcesOfType,
//       }
//     }, oldQ.resources)

//     const updatedQ = {
//       ...oldQ,
//       resources,
//     }

//     setQuestion(updatedQ)

//     updateHistory(updatedQ)
//   }

//   const handleSourceDocuments = async (documents: SourceDocument[]) => {
//     if (!documents) return
//     if (documents.length === 0) return

//     const uniqueFacts: ExtendedSourceFact[] = []
//     const uniqueResources: ExtendedSourceResource[] = []

//     documents.forEach((doc) => {
//       const { facts, linked_resources, source } = doc.metadata

//       facts.forEach((fact) => {
//         const existingFact = uniqueFacts.find((f) => f.id === fact.id)
//         if (!existingFact) {
//           uniqueFacts.push({ ...fact, source })
//         }
//       })

//       linked_resources.forEach((resource) => {
//         const existingResource = uniqueResources.find((r) => r.id === resource.id)
//         if (!existingResource) {
//           uniqueResources.push({ ...resource, source })
//         }
//       })
//     })

//     await handleLinkedResources(uniqueResources)
//     await handleFacts(uniqueFacts)
//   }

//   onMount(() => {
//     const storedHistory = getStoredHistory()
//     setHistory(storedHistory)

//     if (storedHistory.length > 0) {
//       setQuestion(storedHistory[storedHistory.length - 1])
//     }
//   })

//   return {
//     question,
//     history,
//     updateAnswer,
//     setQuestion,
//     createQuestion,
//     handleSourceDocuments,
//     clear,
//     hasResources,
//   }
// }
