/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_GRAPHQLAPIENDPOINTOUTPUT
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	API_DIGITALTWIN_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const GRAPHQL_ENDPOINT = process.env.API_DIGITALTWIN_GRAPHQLAPIENDPOINTOUTPUT
const GRAPHQL_API_KEY = process.env.API_DIGITALTWIN_GRAPHQLAPIKEYOUTPUT

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Request, default as fetch } from 'node-fetch'
import { publish2channel } from './mutation'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('EVENT BODY: ', event.body)

  if (!GRAPHQL_API_KEY || !GRAPHQL_ENDPOINT) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Missing GraphQL API Key or Endpoint',
        type: 'INVALID_GRAPHQL_API_KEY_OR_ENDPOINT',
      }),
    }
  }

  let responseStatus = 200
  let responseBody
  let response

  try {
    const { sessionId, data } = event.body as any

    const variables = {
      sessionId,
      data: JSON.stringify(data),
    }

    const options = {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: publish2channel, variables, authMode: 'API_KEY' }),
    }

    const request = new Request(GRAPHQL_ENDPOINT, options)

    response = await fetch(request)
    responseBody = await response.json()

    if (responseBody.errors) responseStatus = 400
  } catch (error: any) {
    console.error('DETFAULT ERROR', error)

    responseStatus = 400
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
