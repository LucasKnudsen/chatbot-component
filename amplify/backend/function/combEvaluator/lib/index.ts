/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_FRAIASTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import OpenAI from 'openai'
import { getGradingFunction, getGradingPrompt } from './utils'

const ssmClient = new SSMClient({ region: process.env.REGION })
const s3Client = new S3Client({ region: process.env.REGION })

type DataRow = {
  question: string
  answer: string
  timestamp?: string
}

type OverrideConfig = {
  model?: string
  temperature?: number
  // maxTokens: number
  // topP: number
  // frequencyPenalty: number
  // presencePenalty: number
  context?: string
}

type EventBody = {
  dataset: DataRow[]
  channelId: string // ID to knowledge base to extract context from
  overrideConfig?: OverrideConfig
}

type EvaluationObject = {
  type: 'readability' | 'correctness' | 'comprehensiveness'
  label: string
  score: number
  reasoning?: string
}

const dummyContext = `Lucas is in Thailand until the 25th of march. After that, he will fly to Denmark`

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  console.time('HANDLER')

  let responseStatus: number = 200
  let responseBody: any

  try {
    !event.isMock && console.log(event.body)

    const body = JSON.parse(event.body || '') as EventBody

    const context = event.isMock
      ? dummyContext
      : body.overrideConfig?.context || (await getKnowledgeContext(body.channelId))

    const evaluationResults = await evaluateAnswers(body.dataset, context, body.overrideConfig)

    responseBody = evaluationResults
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

const getKnowledgeContext = async (channelId: string) => {
  const path = `_/${channelId}`

  const listObjectsCommand = new ListObjectsV2Command({
    Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
    Prefix: path,
  })
  const listObjectsOutput = await s3Client.send(listObjectsCommand)

  if (listObjectsOutput.KeyCount === listObjectsOutput.MaxKeys) {
    console.error('MaxKeys reached', listObjectsOutput.KeyCount, listObjectsOutput.MaxKeys)
  }

  if (!listObjectsOutput.Contents) {
    throw new Error('We found no context to evaluate the question with.')
  }

  const contextList = await Promise.all(
    listObjectsOutput.Contents.filter((obj) => obj.Key.endsWith('raw.txt')).map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        const { Body } = await s3Client.send(
          new GetObjectCommand({
            Bucket: process.env.STORAGE_FRAIASTORAGE_BUCKETNAME,
            Key: Key,
          })
        )

        return resolve(await Body.transformToString())
      })
    })
  )

  return contextList.join('\n')
}

const getSecret = async (secretName: string) => {
  const command = new GetParameterCommand({ Name: secretName, WithDecryption: true })
  const { Parameter } = await ssmClient.send(command)

  return Parameter.Value
}

const initiateOpenAI = async () => {
  const [apiKey, orgId] = await Promise.all([
    await getSecret('fraia-open-ai-key-1'),
    await getSecret('fraia-openai-org-1'),
  ])

  if (!apiKey) throw new TypeError('OPENAI_API_KEY_NOT_FOUND')

  return new OpenAI({
    organization: orgId,
    apiKey,
  })
}

const evaluateAnswers = async (
  dataset: DataRow[],
  context: string,
  overrideConfig?: OverrideConfig
) => {
  const openai = await initiateOpenAI()

  let model = overrideConfig?.model || 'gpt-4'
  let temperature = overrideConfig?.temperature || 0.3

  const openaiResults = await Promise.all(
    dataset.map(({ question, answer }) => {
      return openai.chat.completions.create({
        messages: [{ role: 'user', content: getGradingPrompt({ question, answer, context }) }],
        tools: [{ type: 'function', function: getGradingFunction(4) }],
        tool_choice: 'auto',
        temperature,
        model,
      })
    })
  )

  const evaluationsList = openaiResults
    .map((result, index) => {
      try {
        return JSON.parse(result.choices[0].message.tool_calls?.[0].function.arguments) as {
          evaluations: EvaluationObject[]
          error: null
        }
      } catch (error) {
        console.log('shit')
        return {
          evaluations: [],
          error: 'OpenAI response was parsed incorrectly',
        }
      }
    })
    .map((evaulationObj, index) => {
      console.log(evaulationObj.evaluations)
      return {
        timestamp: dataset[index].timestamp,
        ...evaulationObj,
      }
    })

  return evaluationsList
}
