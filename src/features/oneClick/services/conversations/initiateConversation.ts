import { authStore } from '@/features/authentication'
import {
  Channel,
  FraiaDBAction,
  FraiaDBCollections,
  HandleFraiaDBInput,
  HandleFraiaDBMutation,
  mutations,
} from '@/graphql'
import { GraphQLQuery } from '@aws-amplify/api'
import { API } from 'aws-amplify'
import { RoutingStreamObject } from '../../hooks/useLLM/utils'
import { oneClickActions } from '../../store/oneClickStore'

const COLLECTION_ID = FraiaDBCollections.CONVERSATIONS

interface InitiateConversationPayload {
  user_id: string
  knowledge_base_id: string
  greeting_message?: string
}

export interface InitiateConversationResponse {
  conversationId: string
  avatarConfig: RoutingStreamObject
}

export const initiateConversation = async (
  knowledgeBase: Channel,
): Promise<InitiateConversationResponse> => {
  const sessionId = authStore.sessionId

  // Check if the welcome message should be displayed
  const greetingMessage = oneClickActions.getChatInitiationMessage(knowledgeBase)

  // Prepare the payload
  const payload: InitiateConversationPayload = {
    user_id: sessionId,
    knowledge_base_id: knowledgeBase.id,
    greeting_message: greetingMessage || undefined,
  }

  const input: HandleFraiaDBInput = {
    collection: COLLECTION_ID,
    action: FraiaDBAction.INITIATE,
    data: JSON.stringify(payload),
  }

  const { data } = await API.graphql<GraphQLQuery<HandleFraiaDBMutation>>({
    query: mutations.handleFraiaDB,
    variables: { input },
    authMode: authStore.authMode,
  })

  const body: InitiateConversationResponse = JSON.parse(data?.handleFraiaDB as string)

  return body
}
