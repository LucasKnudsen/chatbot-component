import {
  Channel,
  ChannelHistoryItem,
  ChannelUserAccess,
  CreateChannelHistoryItemInput,
  CreateChannelHistoryItemMutation,
  FetchChannelsQuery,
  ListChannelHistoryItemsQuery,
  ListChannelHistoryItemsQueryVariables,
  ListChannelUserAccessesQuery,
  ListChannelUserAccessesQueryVariables,
  mutations,
  queries,
} from '@/graphql'
import { logDev, removeTypenameFromInput } from '@/utils'

import { GraphQLQuery } from '@aws-amplify/api'
import { API, Auth } from 'aws-amplify'
import { botStoreActions } from '.'

export async function fetchPublicChannels(chatSpaceId: string): Promise<Channel[]> {
  const { data } = await API.graphql<GraphQLQuery<FetchChannelsQuery>>({
    query: queries.fetchChannels,
    variables: {
      input: {
        flow: 'BY_CHAT_SPACE',
        chatSpaceId,
      },
    },
    authMode: 'AWS_IAM',
  })

  return (data?.fetchChannels as Channel[]) || []
}

export async function fetchChannelAccesses(
  userId: string,
  chatSpaceId: string
): Promise<ChannelUserAccess[]> {
  // If HostType is PRIVATE, it means that the individual User is in focus.
  // If HostType is COMPANY, it means that its a centralized chat portal, made by an organization.

  const variables: ListChannelUserAccessesQueryVariables = {
    accessId: userId,
    filter: {
      chatSpaceId: { eq: chatSpaceId },
    },
  }

  try {
    const result = await API.graphql<GraphQLQuery<ListChannelUserAccessesQuery>>({
      query: queries.listChannelUserAccesses,
      variables,
    })

    const items = (result.data?.listChannelUserAccesses?.items as ChannelUserAccess[]) || []

    return items
  } catch (error) {
    logDev('Fetching channel accesses ', error)
    throw new Error('Error fetching channel accesses')
  }
}

export async function fetchChannelDetails(channelId: string): Promise<Channel> {
  const { data } = await API.graphql<GraphQLQuery<FetchChannelsQuery>>({
    query: queries.fetchChannels,
    variables: {
      input: {
        flow: 'BY_ID',
        channelId,
      },
    },
  })

  if (!data?.fetchChannels?.[0]) {
    throw new Error('No Channel returned')
  }

  return data?.fetchChannels?.[0]
}

export async function fetchChannelHistory(
  channelId: string,
  userId: string
): Promise<ChannelHistoryItem[]> {
  const variables: ListChannelHistoryItemsQueryVariables = {
    ownerId: userId,
    channelIdTimestamp: {
      beginsWith: {
        channelId,
      },
    },
  }
  const { data } = await API.graphql<GraphQLQuery<ListChannelHistoryItemsQuery>>({
    query: queries.listChannelHistoryItems,
    variables,
  })

  const history = (data?.listChannelHistoryItems?.items as ChannelHistoryItem[]) || []

  return history
}

export async function createHistoryRecord(
  input: Partial<CreateChannelHistoryItemInput>
): Promise<ChannelHistoryItem> {
  input = removeTypenameFromInput(input)

  logDev('createHistoryRecord', input)

  let authMode: 'AMAZON_COGNITO_USER_POOLS' | 'AWS_IAM' = 'AMAZON_COGNITO_USER_POOLS'

  try {
    await Auth.currentAuthenticatedUser()
  } catch (error) {
    authMode = 'AWS_IAM'
  }

  const { data } = await API.graphql<GraphQLQuery<CreateChannelHistoryItemMutation>>({
    query: mutations.createChannelHistoryItem,
    variables: {
      input,
    },
    authMode,
  })

  const history = (data?.createChannelHistoryItem as ChannelHistoryItem) || null

  botStoreActions.addToHistory(history)

  return history
}
