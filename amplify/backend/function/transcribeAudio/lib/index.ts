/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createReadStream } from 'fs'
import OpenAI from 'openai'

import { writeFile } from 'fs/promises'

const ssmClient = new SSMClient({ region: process.env.REGION })

type ParsedEventBody = {
  s3Key: string
  fileType: string
  fileName: string
  channelId: string
  base64Audio?: string
}

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  console.time('HANDLER')

  let responseBody
  let responseStatus = 200

  try {
    !event.isMock && console.log(`EVENT BODY: ${event.body}`)

    const body = JSON.parse(event.body || '') as ParsedEventBody

    // Get file from S3
    // Chunk file into 10 minute parts
    // Transcribe each part
    // Concatenate parts
    // Save to S3
    // Save to DynamoDB
    // Index in Brain

    const [apiKey, orgId] = await Promise.all([
      await getSecret('fraia-open-ai-key-1'),
      await getSecret('fraia-openai-org-1'),
    ])

    if (!apiKey) throw new TypeError('OPENAI_API_KEY_NOT_FOUND')

    const openai = new OpenAI({
      organization: orgId,
      apiKey,
    })

    await writeFile('/tmp/tmp.webm', Buffer.from(body.base64Audio, 'base64'))

    const response = await openai.audio.transcriptions.create({
      file: createReadStream('/tmp/tmp.webm'),
      model: 'whisper-1',
    })

    responseBody = response.text

    // return

    // const chunkDurations = 10 * 60 // 10 minutes

    // console.log('Successfully splits audio')

    // console.log('Successfully initiated OpenAI')

    // let fullTranscription = ''
    // const transcriptionPromises = []
    // // Builds promises to be fired asynchronously

    // const transcriptions = await Promise.all(transcriptionPromises)

    // transcriptions.forEach((t) => {
    //   fullTranscription += t.text
    // })

    // // Saves full transcription in S3
    // const s3TranscriptionKey = await saveTextToS3(
    //   `_/${channelId}/transcriptions/${fileName}-${new Date().toISOString()}`,
    //   fullTranscription
    // )

    // // Saves a record in DB to reference to the different documents.
    // await createChannelDocumentRecord({
    //   s3KeyRaw: s3Key,
    //   s3KeyTranscription: s3TranscriptionKey,
    // })

    // responseBody = fullTranscription
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)

    responseStatus = error.response?.status || 500
    responseBody = {
      message: error.message || error,
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

const getSecret = async (secretName: string) => {
  const command = new GetParameterCommand({ Name: secretName, WithDecryption: true })
  const { Parameter } = await ssmClient.send(command)

  return Parameter.Value
}
