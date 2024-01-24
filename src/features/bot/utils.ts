import {
  Channel,
  ChannelUserAccess,
  ChatSpace,
  ListChannelUserAccessesQuery,
  ListChannelUserAccessesQueryVariables,
  queries,
} from '@/graphql'
import { logDev } from '@/utils'

import { GraphQLQuery } from '@aws-amplify/api'
import { API } from 'aws-amplify'

export async function fetchChannels(props: ChatSpace): Promise<Channel[] | undefined> {
  // Query custom Lambda resolver

  return []
}

export async function fetchChannelAccesses(
  userId: string,
  chatSpace: ChatSpace
): Promise<ChannelUserAccess[] | undefined> {
  // If HostType is PRIVATE, it means that the individual User is in focus.
  // If HostType is COMPANY, it means that its a centralized chat portal, made by an organization.

  const variables: ListChannelUserAccessesQueryVariables = {
    accessId: userId,
    filter: {
      chatSpaceId: { eq: chatSpace.id },
    },
  }

  try {
    const result = await API.graphql<GraphQLQuery<ListChannelUserAccessesQuery>>({
      query: queries.listChannelUserAccesses,
      variables,
    })

    const items = (result.data?.listChannelUserAccesses?.items as ChannelUserAccess[]) ?? []

    return items
  } catch (error) {
    logDev(error)
  }
}

export async function fetchChannelDetails(channelId: string): Promise<Channel> {
  // Query custom Lambda resolver

  await new Promise((resolve) => setTimeout(resolve, 1000))

  throw new Error('Not implemented')
}
