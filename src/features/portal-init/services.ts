import { Channel, ChatSpace, FetchChannelsQuery, GetChatSpaceQuery, queries } from '@/graphql'
import { GraphQLQuery } from '@aws-amplify/api'

import { API } from 'aws-amplify'
import { authStore, getAuthMode } from '../authentication'

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

export async function fetchChannelDetails(channelId: string): Promise<Channel> {
  const { data } = await API.graphql<GraphQLQuery<FetchChannelsQuery>>({
    query: queries.fetchChannels,
    variables: {
      input: {
        flow: 'BY_ID',
        channelId,
      },
    },
    authMode: authStore.authMode,
  })

  if (!data?.fetchChannels?.[0]) {
    throw new Error('No Channel returned')
  }

  return data?.fetchChannels?.[0]
}

export async function fetchPublicChannels(chatSpaceId: string): Promise<Channel[]> {
  const { data } = await API.graphql<GraphQLQuery<FetchChannelsQuery>>({
    query: queries.fetchChannels,

    variables: {
      input: {
        flow: 'BY_CHAT_SPACE',
        chatSpaceId,
      },
      filter: {
        isPublic: {
          eq: true,
        },
      },
    },
    authMode: authStore.authMode,
  })

  return (data?.fetchChannels as Channel[]) || []
}
