/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_ARN
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	AUTH_FRAIAAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { AppSyncResolverHandler } from 'aws-lambda'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { authorizeToken } from './authorizers'

import { DynamoDBDocumentClient, GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb'

const ddbService = new DynamoDBClient({ region: process.env.REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbService, {
  marshallOptions: { removeUndefinedValues: true },
})

const s3Client = new S3Client({ region: process.env.REGION })

type Arguments = {
  isMock?: boolean
  input: {
    flow: 'GET' | 'LIST'
    channelId: string
    filesToRetrieve: {
      s3Key: string
      fileName: string
    }[]
  }
}

export const handler: AppSyncResolverHandler<Arguments, { signedUrls: string[] }> = async (
  event
) => {
  console.time('HANDLER')
  let isAuthorized = false
  let signedUrls: string[] = []

  try {
    const { isMock, input } = event.arguments
    !isMock && console.log(event)

    switch (input.flow) {
      case 'GET':
        isAuthorized = isMock
          ? true
          : await authorizeToken(event.request.headers.authorization, async (identity) => {
              return await authorizeReadAccess(identity, input.channelId)
            })

        if (!isAuthorized) {
          throw new Error('Unauthorized to index knowledge')
        }

        const command = new GetObjectCommand({
          Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
          Key: input.filesToRetrieve[0].s3Key,
          ResponseContentDisposition: `attachment; filename="${input.filesToRetrieve[0].fileName}"`,
        })

        signedUrls[0] = await getSignedUrl(s3Client, command, {
          expiresIn: 3600,
        })

      case 'LIST':
        isAuthorized = isMock
          ? true
          : await authorizeToken(event.request.headers.authorization, async (identity) => {
              return await authorizeReadAccess(identity, input.channelId)
            })

        if (!isAuthorized) {
          throw new Error('Unauthorized to index knowledge')
        }

        signedUrls = await Promise.all(
          input.filesToRetrieve.map(async (obj) => {
            const command = new GetObjectCommand({
              Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
              Key: obj.s3Key,
              ResponseContentDisposition: `attachment; filename="${obj.fileName!}"`,
            })

            return await getSignedUrl(s3Client, command, {
              expiresIn: 3600,
            })
          })
        )

      default:
        break
    }

    console.timeEnd('HANDLER')
    return {
      signedUrls,
    }
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    throw error
  }
}

const authorizeReadAccess = async (identity: any, channelId: string): Promise<boolean> => {
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

  return true
}
