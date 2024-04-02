/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import OpenAI from 'openai'

import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
const ssmClient = new SSMClient({ region: process.env.REGION })

type EventBody = {
  text?: string
  base64Audio?: string
  fileType?: string
  voice?: 'nova' | 'alloy' | 'echo' | 'fable' | 'onyx' | 'shimmer'
  elevenLabsVoiceId?: string
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

    const botResponse = await elevenLabsTTS(body)

    responseBody = botResponse
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

const openAITTS = async (body: EventBody) => {
  const [apiKey, orgId] = await Promise.all([
    await getSecret('fraia-open-ai-key-1'),
    await getSecret('fraia-openai-org-1'),
  ])

  if (!apiKey) throw new TypeError('OPENAI_API_KEY_NOT_FOUND')

  const openai = new OpenAI({
    organization: orgId,
    apiKey,
  })

  if (body.base64Audio && body.fileType) {
    await writeFile('/tmp/tmp.webm', Buffer.from(body.base64Audio, 'base64'))

    const response = await openai.audio.transcriptions.create({
      file: createReadStream('/tmp/tmp.webm'),
      model: 'whisper-1',
    })

    body.text = response.text
  }

  const audio = await openai.audio.speech.create({
    model: 'tts-1',
    voice: body.voice || 'nova',
    input: body.text,
  })

  const buffer = Buffer.from(await audio.arrayBuffer())

  //   await writeFile('tmp/test.mp3', buffer)

  const base64body = buffer.toString('base64')

  return base64body
}

const elevenLabsTTS = async (body: EventBody) => {
  const apiKey = await getSecret(process.env['elevenLabsAPI'])

  const voiceId = body.elevenLabsVoiceId || 'DyotsAaSDZ0tNCxwh6lH'

  // '{"model_id":"<string>","pronunciation_dictionary_locators":[{"pronunciation_dictionary_id":"<string>","version_id":"<string>"}],"text":"<string>","voice_settings":{"similarity_boost":123,"stability":123,"style":123,"use_speaker_boost":true}}',
  const requestBody = {
    text: body.text,
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify(requestBody),
  }

  const audio = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, options)

  const buffer = Buffer.from(await audio.arrayBuffer())

  // await writeFile('tmp/test.mp3', buffer)
  const base64body = buffer.toString('base64')

  return base64body
}
