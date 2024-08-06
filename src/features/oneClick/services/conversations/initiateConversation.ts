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
import { oneClickStore } from '../../store/oneClickStore'

const COLLECTION_ID = FraiaDBCollections.CONVERSATIONS

interface RequestPayload {
  user_id: string
  knowledge_base_id: string
  greeting_message: string
}

export const initiateConversation = async (knowledgeBaseId: string) => {
  const sessionId = authStore.sessionId
  const text = configStore.chatSpaceConfig.text

  const greetingMessage =
    text?.welcomeMessage && oneClickStore.shouldWelcome
      ? text.welcomeMessage
      : text!.returnWelcomeMessage || text!.welcomeMessage || ''

  const payload: RequestPayload = {
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

  const body: { conversationId: string } = JSON.parse(data?.handleFraiaDB as string)

  console.log(body)

  return body.conversationId
}
