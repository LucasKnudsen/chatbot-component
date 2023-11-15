import { Accessor, createSignal, onMount } from 'solid-js'
import { ContextualElement, ContextualElementType, SourceDocument } from '..'

type Props = {
  chatflowid: string
  chatId: Accessor<string>
}

export const useContextualElements = (props: Props) => {
  const contextStorageKey = `${props.chatflowid}_CONTEXT`

  const [contextualElements, setContextualElements] = createSignal<ContextualElement[]>([])

  onMount(() => {
    const contextHistory = localStorage.getItem(contextStorageKey)

    if (contextHistory) {
      const contextHistoryObj = JSON.parse(contextHistory)

      if (contextHistoryObj) setContextualElements(contextHistoryObj.contextHistory)
    }
  })

  const saveHistory = () => {
    localStorage.setItem(
      contextStorageKey,
      JSON.stringify({ chatId: props.chatId(), contextHistory: contextualElements() })
    )
  }

  const handleSourceDocuments = (documents: SourceDocument[]) => {
    if (!documents) return
    if (documents.length === 0) return

    console.log('From socket: ', documents)
    handleFacts(documents)
    handleLinkedResources(documents)
  }

  const handleFacts = (documents: SourceDocument[]) => {
    documents.forEach((doc) => {
      doc.metadata.facts.forEach((fact, index) => {
        const { id, name, value } = fact

        // Add elements with 0.5 second delay
        setTimeout(() => {
          setContextualElements((prev) => {
            // Return if element already exists
            if (prev.find((el) => el.id === id)) return prev

            return [
              ...prev,

              {
                id,
                value,
                type: ContextualElementType.FACT,
                source: doc.metadata.source,
                header: name,
              },
            ]
          })

          saveHistory()
        }, 500 * index)
      })
    })
  }

  const handleLinkedResources = (documents: SourceDocument[]) => {
    documents.forEach((doc) => {
      doc.metadata.linked_resources.forEach((resource, index) => {
        const { link, type, description } = resource

        // Add elements with 0.5 second delay
        setTimeout(() => {
          setContextualElements((prev) => {
            // Return if element already exists
            if (prev.find((el) => el.id === link && el.type === type)) return prev

            return [
              ...prev,

              {
                id: link,
                value: link,
                description,
                type: type as ContextualElementType,
                source: doc.metadata.source,
              },
            ]
          })

          saveHistory()
        }, 500 * index)
      })
    })
  }

  return { handleSourceDocuments, contextualElements, setContextualElements }
}
