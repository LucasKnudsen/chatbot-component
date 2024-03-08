/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_ARN
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME
	API_DIGITALTWIN_CHANNELTABLE_ARN
	API_DIGITALTWIN_CHANNELTABLE_NAME
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
	API_DIGITALTWIN_CHATSPACETABLE_ARN
	API_DIGITALTWIN_CHATSPACETABLE_NAME
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	AUTH_FRAIAAUTH_USERPOOLID
	ENV
	REGION
	STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { AppSyncResolverHandler } from 'aws-lambda'
import fetch from 'node-fetch'

import { authorizeToken } from './authorizers'
import { parsePDF } from './parsers'
import {
  authorizeUpdateAccess,
  createChannelDocument,
  generateFormData,
  getChannel,
  getChatSpace,
  uploadRawText,
} from './utils'

type Arguments = {
  isMock?: boolean
  input: {
    channelId: string
    id: string
    title: string
    s3KeyOriginal: string
    s3KeyRawText?: string

    fileSuffix?: string
    fileName?: string
    fileType?: string

    // ...Other ChannelDocument params
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
          return await authorizeUpdateAccess(identity, input.channelId)
        })

    if (!isAuthorized) {
      throw new Error('Unauthorized to index knowledge')
    }

    // Gets channel and chatspace to set endpoint details
    const channel = await getChannel(input.channelId)
    const chatSpace = await getChatSpace(channel.chatSpaceId)

    const endpoint = `${channel.apiHost}/api/v1/vector/upsert/${channel.chatflowId}`

    // If the document is a PDF, parse it and upload the raw text to S3
    if (input.fileType == 'application/pdf') {
      const parsedText = await parsePDF(input.s3KeyOriginal)
      await uploadRawText(parsedText, input.s3KeyRawText)
    }

    const formData = await generateFormData(input.s3KeyRawText)

    formData.append('database', chatSpace.database)
    formData.append('tableName', `fraia_${input.channelId.replaceAll('-', '_')}`)

    console.log('endpoint', endpoint, chatSpace.database, input.channelId)

    const result = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: channel.apiKey,
      },
    })

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`)
    }

    // No need to create a ChannelDocument if local mock
    if (isMock) {
      console.timeEnd('HANDLER')
      return 'MOCK SUCCESSFUL RESPONSE'
    }

    const channelDocument = await createChannelDocument({
      ...input,
    })

    console.timeEnd('HANDLER')
    return channelDocument
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    throw error
  }
}
