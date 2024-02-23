/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { unmarshall } from '@aws-sdk/util-dynamodb'
import { DynamoDBStreamHandler } from 'aws-lambda'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const ddbService = new DynamoDBClient({ region: process.env.REGION })

import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandInput,
  UpdateCommand,
  UpdateCommandInput,
} from '@aws-sdk/lib-dynamodb'
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

export const handler: DynamoDBStreamHandler = async (event, context) => {
  const modifyRecords = event.Records.flatMap((record) =>
    record.eventName === 'MODIFY'
      ? {
          new: unmarshall(record.dynamodb.NewImage as any),
          old: unmarshall(record.dynamodb.OldImage as any),
        }
      : []
  )

  console.log(modifyRecords)

  // Loop over each record and check if name or description has been updated
  await Promise.all(
    modifyRecords.map((record) => {
      if (
        record.new.name !== record.old.name ||
        record.new.description !== record.old.description
      ) {
        // If name or description has been updated, we should look for all access records and update the channel name and description
        return updateChannelUserAccess(record.new.id, record.new.name, record.new.description)
      }
    })
  )
}

const updateChannelUserAccess = async (channelId: string, name: string, description: string) => {
  // Query all access records for the channel by the channelId index
  const queryCommand: QueryCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
    IndexName: 'byChannel',

    KeyConditionExpression: 'channelId = :channelId',
    ExpressionAttributeValues: {
      ':channelId': channelId,
    },
  }

  const { Items } = await ddbDocClient.send(new QueryCommand(queryCommand))

  console.log('Items to update: ', Items.length)

  // Update each access record with the new channel name and description
  await Promise.all(
    Items.map(async (item) => {
      const updateCommand: UpdateCommandInput = {
        TableName: process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME,
        Key: {
          accessId: item.accessId,
          channelId: item.channelId,
        },
        UpdateExpression:
          'SET channelName = :channelName, channelDescription = :channelDescription',
        ExpressionAttributeValues: {
          ':channelName': name,
          ':channelDescription': description,
        },
      }

      await ddbDocClient.send(new UpdateCommand(updateCommand))
    })
  )
}
