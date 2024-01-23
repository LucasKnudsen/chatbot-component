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
	AUTH_DIGITALTWINAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// {
//  "chatSpaceId": "f86f6a13-a58c-44d8-87cd-077f559fc0fc",
//  "id": "f05d64f3-6d58-49d1-8143-d59caa88fd1f",
//  "admin": "Test-Admin",
//  "apiHost": "https://flowise.testnet.concordium.com",
//  "chatflowId": "f05d64f3-6d58-49d1-8143-d59caa88fd1f",
//  "createdAt": "2023-12-05T10:42:33.448Z",
//  "initialPrompts": [
//   {
//    "display": "What is Concordium?",
//    "prompt": "Tell me about Concordiumm"
//   }
//  ],
//  "isLive": true,
//  "members": [
//   "Test-Member"
//  ],
//  "name": "Concordium Test",
//  "updatedAt": "2024-01-16T01:40:10.435Z",
//  "__typename": "Channel"
// }

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const ddbService = new DynamoDBClient({ region: process.env.REGION })

const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb')
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  CreateGroupCommand,
  AdminCreateUserCommand,
  DeleteGroupCommand,
  AdminDeleteUserCommand,
  AdminSetUserPasswordCommand,
} = require('@aws-sdk/client-cognito-identity-provider')
const { channel } = require('diagnostics_channel')

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION })

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  if (!event.isMock) return

  const { organizationId, chatSpaceId, channelId, userEmail, adminEmail } = event

  // --- ADMIN CONFIG ---

  const chatSpaceAdminName = 'Space-Admin'

  const orgName = 'Chulalongkorn University'

  const chatSpaceName = 'SCII Portal'
  const hostType = 'COMPANY'

  // --- USER CONFIG ---

  const userRole = 'READ'

  try {
    switch (event.flow) {
      // This flow creates a new Organization, ChatSpace, Channel, and User
      case 'COMPANY':
        // 1. Create Organization
        // 2. Create User Group for Chat Space
        // 3. Create Admin User

        const [Organization, AdminGroup, CognitoUser] = await Promise.all([
          createRecord(process.env.API_DIGITALTWIN_ORGANIZATIONTABLE_NAME, {
            id: organizationId,
            name: orgName,
            logo: '',

            admin: chatSpaceAdminName,

            __typename: 'Organization',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),

          cognitoClient.send(
            new CreateGroupCommand({
              GroupName: chatSpaceAdminName,
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
            })
          ),
          cognitoClient.send(
            new AdminCreateUserCommand({
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
              TemporaryPassword: 'Abcd1234',
              Username: adminEmail,
              UserAttributes: [
                {
                  Name: 'email',
                  Value: adminEmail,
                },
                {
                  Name: 'email_verified',
                  Value: 'true',
                },
              ],
              ClientMetadata: {
                // This is used to pass data to the Invite Lambda Trigger
                organizationId: organizationId,
                chatSpaceId: chatSpaceId,
                hostType: hostType,
              },
            })
          ),
        ])

        // 4. Create Chat Space
        // 5. Creates Channel in ChatSpace
        // 6. Create User record
        // 7. Add to general and specific Admin Groups
        // 8. Set password
        const [ChatSpace, Channel, User] = await Promise.all([
          createRecord(process.env.API_DIGITALTWIN_CHATSPACETABLE_NAME, {
            id: chatSpaceId,
            hostId: organizationId,

            name: chatSpaceName,
            hostType: hostType,

            isPublic: false,
            isMultiChannel: true,
            themeId: 'fraia',

            language: 'en',
            initialPrompts: [],
            settings: {
              autoOpen: false,
            },

            admin: chatSpaceAdminName,

            __typename: 'ChatSpace',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          createRecord(process.env.API_DIGITALTWIN_CHANNELTABLE_NAME, {
            id: channelId,
            chatSpaceId: chatSpaceId,

            apiHost: 'https://flowise.testnet.concordium.com',
            chatflowId: 'f05d64f3-6d58-49d1-8143-d59caa88fd1f',

            name: 'My First Knowledge Base',
            initialPrompts: [],
            isPublic: true,

            __typename: 'Channel',
            owner: CognitoHubUser.Username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          createRecord(process.env.API_DIGITALTWIN_USERTABLE_NAME, {
            id: adminEmail,
            __typename: 'User',
            cognitoId: CognitoUser.User.Username,
            email: adminEmail,

            organizationId: UUID(),
            owner: CognitoUser.User.Username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          cognitoClient.send(
            new AdminAddUserToGroupCommand({
              GroupName: chatSpaceAdminName,
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
              Username: adminEmail,
            })
          ),
          // All Admins are also added to the Admin Group
          cognitoClient.send(
            new AdminAddUserToGroupCommand({
              GroupName: 'Admin',
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
              Username: adminEmail,
            })
          ),
          cognitoClient.send(
            new AdminSetUserPasswordCommand({
              Password: 'Abcd1234',
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
              Username: adminEmail,
              Permanent: true,
            })
          ),
        ])

        return {
          Organization,
          AdminGroup,
          CognitoUser,
          AddToGroupResult,
          ChatSpace,
          User,
        }

      case 'USER':
        // 1. Create Cognito User
        const { User: CognitoHubUser } = await cognitoClient.send(
          new AdminCreateUserCommand({
            UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
            TemporaryPassword: 'Abcd1234',
            Username: userEmail,
            UserAttributes: [
              {
                Name: 'email',
                Value: userEmail,
              },
              {
                Name: 'email_verified',
                Value: 'true',
              },
            ],
            ClientMetadata: {
              chatSpaceId: '123',
              hostType: hostType,
            },
          })
        )

        // 2. Create User record
        // 3. Create Channel
        // 4. Create ChannelUserAccess

        const [HubUser, ChannelUserAccess] = await Promise.all([
          createRecord(process.env.API_DIGITALTWIN_USERTABLE_NAME, {
            id: userEmail,
            cognitoId: CognitoHubUser.Username,
            email: userEmail,

            __typename: 'User',
            owner: CognitoHubUser.Username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),

          createRecord(process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME, {
            accessId: `${userEmail}`,
            channelId: channelId,
            chatSpaceId: chatSpaceId,

            channelHostId: organizationId,
            channelHostType: hostType,

            role: userRole,
            channelName: 'My First Knowledge Base',
            channelDescription: 'My First Knowledge Base',

            __typename: 'ChannelUserAccess',
            owner: CognitoHubUser.Username,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          cognitoClient.send(
            new AdminSetUserPasswordCommand({
              Password: 'Abcd1234',
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
              Username: userEmail,
              Permanent: true,
            })
          ),
        ])

        return {
          CognitoHubUser,
          HubUser,
          Channel,
          ChannelUserAccess,
        }

      default:
        break
    }
  } catch (error) {
    console.log('FIRST ERROR: ', error)

    switch (event.type) {
      case 'ADMIN':
        // Delete User and USer Group
        await Promise.all([
          cognitoClient.send(
            new AdminDeleteUserCommand({
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
              Username: adminEmail,
            })
          ),
          cognitoClient.send(
            new DeleteGroupCommand({
              GroupName: chatSpaceAdminName,
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
            })
          ),
        ])
          .then(() => console.log('User and Group Deleted'))
          .catch(console.log)
        break

      case 'USER':
        await cognitoClient
          .send(
            new AdminDeleteUserCommand({
              UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
              Username: userEmail,
            })
          )
          .then(() => console.log('User Deleted'))
          .catch(console.log)
        break

      default:
        break
    }
  }
}

const createRecord = async (tableName, item) => {
  const params = {
    TableName: tableName,
    Item: item,
    ReturnValue: 'ALL_NEW',
  }
  return await ddbDocClient.send(new PutCommand(params))
}

const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0
    // eslint-disable-next-line no-bitwise
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
