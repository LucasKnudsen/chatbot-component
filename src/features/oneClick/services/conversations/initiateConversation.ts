import { authStore, getAuthMode } from '@/features/authentication'
import { configStore } from '@/features/portal-init'
import {
  FraiaDBAction,
  FraiaDBCollections,
  HandleFraiaDBInput,
  HandleFraiaDBMutation,
  mutations,
} from '@/graphql'
import { GraphQLQuery } from '@aws-amplify/api'
import { API } from 'aws-amplify'
import { RoutingStreamObject } from '../../hooks/useLLM/utils'
import { oneClickStore } from '../../store/oneClickStore'

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
  knowledgeBaseId: string
): Promise<InitiateConversationResponse> => {
  const sessionId = authStore.sessionId
  const text = configStore.chatSpaceConfig.text

  // Check if the welcome message should be displayed
  const greetingMessage =
    text?.welcomeMessage && oneClickStore.shouldWelcome
      ? text.welcomeMessage
      : text!.returnWelcomeMessage || text!.welcomeMessage || ''

  // Prepare the payload
  const payload: InitiateConversationPayload = {
    user_id: sessionId,
    knowledge_base_id: knowledgeBaseId,
    greeting_message: greetingMessage,
  }

  const input: HandleFraiaDBInput = {
    collection: COLLECTION_ID,
    action: FraiaDBAction.INITIATE,
    data: JSON.stringify(payload),
  }

  const { data } = await API.graphql<GraphQLQuery<HandleFraiaDBMutation>>({
    query: mutations.handleFraiaDB,
    variables: { input },
    authMode: await getAuthMode(),
  })

  const body: InitiateConversationResponse = JSON.parse(data?.handleFraiaDB as string)

  return body
}
