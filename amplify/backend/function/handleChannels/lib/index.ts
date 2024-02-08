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

import { AppSyncResolverHandler } from 'aws-lambda'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const ddbService = new DynamoDBClient({ region: process.env.REGION })

import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb'
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

import { authorizeToken } from './authorizers'

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'UPDATE' | 'CREATE' | 'DELETE'
    data: {
      id: string
      chatflowId: string
      apiHost: string
      apiKey: string
      name: string
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

export const handler: AppSyncResolverHandler<Arguments, any> = async (event) => {
  console.time('HANDLER')

  let isAuthorized = false

  try {
    const { isMock, input } = event.arguments
    !isMock && console.log(`EVENT`, event)
    !isMock && console.log(`EVENT`, event.arguments.input)

    switch (input.flow) {
      case 'UPDATE':
        isAuthorized = isMock
          ? true
          : await authorizeToken(event.request.headers.authorization, (identity) => {
              return authorizeUpdateAccess(identity, input.data.id)
            })

        if (!isAuthorized) {
          throw new Error('Unauthorized to update channel')
        }

        return await updateChannel(input.data)

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

const authorizeUpdateAccess = async (identity: any, channelId: string): Promise<boolean> => {
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
    return false
  }

  return true
}

const updateChannel = async (data: Arguments['input']['data']) => {
  const params: UpdateCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
    Key: {
      id: data.id,
    },
    ReturnValues: 'ALL_NEW',
    AttributeUpdates: {
      chatflowId: {
        Action: 'PUT',
        Value: data.chatflowId,
      },
      apiHost: {
        Action: 'PUT',
        Value: data.apiHost,
      },
      apiKey: {
        Action: 'PUT',
        Value: data.apiKey,
      },
      name: {
        Action: 'PUT',
        Value: data.name,
      },
      description: {
        Action: 'PUT',
        Value: data.description,
      },
      //   chatSpaceId: {
      //     Action: 'PUT',
      //     Value: data.chatSpaceId,
      //   },
      isPublic: {
        Action: 'PUT',
        Value: data.isPublic,
      },
      initialPrompts: {
        Action: 'PUT',
        Value: data.initialPrompts,
      },

      updatedAt: {
        Action: 'PUT',
        Value: new Date().toISOString(),
      },
    },
  }

  console.log(params)

  const { Attributes } = await ddbDocClient.send(new UpdateCommand(params))

  return Attributes
}
