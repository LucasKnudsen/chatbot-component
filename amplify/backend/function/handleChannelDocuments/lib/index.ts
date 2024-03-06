/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_ARN
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME
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
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb'
import { authorizeToken } from './authorizers'

const ddbService = new DynamoDBClient({ region: process.env.REGION })

const ddbDocClient = DynamoDBDocumentClient.from(ddbService, {
  marshallOptions: { removeUndefinedValues: true },
})

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'UPDATE' | 'CREATE' | 'DELETE' | 'LIST'
    data: {
      channelId: string
      id?: string
      title: string
      s3KeyRawText: string
      s3KeyOriginal: string
      description: string
      includeInLibrary: boolean
      documentType: 'TRANSCRIPTION' | 'DOCUMENT' | 'WEBSITE'
      source: string
      fileType: string
      fileName: string
      fileSize: number
      uploadedBy: string
    }
  }
}

export const handler: AppSyncResolverHandler<Arguments, any> = async (event) => {
  console.time('HANDLER')

  try {
    const { isMock, input } = event.arguments
    let isAuthorized = false

    !isMock && console.log(event.arguments)

    switch (input.flow) {
      case 'CREATE':
        isAuthorized = isMock
          ? true
          : await authorizeToken(event.request.headers.authorization, async (identity) => {
              return await authorizeAccess(identity, input.data.channelId, true)
            })

        if (!isAuthorized) {
          throw new Error('Unauthorized to update channel')
        }

        const newDocument = await createChannelDocument(input.data)

        return [newDocument]

      case 'LIST':
        // TODO: Check public access
        isAuthorized = isMock
          ? true
          : await authorizeToken(event.request.headers.authorization, async (identity) => {
              return await authorizeAccess(identity, input.data.channelId)
            })

        if (!isAuthorized) {
          throw new Error('Unauthorized to list channels')
        }

        return await listChannelDocuments(input.data.channelId)

      default:
        throw new Error('Invalid flow')
    }

    console.timeEnd('HANDLER')
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    throw error
  }
}

const authorizeAccess = async (
  identity: any,
  channelId: string,
  authorizeWrite?: boolean
): Promise<boolean> => {
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

  if (!authorizeWrite) return true

  if (Item.AccessType === 'READ') {
    console.error('User does not have WRITE access to channel')
    return false
  }

  return true
}

const createChannelDocument = async (data: Arguments['input']['data']) => {
  const Item = {
    ...data,
    __typename: 'ChannelDocument',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const params: PutCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME!,
    Item,
  }

  await ddbDocClient.send(new PutCommand(params))

  return Item
}

const listChannelDocuments = async (channelId: string) => {
  console.log(channelId)
  const params: QueryCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME!,
    KeyConditions: {
      channelId: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [channelId],
      },
    },
  }

  const { Items } = await ddbDocClient.send(new QueryCommand(params))

  return Items
}
