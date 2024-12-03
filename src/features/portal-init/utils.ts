import { ChatSpace, GetChatSpaceQuery, queries } from '@/graphql'
import { GraphQLQuery } from '@aws-amplify/api'

import { API } from 'aws-amplify'
import { getAuthMode } from '../authentication'

export async function initializeConfig(spaceId: string): Promise<ChatSpace> {
  const result = await API.graphql<GraphQLQuery<GetChatSpaceQuery>>({
    query: queries.getChatSpace,
    variables: {
      id: spaceId,
    },
    authMode: await getAuthMode(),
  })

  const data = result.data?.getChatSpace

  if (!data) {
    throw new Error('CHAT_SPACE_NOT_FOUND')
  }

  return data
}
