//@ts-nocheck

/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELTABLE_ARN
	API_DIGITALTWIN_CHANNELTABLE_NAME
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
	API_DIGITALTWIN_CHATSPACETABLE_ARN
	API_DIGITALTWIN_CHATSPACETABLE_NAME
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	AUTH_FRAIAAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { AppSyncResolverHandler } from 'aws-lambda'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const ddbService = new DynamoDBClient({ region: process.env.REGION })

import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb'
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

import { authorizeToken } from './authorizers'

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'BY_ID' | 'BY_CHAT_SPACE'
    channelId?: string
    chatSpaceId?: string
  }
}

export const handler: AppSyncResolverHandler<Arguments, any> = async (event) => {
  let isAuthorized = false
  console.time('HANDLER')

  try {
    const { isMock, input } = event.arguments
    !isMock && console.log(`EVENT`, event)

    let data: any

    switch (input.flow) {
      case 'BY_ID':
        isAuthorized = await authorizeToken(
          event.request.headers.authorization,
          async (identity) => {
            return await authorizeChannelAccess(identity, input.channelId!)
          }
        )

        if (!isAuthorized) {
          throw new Error('Unauthorized to fetch channel')
        }

        data = await fetchSingleChannel(input.channelId!)

        break

      case 'BY_CHAT_SPACE':
        const chatSpace = await getChatSpace(input.chatSpaceId!)

        if (!chatSpace.isPublic) {
          isAuthorized = await authorizeToken(
            event.request.headers.authorization,
            async (identity) => {
              return await authorizeAdminAccess(identity, chatSpace)
            }
          )

          if (!isAuthorized) {
            throw new Error('Unauthorized to fetch channels')
          }
        }

        data = await fetchChannelsByChatSpace(input.chatSpaceId!, chatSpace.isPublic)

        break

      default:
        console.timeEnd('HANDLER')

        throw new Error('Invalid flow')
    }

    console.timeEnd('HANDLER')
    return data
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    throw error
  }
}

const fetchSingleChannel = async (channelId: string) => {
  const params: GetCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
    Key: {
      id: channelId,
    },
  }

  const { Item } = await ddbDocClient.send(new GetCommand(params))

  return [Item]
}

const authorizeAdminAccess = async (identity: any, chatSpace: any): Promise<boolean> => {
  return identity['cognito:groups']?.includes(chatSpace.admin)
}

const authorizeChannelAccess = async (identity: any, channelId: string): Promise<boolean> => {
  const params: GetCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
    Key: {
      accessId: identity.username,
      channelId,
    },
  }

  const { Item } = await ddbDocClient.send(new GetCommand(params))

  if (!Item) {
    console.error('Channel Access not found on User')
    return false
  }

  return true
}

const fetchChannelsByChatSpace = async (chatSpaceId: string, isPublic: boolean) => {
  const params: QueryCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
    IndexName: 'byChatSpace',
    KeyConditionExpression: 'chatSpaceId = :chatSpaceId',
    ExpressionAttributeValues: {
      ':chatSpaceId': chatSpaceId,
      ':isPublic': isPublic,
    },
    FilterExpression: isPublic ? 'isPublic = :isPublic' : undefined,
  }

  const { Items } = await ddbDocClient.send(new QueryCommand(params))

  return Items
}

const getChatSpace = async (chatSpaceId: string): Promise<boolean> => {
  // Check if chatSpace is public
  const params: GetCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHATSPACETABLE_NAME,
    Key: {
      id: chatSpaceId,
    },
  }

  const { Item } = await ddbDocClient.send(new GetCommand(params))

  if (!Item) {
    throw new Error('ChatSpace not found')
  }

  return Item
}
