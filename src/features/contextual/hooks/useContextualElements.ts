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

  const handleSourceDocuments = (documents: SourceDocument[]) => {
    if (!documents) return
    if (documents.length === 0) return

    console.log('From socket: ', documents)

    // Loops through documents and injects them into the contextual elements array
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

          localStorage.setItem(
            contextStorageKey,
            JSON.stringify({ chatId: props.chatId(), contextHistory: contextualElements() })
          )
        }, 500 * index)
      })
    })
  }

  return { handleSourceDocuments, contextualElements, setContextualElements }
}
