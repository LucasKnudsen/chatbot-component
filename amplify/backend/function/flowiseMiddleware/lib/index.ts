import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import axios from 'axios'

// @ts-ignore
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm'
// @ts-ignore
import OpenAI from 'openai'
// @ts-ignore
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
// @ts-ignore
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
// @ts-ignore
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda'

const ssmClient = new SSMClient({ region: process.env.REGION })
const client = new LambdaClient({ region: process.env.REGION })

const ddbService = new DynamoDBClient({ region: process.env.REGION })
const ddbDocClient = DynamoDBDocumentClient.from(ddbService)

type ParsedEventBody = {
  promptCode: string
  channelId?: string
  language?: string
  question?: string
  previousQuestions?: string[]
  chatId?: string
  socketIOClientId?: string
}

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  console.time('HANDLER')

  let responseStatus = 200
  let responseBody

  try {
    !event.isMock && console.log(`EVENT BODY: ${event.body}`)

    const body = JSON.parse(event.body) as ParsedEventBody

    let answer = { text: '', sourceDocuments: [] }

    switch (body.promptCode) {
      case 'question':
        answer = await handleFlowiseRequest(body)

        const params = {
          body: {
            sessionId: body.chatId,
            data: answer,
          },
        }

        // Query broadcast lambda with answer
        const command = new InvokeCommand({
          FunctionName: process.env.FUNCTION_FLOWISEBROADCAST_NAME,
          Payload: JSON.stringify(params),
        })

        await client.send(command)

        break

      case 'suggestedPrompts':
        answer.text = await handleSuggestedPrompts(body, event.isMock)
        break

      default:
        answer = await handleFlowiseRequest(body)
        break
    }

    console.log(`ANSWER:`, {
      text: answer.text,
      amountOfSourceDocuments: answer.sourceDocuments.length,
    })

    console.timeEnd('HANDLER')

    responseBody = answer
  } catch (error) {
    console.error('DEFAULT ERROR', error)
    console.timeEnd('HANDLER')

    responseStatus = error.response?.status || 500
    responseBody = {
      message: error.message,
      status: responseStatus,
      type: error.type,
      stack: error.stack,
    }
  } finally {
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

const getChannel = async (channelId: string) => {
  if (!channelId) throw new TypeError('MISSING_CHANNEL_ID')

  const command = new GetCommand({
    TableName: process.env.API_DIGITALTWIN_CHANNELTABLE_NAME,
    Key: {
      id: channelId,
    },
  })

  const result = await ddbDocClient.send(command)

  return result.Item
}

const getSecret = async (secretName: string) => {
  const command = new GetParameterCommand({ Name: secretName, WithDecryption: true })
  const { Parameter } = await ssmClient.send(command)

  return Parameter.Value
}

const handleFlowiseRequest = async (body: ParsedEventBody) => {
  console.time('GET_CONFIG')
  const { channelId, chatId, socketIOClientId, question } = body

  const [channel, apiKey] = await Promise.all([
    getChannel(channelId),
    getSecret(`flowiseKey_${channelId}`),
  ])

  if (!channel) throw new TypeError('CHANNEL_NOT_FOUND')
  if (!apiKey) throw new TypeError('FLOWISE_API_KEY_NOT_FOUND')

  const endpoint = `${channel.apiHost}/api/v1/prediction/${channel.chatflowId}`

  const data = {
    question,
    overrideConfig: {
      sessionId: {
        RedisBackedChatMemory_1: chatId,
      },
    },
    socketIOClientId,
  }

  console.timeEnd('GET_CONFIG')
  const result = await axios.post(endpoint, data, {
    headers: {
      Authorization: apiKey,
    },
  })

  return result.data
}

const initiateOpenAI = async () => {
  const apiKey = await getSecret(process.env.openai_key)

  if (!apiKey) throw new TypeError('OPENAI_API_KEY_NOT_FOUND')

  return new OpenAI({
    organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
    apiKey,
  })
}

const handleSuggestedPrompts = async (body: ParsedEventBody, isMock?: boolean) => {
  const openai = await initiateOpenAI()

  let { previousQuestions, language } = body

  language = language || 'en'

  previousQuestions = isMock
    ? [
        'Question 1: What is your chatbot about?',
        'Question 2: How to buy the chatbot?',
        'Question 3: What benefits can Soft Designs chatbot provide for my business?',
      ]
    : previousQuestions

  // Validate that the previous questions are in the correct format
  if (!Array.isArray(previousQuestions)) {
    console.error('PROMPTS ERROR', 'TypeError: PREVIOUS_QUESTIONS_NOT_ARRAY')

    return { text: '' }
  }

  const prompt = `Help me formulate two short concise follow up questions that would encourage the user to proceed with this conversation. They should be non-repetitive and based on the questions asked so far: "${previousQuestions.join(
    ', '
  )}".    
      Give me the list of questions in a JSON list. You MUST understand and use the following language code as the language for the questions: "${language}". Do not say anything else, ONLY send me back a JSON list. Response example: { "questions": ["What is...", "Tell me more about ..."] }. 
      `

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  })

  const textObj = chatCompletion.choices[0].message.content

  try {
    const text = JSON.parse(textObj).questions

    return text
  } catch (error) {
    console.error('ERROR PARSING OPENAI RESPONSE: ', error)
    return ''
  }
}
