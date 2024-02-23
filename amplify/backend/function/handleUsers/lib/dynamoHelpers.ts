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

const ddbService = new DynamoDBClient({ region: process.env.REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

const listUsers = async (chatSpaceId: string) => {
  const params: QueryCommandInput = {
    TableName: process.env.API_DIGITALTWIN_USERTABLE_NAME,
    IndexName: 'byChatSpace',
    KeyConditions: {
      chatSpaceId: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [chatSpaceId],
      },
    },
  }

  const command = new QueryCommand(params)
  const { Items } = await ddbDocClient.send(command)

  return Items
}

const getUser = async (userId: string) => {
  const params: GetCommandInput = {
    TableName: process.env.API_DIGITALTWIN_USERTABLE_NAME,
    Key: {
      id: userId,
    },
  }

  const command = new GetCommand(params)
  const { Item } = await ddbDocClient.send(command)

  return Item
}

const createUser = async ({ email, role, cognitoId, chatSpaceId, organizationId }) => {
  const params: PutCommandInput = {
    TableName: process.env.API_DIGITALTWIN_USERTABLE_NAME,
    Item: {
      id: email,
      __typename: 'User',
      chatSpaceId,
      organizationId,
      cognitoId,
      owner: cognitoId,
      email,
      roles: [role],
      status: 'INVITED',
      invitedOn: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }

  const command = new PutCommand(params)
  await ddbDocClient.send(command)

  return params.Item
}

export { createUser, getUser, listUsers }

// {
//   "id": {
//     "S": "fraiaadmin@mail.com"
//   },
//   "chatSpaceId": {
//     "S": "f86f6a13-a58c-44d8-87cd-077f559fc0fc"
//   },
//   "cognitoId": {
//     "S": "89bdac82-9a25-4925-892b-0b78707db8d9"
//   },
//   "createdAt": {
//     "S": "2024-01-01T20:55:03.884Z"
//   },
//   "email": {
//     "S": "fraia@mail.com"
//   },
//   "organizationId": {
//     "S": "f86f6a13-a58c-44d8-87cd-077f559fc0fc"
//   },
//   "owner": {
//     "S": "89bdac82-9a25-4925-892b-0b78707db8d9"
//   },
//   "updatedAt": {
//     "S": "2024-01-01T20:55:03.884Z"
//   },
//   "__typename": {
//     "S": "User"
//   }
// }
