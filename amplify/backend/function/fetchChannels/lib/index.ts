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

import { DynamoDBDocumentClient, GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb'
import { authorizeToken } from './authorizers'
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'BY_ID' | 'BY_CHAT_SPACE'
    channelId?: string
    chatSpaceId?: string
  }
}

export const handler: AppSyncResolverHandler<Arguments, any> = async (event) => {
  console.time('HANDLER')

  try {
    const { isMock, input } = event.arguments
    !isMock && console.log(`EVENT : ${event}`)

    let data: any

    switch (input.flow) {
      case 'BY_ID':
        const isAuthorized = await authorizeToken(
          event.request.headers.authorization,
          (identity) => {
            return authorizeChannelReadAccess(identity, input.channelId!)
          }
        )

        if (!isAuthorized) {
          throw new Error('Unauthorized to fetch channel')
        }

        data = await fetchSingleChannel(input.channelId!)

        break

      case 'BY_CHAT_SPACE':
        data = []

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

const authorizeChannelReadAccess = async (identity: any, channelId: string) => {
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

  // Since READ is the lowest level of access, we can assume that the user has access to the channel

  return true
}
