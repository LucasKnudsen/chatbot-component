import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import axios from 'axios'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(`EVENT: ${JSON.stringify(event)}`)

  const chatflowid = 'ca719387-f573-4989-aea0-21dc07d5ca73'
  const apiHost = 'https://flowise.testnet.concordium.com'

  const endpoint = `${apiHost}/api/v1/prediction/${chatflowid}`

  try {
    const result = await axios.post(endpoint, JSON.parse(event.body))

    const answer = result.data

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
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(error),
    }
  }
}
