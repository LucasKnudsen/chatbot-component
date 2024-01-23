import {
  Channel,
  ChannelUserAccess,
  ChatSpace,
  ChatSpaceHostType,
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
  // If HostType is HUB, it means that the individual User is in focus.
  // If HostType is PORTAL, it means that its a centralized chat portal, made by an organization.
  const conditionalAccessId =
    chatSpace.hostType === ChatSpaceHostType.HUB
      ? `${userId}#_#_`
      : `${userId}#${chatSpace.id}#${chatSpace.hostId}`

  const variables: ListChannelUserAccessesQueryVariables = {
    accessId: conditionalAccessId,
  }

  try {
    const result = await API.graphql<GraphQLQuery<ListChannelUserAccessesQuery>>({
      query: queries.listChannelUserAccesses,
      variables,
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })

    const items = (result.data?.listChannelUserAccesses?.items as ChannelUserAccess[]) ?? []

    return items
  } catch (error) {
    logDev(error)
  }
}

export async function fetchChannelDetails(channelId: string): Promise<Channel | undefined> {
  // Query custom Lambda resolver

  return undefined
}
