/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

// @ts-ignore
import OpenAI, { toFile } from 'openai'
// @ts-ignore
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
// @ts-ignore
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const ssmClient = new SSMClient({ region: process.env.REGION })
const s3Client = new S3Client({ region: process.env.REGION })

type ParsedEventBody = {
  s3Key: string
  type: string
}

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  console.time('HANDLER')

  let responseStatus = 200
  let responseBody

  try {
    !event.isMock && console.log(`EVENT BODY: ${event.body}`)

    const { s3Key, type } = JSON.parse(event.body || '') as ParsedEventBody

    const secretName = process.env.openai_key

    if (!secretName) throw new TypeError('OPENAI_API_SECRET_NAME_NOT_FOUND')

    const apiKey = await getSecret(secretName)

    console.log('API KEY')

    const openai = new OpenAI({
      organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
      apiKey,
    })

    const input = {
      Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
      Key: s3Key,
    }

    const { Body } = await s3Client.send(new GetObjectCommand(input))

    console.log('S3')

    const transcription = await openai.audio.transcriptions.create({
      file: await toFile(Buffer.from(await Body.transformToString('base64'), 'base64'), s3Key, {
        type: type,
      }),
      model: 'whisper-1',
    })

    console.log(transcription)

    responseBody = transcription.text
  } catch (error) {
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
