import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import axios from 'axios'

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

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log(`EVENT: ${JSON.stringify(event)}`)

    const body = JSON.parse(event.body) as ParsedEventBody

    const { chatflowid, apiHost, chatId, socketIOClientId } = body

    // TODO: Fetch config based on ID instead

    const endpoint = `${apiHost}/api/v1/prediction/${chatflowid}`

    let engineeredQuestion = getEngineeredQuestion(body)

    const data = {
      question: engineeredQuestion,
      chatId,
      socketIOClientId,
      history: [],
    }

    const result = await axios.post(endpoint, data, {
      headers: {
        Authorization: TEST_API_KEY,
      },
    })

    const answer = result.data

    console.log(`ANSWER: `, answer.text)

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(answer),
    }
  } catch (error) {
    console.log(`ERROR: `, JSON.stringify(error))

    return {
      statusCode: error.response?.status || 500,
      headers,
      body: JSON.stringify(error),
    }
  }
}

const getEngineeredQuestion = (body: ParsedEventBody) => {
  let { question, previousQuestions, language } = body

  // TODO: Add Client overrides/additions to the prompts
  // previousQuestions = [
  //   'What is your chatbot about?',
  //   'How to buy the chatbot?',
  //   'What benefits can Soft Designs chatbot provide for my business?',
  // ]

  switch (body.promptCode) {
    case 'question':
      return `Please answer the following question: ${question}. Always return your answer in formatted markdown, structure it with bold, lists, etc, making it interesting and informative, but still concise.`
    case 'suggestedPrompts':
      return `Help me with 2 short concise suggestive follow up prompts that would encourage the user to proceed with this conversation. 
       
      Please provide the questions in a JSON array format like ["Question 1?", "Question 2?", "Question 3?"]. You MUST understand and use the following language code as the language for the questions: "${language}". Do not say anything else, just send me back an array.

      Here are the questions that the user has asked so far in chronological order: ${previousQuestions.join(
        ', '
      )}.
      `
    default:
      return question
  }
}
