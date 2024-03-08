/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELTABLE_ARN
	API_DIGITALTWIN_CHANNELTABLE_NAME
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
	API_DIGITALTWIN_CHATSPACETABLE_ARN
	API_DIGITALTWIN_CHATSPACETABLE_NAME
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	API_DIGITALTWIN_ORGANIZATIONTABLE_ARN
	API_DIGITALTWIN_ORGANIZATIONTABLE_NAME
	API_DIGITALTWIN_USERTABLE_ARN
	API_DIGITALTWIN_USERTABLE_NAME
	AUTH_FRAIAAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb'
import { AppSyncResolverHandler } from 'aws-lambda'

const ddbService = new DynamoDBClient({ region: process.env.REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

import { authorizeToken } from './authorizers'

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'UPDATE' | 'CREATE' | 'DELETE'
    data: {
      id: string
      chatflowId: string
      indexChatflowId: string
      apiHost: string
      apiKey: string
      name: string
      subtitle: string
      avatar: string
      description: string
      chatSpaceId: string
      isPublic: boolean
      initialPrompts: {
        display: string
        prompt: string
      }[]
    }
  }
}

type Identity = {
  sub: string
  iss: string
  client_id: string
  origin_jti: string
  event_id: string
  token_use: string
  scope: string
  auth_time: number
  exp: number
  iat: number
  jti: string
  username: string
}

export const handler: AppSyncResolverHandler<Arguments, any> = async (event) => {
  console.time('HANDLER')

  let isAuthorized = false
  let identity: any

  try {
    const { isMock, input } = event.arguments
    !isMock && console.log(event)
    !isMock && console.log(`EVENT input`, event.arguments.input)

    switch (input.flow) {
      case 'UPDATE':
        identity = isMock
          ? { username: 'a05d64f3-6d58-49d1-8143-d59caa88fd1f' }
          : await authorizeToken(event.request.headers.authorization, async (identity) => {
              isAuthorized = await authorizeUpdateAccess(identity, input.data.id)

              if (!isAuthorized) {
                throw new Error('Unauthorized to update channel')
              }

              return identity
            })

        return await updateChannel(input.data)

      case 'CREATE':
        const chatSpace = await getChatSpace(input.data.chatSpaceId)

        identity = isMock
          ? { username: 'a05d64f3-6d58-49d1-8143-d59caa88fd1f' }
          : await authorizeToken(event.request.headers.authorization, async (identity) => {
              isAuthorized = await authorizeCreateAccess(identity, chatSpace)

              if (!isAuthorized) {
                throw new Error('Unauthorized to create new channel')
              }

              return identity
            })

        const newChannel = await createChannel(input.data)

        await createChannelAccess(input.data, identity, chatSpace)

        return newChannel

      default:
        break
    }

    console.timeEnd('HANDLER')
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    throw error
  }
}

const authorizeUpdateAccess = async (identity: Identity, channelId: string): Promise<boolean> => {
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

  if (Item.accessType === 'READ') {
    console.error('Write access not allowed for user')

    return false
  }

  return true
}

const authorizeCreateAccess = async (identity: Identity, chatSpace: any): Promise<boolean> => {
  return identity['cognito:groups']?.includes(chatSpace.admin)
}

const updateChannel = async (data: Arguments['input']['data']) => {
  // Initialize parts of the update expression
  let updateExpression = 'SET updatedAt = :updatedAt , #channelName = :channelName'
  const expressionAttributeValues: any = {
    ':channelName': data.name,
    ':updatedAt': new Date().toISOString(), // always update 'updatedAt'
  }
  const expressionAttributeNames = {
    '#channelName': 'name',
  }

  // Add dynamic attributes from 'data' to the update expression
  Object.keys(data).forEach((key) => {
    if (key !== 'id' && key !== 'name') {
      // Append to update expression
      updateExpression += `, ${key} = :${key}`
      // Add to expression attribute values
      expressionAttributeValues[`:${key}`] = data[key]
    }
  })

  const params: UpdateCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
    Key: {
      id: data.id,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
  }

  const { Attributes } = await ddbDocClient.send(new UpdateCommand(params))

  return Attributes
}

const createChannel = async (data: Arguments['input']['data']) => {
  const params: PutCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
    Item: {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }

  await ddbDocClient.send(new PutCommand(params))

  return data
}

const createChannelAccess = async (
  data: Arguments['input']['data'],
  identity: any,
  chatSpace: any
) => {
  const params: PutCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
    Item: {
      accessId: identity.username,
      channelId: data.id,
      chatSpaceId: data.chatSpaceId,

      channelHostId: chatSpace.hostId,
      channelHostType: chatSpace.hostType,

      accessType: 'ADMIN',
      channelName: data.name,
      channelDescription: data.description,
      channelAvatar: data.avatar,
      channelSubtitle: data.subtitle,

      owner: identity.username,
      __typename: 'ChannelUserAccess',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }

  await ddbDocClient.send(new PutCommand(params))

  return data
}

const getChatSpace = async (chatSpaceId: string) => {
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
