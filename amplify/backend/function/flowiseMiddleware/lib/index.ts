import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import axios from 'axios'
// @ts-ignore
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm')
// @ts-ignore
import OpenAI from 'openai'

const ssmClient = new SSMClient({ region: process.env.REGION })

const TEST_API_KEY = 'Bearer Z6tQxMs34lQs1kcpOO7bB8bbMrUY9cDo52kjopo/MjM='

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

type ParsedEventBody = {
  chatflowid: string
  apiHost: string
  promptCode: string
  language: string
  question: string
  previousQuestions: string[]
  chatId: string
  socketIOClientId?: string
}

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`)

    const body = JSON.parse(event.body) as ParsedEventBody

    // TODO: Fetch config based on ID instead

    let answer = { text: '' }

    switch (body.promptCode) {
      case 'question':
        answer = await handleFlowiseRequest(body)
        break

      case 'suggestedPrompts':
        answer = await handleSuggestedPrompts(body, event.isMock)
        break

      default:
        answer = await handleFlowiseRequest(body)

        break
    }

    console.log(`ANSWER: `, answer.text)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(answer),
    }
  } catch (error) {
    console.log(error)

    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify(error),
    }
  }
}

const handleFlowiseRequest = async (body: ParsedEventBody) => {
  const { chatflowid, apiHost, chatId, socketIOClientId, question } = body
  // `Please answer the following question: ${question}. Always return your answer in formatted markdown, structure it with bold, lists, etc, making it interesting and informative, but still concise.`
  const endpoint = `${apiHost}/api/v1/prediction/${chatflowid}`
  const data = {
    question,
    chatId,
    socketIOClientId,
  }
  const result = await axios.post(endpoint, data, {
    headers: {
      Authorization: TEST_API_KEY,
    },
  })

  return result.data
}

const initiateOpenAI = async () => {
  const command = new GetParameterCommand({ Name: process.env.openai_key, WithDecryption: true })
  const { Parameter } = await ssmClient.send(command)

  return new OpenAI({
    organization: 'org-cdS1ohucS9d5A2uul80UYyxT',
    apiKey: Parameter.Value,
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

    return { text }
  } catch (error) {
    return { text: '' }
  }
}
