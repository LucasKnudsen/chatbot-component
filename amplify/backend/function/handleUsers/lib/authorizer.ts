// @ts-nocheck

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
const ddbService = new DynamoDBClient({ region: process.env.REGION })

import { DynamoDBDocumentClient, GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb'
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')

const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.AUTH_FRAIAAUTH_USERPOOLID}/.well-known/jwks.json`,
})

const getSigningKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, null)
    } else {
      const signingKey = key.getPublicKey()
      callback(null, signingKey)
    }
  })
}

const authorize = async (
  token: string,
  chatSpaceIds: { chatSpaceId: string; chatSpaceOwnerId: string }
) => {
  if (!token) {
    throw new Error('MISSING_TOKEN')
  }

  const decodedToken = await new Promise((resolve, reject) => {
    // Validate and decode the token
    jwt.verify(token, getSigningKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        console.log(decoded) // Decoded token
        resolve(decoded)
      }
    })
  })

  // Use the decoded token to authorize the user

  // Get the ChatSpace and check if admin exists on the User groups
  const chatSpace = await getChatSpace(chatSpaceIds)
  const userGroups = decodedToken['cognito:groups']

  if (!chatSpace) {
    throw new Error('CHAT_SPACE_NOT_FOUND')
  }

  if (!userGroups.includes(chatSpace.admin)) {
    throw new Error('UNAUTHORIZED')
  }
}

export { authorize }

const getChatSpace = async ({ chatSpaceOwnerId, chatSpaceId }) => {
  const params: GetCommandInput = {
    TableName: process.env.API_DIGITALTWIN_CHATSPACETABLE_NAME,
    Key: {
      ownerId: chatSpaceOwnerId,
      id: chatSpaceId,
    },
  }

  const command = new GetCommand(params)
  const { Item } = await ddbDocClient.send(command)

  return Item
}
