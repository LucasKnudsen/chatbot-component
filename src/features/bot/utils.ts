import {
  Channel,
  GetChannelQuery,
  GetChannelQueryVariables,
  ListChannelsQuery,
  ListChannelsQueryVariables,
  queries,
} from '@/graphql'

import { GraphQLQuery } from '@aws-amplify/api'
import { API, Auth } from 'aws-amplify'
import { BotProps } from '.'

export async function fetchChannels(props: BotProps): Promise<Channel[] | undefined> {
  let isUser = false
  try {
    isUser = Boolean(await Auth.currentAuthenticatedUser())
  } catch (error) {}

  if (props.isMultiChannel) {
    // Fetches all live channels
    const variables: ListChannelsQueryVariables = {
      chatSpaceId: props.id,
      filter: {
        isLive: {
          eq: true,
        },
      },
    }

    const result = await API.graphql<GraphQLQuery<ListChannelsQuery>>({
      query: queries.listChannels,
      variables,
      authMode: isUser ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
    })

    return result.data?.listChannels?.items as Channel[] | undefined
  } else {
    // Fetches the default channel
    if (!props.defaultChannelId) return

    const variables: GetChannelQueryVariables = {
      chatSpaceId: props.id,
      id: props.defaultChannelId,
    }

    const result = await API.graphql<GraphQLQuery<GetChannelQuery>>({
      query: queries.getChannel,
      variables,
      authMode: isUser ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
    })

    return [result.data?.getChannel!]
  }
}
