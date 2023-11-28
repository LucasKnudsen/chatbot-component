import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import axios from 'axios'

// const chatflowid = 'ca719387-f573-4989-aea0-21dc07d5ca73'
// const apiHost = 'https://flowise.testnet.concordium.com'
const TEST_API_KEY = 'Bearer Z6tQxMs34lQs1kcpOO7bB8bbMrUY9cDo52kjopo/MjM='

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

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`)

    const body = JSON.parse(event.body) as ParsedEventBody

    const { chatflowid, apiHost } = body

    // TODO: Fetch config based on ID instead

    const endpoint = `${apiHost}/api/v1/prediction/${chatflowid}`

    let engineeredQuestion = getEngineeredQuestion(body)

    const data = {
      engineeredQuestion,
      ...body,
    }

    const result = await axios.post(endpoint, data, {
      headers: {
        Authorization: TEST_API_KEY,
      },
    })

    const answer = result.data

    console.log(`ANSWER: `, answer)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(answer),
    }
  } catch (error) {
    console.log(`ERROR: `, JSON.stringify(error))

    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(error),
    }
  }
}

const getEngineeredQuestion = (body: ParsedEventBody) => {
  const { question, previousQuestions } = body

  switch (body.promptCode) {
    case 'question':
      return `Please answer the following question: ${question}. Always return your answer in formatted markdown, structure it with bold, list, images, etc.`
    case 'suggestedPrompts':
      return previousQuestions.join(' ')
    default:
      return question
  }
}
