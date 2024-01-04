import {
  Channel,
  GetChannelQuery,
  GetChannelQueryVariables,
  ListChannelsQuery,
  ListChannelsQueryVariables,
  queries,
} from '@/graphql'

import { GraphQLQuery } from '@aws-amplify/api'
import { API } from 'aws-amplify'
import { BotProps } from '.'

export async function fetchChannels(props: BotProps): Promise<Channel[] | undefined> {
  if (props.isMultiChannel) {
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
      authMode: 'AWS_IAM',
    })

    return result.data?.listChannels?.items
  } else {
    if (!props.defaultChannelId) return

    const variables: GetChannelQueryVariables = {
      chatSpaceId: props.id,
      id: props.defaultChannelId,
    }

    const result = await API.graphql<GraphQLQuery<GetChannelQuery>>({
      query: queries.getChannel,
      variables,
      authMode: 'AWS_IAM',
    })

    return [result.data?.getChannel!]
  }
}
