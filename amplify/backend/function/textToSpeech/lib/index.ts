import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import OpenAI from 'openai'

import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
const ssmClient = new SSMClient({ region: process.env.REGION })

type EventBody = {
  text: string
}

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  console.time('HANDLER')

  let responseStatus: number = 200
  let responseBody: any

  try {
    !event.isMock && console.log(event.body)

    const body = JSON.parse(event.body || '') as EventBody

    const apiKey = await getSecret('fraia-open-ai-key-1')

    if (!apiKey) throw new TypeError('OPENAI_API_KEY_NOT_FOUND')

    const openai = new OpenAI({
      organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
      apiKey,
    })

    const audio = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'nova',
      input: body.text,
    })

    // if (event.isMock) {
    //   const buffer = Buffer.from(await audio.arrayBuffer())
    //   await writeFile('tmp/test.mp3', buffer)
    // }

    const buffer = Buffer.from(await audio.arrayBuffer())
    const base64body = buffer.toString('base64')

    responseBody = base64body
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
      body: responseBody,
      isBase64Encoded: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'audio/mp3',
      },
    }
  }
}

const getSecret = async (secretName: string) => {
  const command = new GetParameterCommand({ Name: secretName, WithDecryption: true })
  const { Parameter } = await ssmClient.send(command)

  return Parameter.Value
}
