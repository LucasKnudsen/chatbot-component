/* Amplify Params - DO NOT EDIT
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

import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION })

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { authorize } from './authorizer'
import { createUser, getUser, listUsers } from './dynamoHelpers'

type EventBody = {
  action: 'get' | 'list' | 'create' | 'update' | 'delete' | 'invite'
  chatSpaceId?: string
  chatSpaceOwnerId?: string
  userId?: string
  newUser: {
    email: string
    role: string
  }
}

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean },
  context: any
): Promise<APIGatewayProxyResult> => {
  console.log('EVENT', event)
  console.log('Context', context)
  console.time('HANDLER')

  let responseStatus: number = 200
  let responseBody: any

  try {
    !event.isMock && console.log(`EVENT BODY: ${event.body}`)

    const body = JSON.parse(event.body || '') as EventBody

    switch (body.action) {
      case 'list':
        if (!body.chatSpaceId) throw new Error('MISSING_CHAT_SPACE_ID')
        if (!body.chatSpaceOwnerId) throw new Error('MISSING_CHAT_SPACE_OWNER_ID')

        await authorize(event.headers.Authorization, {
          chatSpaceId: body.chatSpaceId,
          chatSpaceOwnerId: body.chatSpaceOwnerId,
        })

        responseBody = await listUsers(body.chatSpaceId)

        break

      case 'get':
        if (!body.userId) throw new Error('MISSING_USER_ID')

        responseBody = await getUser(body.userId)

        break

      case 'invite':
        if (!body.chatSpaceId) throw new Error('MISSING_CHAT_SPACE_ID')
        if (!body.chatSpaceOwnerId) throw new Error('MISSING_CHAT_SPACE_OWNER_ID')

        await authorize(event.headers.Authorization, {
          chatSpaceId: body.chatSpaceId,
          chatSpaceOwnerId: body.chatSpaceOwnerId,
        })

        responseBody = await inviteUser(body)

      default:
        break
    }
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)

    responseStatus = error.response?.status || 500
    responseBody = {
      message: error.message,
      status: responseStatus,
      type: error.type,
      stack: error.stack,
    }
  } finally {
    console.timeEnd('HANDLER')

    return {
      statusCode: responseStatus,
      body: JSON.stringify(responseBody),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    }
  }
}

const inviteUser = async (body: EventBody) => {
  const { newUser, chatSpaceId, chatSpaceOwnerId } = body

  let step = 0

  try {
    // 1. Check if user exists in Cognito
    // 2. If not, create user in Cognito
    const { User } = await cognitoClient.send(
      new AdminCreateUserCommand({
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
        TemporaryPassword: 'Abcd1234',
        Username: newUser.email,
        UserAttributes: [
          {
            Name: 'email',
            Value: newUser.email,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
        ClientMetadata: {
          organizationId: chatSpaceOwnerId,
          chatSpaceId: chatSpaceId,
          hostType: 'PORTAL',
        },
      })
    )

    step = 1

    // 3. Create user in DynamoDB (set invitedOn and status)
    // 3.1 Add User to Group based on role
    const results = await Promise.all([
      createUser({
        email: newUser.email,
        role: newUser.role,
        cognitoId: User.Username,
        chatSpaceId,
        organizationId: chatSpaceOwnerId,
      }),
      cognitoClient.send(
        new AdminAddUserToGroupCommand({
          GroupName: newUser.role,
          UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
          Username: newUser.email,
        })
      ),
    ])

    return results[0]
  } catch (error) {
    switch (step) {
      case 1:
        // Delete user from Cognito
        await cognitoClient.send(
          new AdminDeleteUserCommand({
            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
            Username: newUser.email,
          })
        )

        break

      default:
        break
    }
    throw error
  }
}
