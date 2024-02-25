/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_ARN
	API_DIGITALTWIN_CHANNELDOCUMENTTABLE_NAME
	API_DIGITALTWIN_CHANNELTABLE_ARN
	API_DIGITALTWIN_CHANNELTABLE_NAME
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_ARN
	API_DIGITALTWIN_CHANNELUSERACCESSTABLE_NAME
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

    // Gets channel to get endpoint details
    const channel = await getChannel(input.channelId)

    const endpoint = `${channel.apiHost}/api/v1/vector/upsert/${channel.indexChatflowId}`

    // If the document is not a plain text file, parse it and upload raw text to S3
    if (input.fileType !== 'text/plain') {
      let parsedText = ''

      switch (input.fileType) {
        case 'application/pdf':
          parsedText = await parsePDF(input.s3KeyOriginal)

          break

        default:
          throw new Error('Document type not supported for parsing raw text')
      }

      // Uploads it to S3
      await uploadRawText(parsedText, input.s3KeyRawText)
    }

    const formData = await generateFormData(input.s3KeyRawText)

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
