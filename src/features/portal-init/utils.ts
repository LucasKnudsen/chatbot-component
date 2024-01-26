import { ChatSpace, GetChatSpaceQuery, queries } from '@/graphql'
import { logDev } from '@/utils'
import { GraphQLQuery } from '@aws-amplify/api'

import { API, Auth } from 'aws-amplify'

export async function initializeConfig(spaceId: string): Promise<ChatSpace> {
  try {
    let isUser = false
    try {
      isUser = Boolean(await Auth.currentAuthenticatedUser())
    } catch (error) {}

    const result = await API.graphql<GraphQLQuery<GetChatSpaceQuery>>({
      query: queries.getChatSpace,
      variables: {
        id: spaceId,
      },
      authMode: isUser ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
    })

    const data = result.data?.getChatSpace

    if (!data) {
      throw new Error('CHAT_SPACE_NOT_FOUND')
    }

    return data
  } catch (error) {
    logDev('CHAT SPACE INIT ERROR', error)
    throw new Error('CHAT_SPACE_INIT_ERROR')
  }
}
