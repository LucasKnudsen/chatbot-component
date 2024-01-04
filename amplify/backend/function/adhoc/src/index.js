/* Amplify Params - DO NOT EDIT
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

const fixedUUID = 'f86f6a13-a58c-44d8-87cd-077f559fc0fc'
const groupName = 'Test-Admin'
const email = 'fraiaadmin@mail.com'

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  if (!isMock) return

  try {
    // 1. Create Organization
    // 2. Create User Groups
    // 3. Create Admin User
    const [Organization, AdminGroup, CognitoUser] = await Promise.all([
      createRecord(process.env.API_DIGITALTWIN_ORGANIZATIONTABLE_NAME, {
        id: fixedUUID,
        __typename: 'Organization',
        name: 'FRAIA Internal',
        logo: '',
        admion: groupName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),

      cognitoClient.send(
        new CreateGroupCommand({
          GroupName: groupName,
          UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
        })
      ),
      cognitoClient.send(
        new AdminCreateUserCommand({
          UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
          MessageAction: 'SUPPRESS',
          TemporaryPassword: 'Abcd1234',
          Username: email,
          UserAttributes: [
            {
              Name: 'email',
              Value: email,
            },
            {
              Name: 'email_verified',
              Value: 'true',
            },
          ],
        })
      ),
    ])

    // 4. Add to Admin Group
    // 5. Create Chat Space
    // 6. Create User record
    // 7. Set password
    const [AddToGroupResult, ChatSpace, User] = await Promise.all([
      cognitoClient.send(
        new AdminAddUserToGroupCommand({
          GroupName: groupName,
          UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
          Username: email,
        })
      ),
      createRecord(process.env.API_DIGITALTWIN_CHATSPACETABLE_NAME, {
        ownerId: fixedUUID,
        __typename: 'ChatSpace',

        id: fixedUUID,
        name: "FRAIA's Internal Chat Space",
        isPublic: false,
        isMultiChannel: true,
        themeId: 'fraia',

        language: 'en',
        initialPrompts: [],
        settings: {
          autoOpen: false,
        },

        admin: groupName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
      createRecord(process.env.API_DIGITALTWIN_USERTABLE_NAME, {
        id: email,
        __typename: 'User',
        cognitoId: CognitoUser.User.Username,
        email: 'fraia@mail.com',

        organizationId: fixedUUID,
        owner: CognitoUser.User.Username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
      cognitoClient.send(
        new AdminSetUserPasswordCommand({
          Password: 'Abcd1234',
          UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
          Username: email,
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
  } catch (error) {
    console.log('FIRST ERROR: ', error)

    // Delete User and USer Group
    await Promise.all([
      cognitoClient.send(
        new AdminDeleteUserCommand({
          UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
          Username: email,
        })
      ),
      cognitoClient.send(
        new DeleteGroupCommand({
          GroupName: groupName,
          UserPoolId: process.env.AUTH_DIGITALTWINAUTH_USERPOOLID,
        })
      ),
    ])
      .then(() => console.log('User and Group Deleted'))
      .catch(console.log)
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
