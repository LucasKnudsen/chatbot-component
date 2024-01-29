import { botStoreActions } from '@/features/bot'
import { suggestedPromptsStoreActions } from '@/features/prompt'
import { SubscriptionEvent } from '@/models'
import { SubscriptionHelper, clearAllSubscriptions, clearSubscription, logDev } from '@/utils'
import { Accessor, createEffect, on, onCleanup } from 'solid-js'
import { ChatResponse } from '../types'

export function useChatConnection({
  chatId,
  isChatFlowAvailableToStream,
}: {
  chatId: Accessor<string>
  isChatFlowAvailableToStream: Accessor<boolean>
}) {
  onCleanup(clearAllSubscriptions)

  createEffect(
    on(chatId, (chatId, previousChatId) => {
      const cacheName = 'chat-answers'

      if (chatId) {
        console.warn('No chatId')
        return
      }

      if (previousChatId && chatId !== previousChatId) {
        clearSubscription(previousChatId, cacheName) // Clear previous subscription if exists
      }

      logDev('Initiated chat sub', chatId)

      const onNext = (data: SubscriptionEvent) => {
        logDev('Subscription event', data)
        const response = JSON.parse(data.data) as ChatResponse
        // If the chatflow is not available to stream, we update the answer here
        if (!isChatFlowAvailableToStream()) {
          botStoreActions.updateAnswer(response.text)
        }

        // Uses the source documents from the end result rather than sockets (they are the same, and doesnt stream in anyway)
        botStoreActions.handleSourceDocuments(response.sourceDocuments)

        // Saves end answer in history rather than at every stream update
        botStoreActions.updateAnswerInHistory(response.text)

        botStoreActions.setLoading(false)
        suggestedPromptsStoreActions.fetch()
      }

      try {
        SubscriptionHelper<SubscriptionEvent>({
          query: 'subscribe2channel',
          variables: { sessionId: chatId },
          cache: {
            key: chatId,
            type: cacheName,
          },
          onNext,
        })
      } catch (error) {
        console.log(error)
      }
    })
  )

  return null
}
