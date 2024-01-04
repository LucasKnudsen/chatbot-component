import { queries } from '@/graphql'
import { GetChatSpaceQuery } from '@/graphql/types'
import { GraphQLQuery } from '@aws-amplify/api'

import { API } from 'aws-amplify'

export async function initializeConfig(hostId: string, spaceId: string) {
  try {
    const result = await API.graphql<GraphQLQuery<GetChatSpaceQuery>>({
      query: queries.getChatSpace,
      variables: {
        ownerId: hostId,
        id: spaceId,
      },
      authMode: 'AWS_IAM',
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
