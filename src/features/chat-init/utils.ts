import { queries } from '@/graphql'
import { GetChatSpaceQuery } from '@/graphql/types'
import { GraphQLQuery } from '@aws-amplify/api'

import { API, Auth } from 'aws-amplify'

export async function initializeConfig(hostId: string, spaceId: string) {
  try {
    let isUser = false
    try {
      isUser = Boolean(await Auth.currentAuthenticatedUser())
    } catch (error) {}

    const result = await API.graphql<GraphQLQuery<GetChatSpaceQuery>>({
      query: queries.getChatSpace,
      variables: {
        ownerId: hostId,
        id: spaceId,
      },
      authMode: isUser ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
    })

    const data = result.data?.getChatSpace

    return {
      status: 200,
      data,
    }
  } catch (error) {
    console.log(error)
    // TODO: Handle error
    return {
      status: 500,
      data: null,
      error: 'NO_CONFIG',
    }
  }
}
