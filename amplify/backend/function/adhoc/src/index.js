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

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.REGION })

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  if (!event.isMock) return

  const {
    organizationId,
    chatSpaceId,
    channelId,
    userEmail,
    adminEmail,
    studentUserId,
    adminUserId,
  } = event

  // --- ADMIN CONFIG ---

  const orgAdminGroupName = 'Org-Admin'
  const chatSpaceAdminGroupName = 'Space-Admin'

  const orgName = 'Chulalongkorn University'

  const chatSpaceName = 'SCII Portal'
  const hostType = 'COMPANY'

  const channelName = 'My First Course'

  // --- USER CONFIG ---

  const userRole = 'READ'

  try {
    switch (event.flow) {
      // This flow creates a new Organization, ChatSpace, Channel, and User
      case 'COMPANY':
        const [Organization, CognitoUser] = await Promise.all([
          // Create Organization
          createRecord(process.env.API_DIGITALTWIN_ORGANIZATIONTABLE_NAME, {
            id: organizationId,
            name: orgName,
            logo: 'https://careers.chula.ac.th/assets/img/logo-alternative.png',

            admin: orgAdminGroupName,

            __typename: 'Organization',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          // Create Admin Cognito User
          cognitoClient.send(
            new AdminCreateUserCommand({
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
              TemporaryPassword: 'Abcd1234',
              Username: adminUserId,
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
                  Name: 'preferred_username',
                  Value: 'admin',
                },
                {
                  Name: 'custom:userId',
                  Value: adminUserId,
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
          // Create Admin Group for Organization
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

        // 7. Add to general and specific Admin Groups
        // 8. Set password
        const [ChatSpace, Channel, User] = await Promise.all([
          // Create Chat Space
          createRecord(process.env.API_DIGITALTWIN_CHATSPACETABLE_NAME, {
            id: chatSpaceId,
            hostId: organizationId,

            hostType: hostType,
            name: chatSpaceName,

            isPublic: false,
            isMultiChannel: true,
            themeId: 'fraia',

            defaultLanguage: 'en',

            admin: chatSpaceAdminGroupName,

            __typename: 'ChatSpace',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          // Creates Channel in ChatSpace
          createRecord(process.env.API_DIGITALTWIN_CHANNELTABLE_NAME, {
            id: channelId,
            chatSpaceId: chatSpaceId,

            apiHost: 'https://flowise.testnet.concordium.com',
            chatflowId: 'f05d64f3-6d58-49d1-8143-d59caa88fd1f',

            name: channelName,
            description: 'This is knowledge base subject zero. Take good care of it!',
            initialPrompts: [
              {
                display: 'What am I doing here?',
                prompt: 'Tell me what I can do on the FRAIA portal',
              },
            ],
            isPublic: false,

            // owner: CognitoHubUser.Username,
            __typename: 'Channel',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          // Create Admin User record
          createRecord(process.env.API_DIGITALTWIN_USERTABLE_NAME, {
            id: adminUserId,
            organizationId: organizationId,

            email: adminEmail,
            cognitoId: CognitoUser.User.Attributes.find((attr) => attr.Name === 'sub').Value,

            name: 'Mr. Admin-san',
            status: 'ACTIVE',
            joinedOn: new Date().toISOString(),

            owner: CognitoUser.User.Username,
            __typename: 'User',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          // Add Admin to Org Group
          cognitoClient.send(
            new AdminAddUserToGroupCommand({
              GroupName: orgAdminGroupName,
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
              Username: adminUserId,
            })
          ),
          // Add Admin to Chat Space Admin Group
          cognitoClient.send(
            new AdminAddUserToGroupCommand({
              GroupName: chatSpaceAdminGroupName,
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
              Username: adminUserId,
            })
          ),
          // All Admins are also added to the Admin Group
          cognitoClient.send(
            new AdminAddUserToGroupCommand({
              GroupName: 'Admin',
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
              Username: adminUserId,
            })
          ),
          // cognitoClient.send(
          //   new AdminSetUserPasswordCommand({
          //     Password: 'Abcd1234',
          //     UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
          //     Username: adminUserId,
          //     Permanent: true,
          //   })
          // ),
        ])

        // Creates a Student User to read the channel
        const { User: CognitoCompanyUser } = await cognitoClient.send(
          new AdminCreateUserCommand({
            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
            TemporaryPassword: 'Abcd1234',
            Username: studentUserId,
            UserAttributes: [
              {
                Name: 'email',
                Value: userEmail,
              },
              {
                Name: 'email_verified',
                Value: 'true',
              },
              {
                Name: 'preferred_username',
                Value: 'student',
              },
              {
                Name: 'custom:userId',
                Value: studentUserId,
              },
            ],
            ClientMetadata: {
              organizationId: organizationId,
              chatSpaceId: chatSpaceId,
              hostType: hostType,
              userRole: userRole,
            },
          })
        )

        await Promise.all([
          // Create Student User record
          createRecord(process.env.API_DIGITALTWIN_USERTABLE_NAME, {
            id: studentUserId,
            organizationId: organizationId,

            email: userEmail,
            cognitoId: CognitoCompanyUser.Attributes.find((attr) => attr.Name === 'sub').Value,

            name: 'Student-san',
            status: 'ACTIVE',
            invitedOn: new Date().toISOString(),
            joinedOn: new Date().toISOString(),

            owner: CognitoCompanyUser.Username,
            __typename: 'User',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),

          // Creates Access record to Channel for Student User
          createRecord(process.env.API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME, {
            accessId: studentUserId,
            channelId: channelId,
            chatSpaceId: chatSpaceId,

            channelHostId: organizationId,
            channelHostType: hostType,

            accessType: userRole,
            channelName: channelName,
            channelDescription: 'This is knowledge base subject zero. Take good care of it!',

            owner: CognitoCompanyUser.Username,
            __typename: 'ChannelUserAccess',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
          // Force changes password here
          cognitoClient.send(
            new AdminSetUserPasswordCommand({
              Password: 'Abcd1234',
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
              Username: studentUserId,
              Permanent: true,
            })
          ),
        ])

      case 'PRIVATE':
        // 1. Create Cognito User
        const { User: CognitoHubUser } = await cognitoClient.send(
          new AdminCreateUserCommand({
            UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
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
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
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
      case 'COMPANY':
        // Delete User and USer Group
        await Promise.all([
          cognitoClient.send(
            new AdminDeleteUserCommand({
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
              Username: adminEmail,
            })
          ),
          cognitoClient.send(
            new DeleteGroupCommand({
              GroupName: orgAdminGroupName,
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
            })
          ),
          cognitoClient.send(
            new DeleteGroupCommand({
              GroupName: chatSpaceAdminGroupName,
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
            })
          ),
        ])
          .then(() => console.log('User and Group Deleted'))
          .catch(console.log)
        break

      case 'PRIVATE':
        await cognitoClient
          .send(
            new AdminDeleteUserCommand({
              UserPoolId: process.env.AUTH_FRAIAAUTH_USERPOOLID,
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
