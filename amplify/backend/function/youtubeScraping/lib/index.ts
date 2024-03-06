/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as ytdl from 'ytdl-core'

import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
const s3Client = new S3Client({ region: process.env.REGION })

type EventBody = {
  url: string
}

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  console.time('HANDLER')

  let responseStatus: number = 200
  let responseBody: any

  try {
    !event.isMock && console.log(`EVENT BODY: ${event.body}`)

    const body = JSON.parse(event.body || '') as EventBody

    const stream = ytdl(body.url, {
      filter: 'audioonly',
      quality: 'lowestaudio',
    })

    const key = `tmp/${Date.now()}.webm`

    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
        Key: key,
        Body: stream,
      },
    })

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.log(progress)
    })

    await parallelUploads3.done()

    responseBody = key
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
