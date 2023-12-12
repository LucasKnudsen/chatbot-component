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
  console.log('EVENT: ', event)

  let statusCode = 200
  let body
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
    body = await response.json()

    if (body.errors) statusCode = 400
  } catch (error) {
    console.log('ERROR', error)
    statusCode = 400
    body = {
      errors: [
        {
          status: response?.status,
          message: error.message,
          stack: error.stack,
        },
      ],
    }
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  }
}
