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

import { AppSyncResolverHandler } from 'aws-lambda'
import { authorizeToken } from './authorizers'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb'

import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
  CreateGroupCommand,
  DeleteGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider'

const ddbService = new DynamoDBClient({ region: process.env.REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)
const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION })

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'CREATE' | 'CLEANUP'

    adminId: string
    adminEmail: string
    organizationId: string
    chatSpaceId: string
    hostType: 'COMPANY' | 'PRIVATE'
  }
}

export const handler: AppSyncResolverHandler<Arguments, any> = async (event) => {
  console.time('HANDLER')

  try {
    const { isMock, input } = event.arguments
    !isMock && console.log(event)

    const isAuthorized = isMock
      ? true
      : await authorizeToken(event.request.headers.authorization, async (identity) => {
          return identity['cognito:groups']?.includes('SuperAdmin')
        })

    if (!isAuthorized) {
      throw new Error('Unauthorized access')
    }

    switch (input.flow) {
      case 'CREATE':
        const CognitoUser = await createCognitoRecords(input)

        return CognitoUser.User.Attributes.find((attr) => attr.Name === 'sub').Value

      case 'CLEANUP':
        await cleanUpCognitoRecords(input)
        break

      default:
        throw Error('Invalid flow')
    }

    console.timeEnd('HANDLER')
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    throw error
  }
}

const createRecord = async (tableName: string, item: PutCommandInput['Item']) => {
  const params: PutCommandInput = {
    TableName: tableName,
    Item: item,
  }

  return await ddbDocClient.send(new PutCommand(params))
}

const createCognitoRecords = async (input: Arguments['input']) => {
  const { adminId, adminEmail, organizationId, chatSpaceId, hostType } = input

  const orgAdminGroupName = `${organizationId}-ORG-Admin`
  const chatSpaceAdminGroupName = `${chatSpaceId}-HUB-Admin`

  const [CognitoUser] = await Promise.all([
    cognitoClient.send(
      new AdminCreateUserCommand({
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
        Username: adminId,
        UserAttributes: [
          {
            Name: 'email',
            Value: adminEmail,
          },
          {
            Name: 'email_verified',
            Value: 'true',
          },
          {
            Name: 'custom:userId',
            Value: adminId,
          },
        ],
        ClientMetadata: {
          // This is used to pass data to the Invite Lambda Trigger
          organizationId: organizationId,
          chatSpaceId: chatSpaceId,
          hostType: hostType,
          userRole: 'ADMIN',
        },
      })
    ),
    cognitoClient.send(
      new CreateGroupCommand({
        GroupName: orgAdminGroupName,
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
      })
    ),
    // Create Admin Group for Chat Space
    cognitoClient.send(
      new CreateGroupCommand({
        GroupName: chatSpaceAdminGroupName,
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
      })
    ),
  ])

  await Promise.all([
    cognitoClient.send(
      new AdminAddUserToGroupCommand({
        GroupName: orgAdminGroupName,
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
        Username: adminId,
      })
    ),
    // Add Admin to Chat Space Admin Group
    cognitoClient.send(
      new AdminAddUserToGroupCommand({
        GroupName: chatSpaceAdminGroupName,
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
        Username: adminId,
      })
    ),
    // All Admins are also added to the Admin Group
    cognitoClient.send(
      new AdminAddUserToGroupCommand({
        GroupName: 'Admin',
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
        Username: adminId,
      })
    ),
  ])

  return CognitoUser
}

const cleanUpCognitoRecords = async (input: Arguments['input']) => {
  const { adminId, organizationId, chatSpaceId } = input

  await Promise.allSettled([
    cognitoClient.send(
      new AdminDeleteUserCommand({
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
        Username: adminId,
      })
    ),
    cognitoClient.send(
      new DeleteGroupCommand({
        GroupName: `${organizationId}-ORG-Admin`,
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
      })
    ),
    cognitoClient.send(
      new DeleteGroupCommand({
        GroupName: `${chatSpaceId}-HUB-Admin`,
        UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
      })
    ),
  ])
}
