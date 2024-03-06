import * as FormData from 'form-data'

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
} from '@aws-sdk/lib-dynamodb'

const ddbService = new DynamoDBClient({ region: process.env.REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbService, {
  marshallOptions: { removeUndefinedValues: true },
})

const s3Client = new S3Client({ region: process.env.REGION })

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
    console.error('Write access not allowed for user')

    return false
  }

  return true
}

const generateFormData = async (s3Key: string) => {
  const input = {
    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
    Key: s3Key,
  }

  const { Body } = await s3Client.send(new GetObjectCommand(input))

  const formData = new FormData()

  formData.append('files', Body as any, {
    filename: s3Key,
    contentType: 'text/plain',
  })

  return formData
}

const uploadRawText = async (body: string, path: string) => {
  const input = {
    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
    Key: path,
    Body: body,
    ContentType: 'text/plain',
  }

  const result = await s3Client.send(new PutObjectCommand(input))

  console.log(result)
}

const getChannel = async (channelId: string) => {
  const params: GetCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
    Key: {
      id: channelId,
    },
  }

  const { Item } = await ddbDocClient.send(new GetCommand(params))

  if (!Item) {
    throw new Error('Channel not found')
  }

  return Item
}

const createChannelDocument = async (input: Record<string, any>) => {
  const params: PutCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME,
    Item: {
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __typename: 'ChannelDocument',
    },
  }

  await ddbDocClient.send(new PutCommand(params))

  return params.Item
}

export { authorizeUpdateAccess, createChannelDocument, generateFormData, getChannel, uploadRawText }
