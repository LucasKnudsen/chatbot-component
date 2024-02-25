/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELHISTORYITEMTABLE_ARN
	API_DIGITALTWIN_CHANNELHISTORYITEMTABLE_NAME
	API_DIGITALTWIN_CHANNELTABLE_ARN
	API_DIGITALTWIN_CHANNELTABLE_NAME
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	AUTH_FRAIAAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { AppSyncResolverHandler } from 'aws-lambda'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb'
import { authorizeToken } from './authorizers'

const ddbService = new DynamoDBClient({ region: process.env.REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'LIST_BY_CHANNEL' | 'LIST_BY_USER' | 'CREATE' | 'UPDATE' | 'DELETE'
    data: {
      ownerId: string
      channelId: string
      timestamp: string
    }
  }
}

export const handler: AppSyncResolverHandler<Arguments, any[]> = async (event) => {
  console.time('HANDLER')

  let isAuthorized = false
  let responseBody = []

  try {
    const { isMock, input } = event.arguments
    !isMock && console.log(event)

    switch (input.flow) {
      case 'LIST_BY_CHANNEL':
        isAuthorized = isMock
          ? true
          : await authorizeToken(event.request.headers.authorization, async (identity) => {
              return await authorizeReadAccess(identity, input.data.channelId)
            })

        if (!isAuthorized) {
          throw new Error('Unauthorized to update channel')
        }

        responseBody = await queryChannelHistory({
          IndexName: 'byChannel',
          KeyConditionExpression: 'channelId = :channelId',
          ExpressionAttributeValues: {
            ':channelId': input.data.channelId,
          },
          ScanIndexForward: false,
        })

        break

      default:
        break
    }

    console.timeEnd('HANDLER')
    return responseBody
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    throw error
  }
}

const authorizeReadAccess = async (identity: any, channelId: string): Promise<boolean> => {
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

const queryChannelHistory = async (paramsOverride: Partial<QueryCommandInput>) => {
  const params: QueryCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELHISTORYITEMTABLE_NAME,
    ...paramsOverride,
  }

  const { Items } = await ddbDocClient.send(new QueryCommand(params))

  return Items
}
