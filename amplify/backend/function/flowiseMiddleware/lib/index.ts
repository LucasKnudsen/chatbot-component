import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import axios from 'axios'

// const chatflowid = 'ca719387-f573-4989-aea0-21dc07d5ca73'
// const apiHost = 'https://flowise.testnet.concordium.com'
const TEST_API_KEY = 'Bearer Z6tQxMs34lQs1kcpOO7bB8bbMrUY9cDo52kjopo/MjM='

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // console.log(`EVENT: ${JSON.stringify(event)}`)

  const { chatflowid, apiHost } = event.body
    ? JSON.parse(event.body)
    : { chatflowid: '', apiHost: '' }

  const endpoint = `${apiHost}/api/v1/prediction/${chatflowid}`

  try {
    const result = await axios.post(endpoint, JSON.parse(event.body), {
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
    return {
      statusCode: error.status || 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(error),
    }
  }
}
