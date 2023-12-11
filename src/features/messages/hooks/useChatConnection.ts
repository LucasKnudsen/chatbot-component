import { botStoreActions } from '@/features/bot'
import { SubscriptionEvent } from '@/models'
import { SubscriptionHelper, clearAllSubscriptions, logDev } from '@/utils'
import { Accessor, createEffect, on, onCleanup } from 'solid-js'
import { ChatResponse } from '../types'

export function useChatConnection({
  chatId,
  isChatFlowAvailableToStream,
  fetchSuggestedPrompts,
}: {
  chatId: Accessor<string>
  isChatFlowAvailableToStream: Accessor<boolean>
  fetchSuggestedPrompts: (language?: string) => void
}) {
  createEffect(
    on(chatId, (chatId) => {
      if (!chatId) {
        console.warn('No chatId')
        return
      }

      logDev('Initiated subscription', chatId)

      const onNext = (data: SubscriptionEvent) => {
        const response = JSON.parse(data.data) as ChatResponse
        // If the chatflow is not available to stream, we update the answer here
        if (!isChatFlowAvailableToStream()) {
          botStoreActions.updateAnswer(response.text)
        }

        // Uses the source documents from the end result rather than sockets (they are the same, and doesnt stream in anyway)
        botStoreActions.handleSourceDocuments(response.sourceDocuments)

        // Saves end answer in history rather than at every stream update
        botStoreActions.updateHistoryAnswer(response.text)

        botStoreActions.setLoading(false)
        fetchSuggestedPrompts()
      }

      try {
        SubscriptionHelper<SubscriptionEvent>({
          query: 'subscribe2channel',
          variables: { sessionId: chatId },
          cache: {
            key: chatId,
            type: 'chat-answers',
          },
          onNext,
        })
      } catch (error) {
        console.log(error)
      }
    })
  )

  onCleanup(() => {
    clearAllSubscriptions()
  })

  return null
}
