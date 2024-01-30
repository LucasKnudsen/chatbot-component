/* Amplify Params - DO NOT EDIT
	API_DIGITALTWIN_GRAPHQLAPIENDPOINTOUTPUT
	API_DIGITALTWIN_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { APIGatewayProxyHandler } from 'aws-lambda'
import { graphqlMutation } from './mutation'

const publish2channel = /* GraphQL */ `
  mutation Publish2channel($sessionId: String!, $data: AWSJSON!) {
    publish2channel(sessionId: $sessionId, data: $data) {
      sessionId
      data
      __typename
    }
  }
`

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const isMock = (event as any).isMock || false
  isMock && console.log(`EVENT: ${event}`)

  let responseStatus = 200
  let responseBody

  try {
    const { sessionId, data } = event.body as any

    const variables = {
      sessionId,
      data: JSON.stringify(data),
    }

    responseBody = await graphqlMutation({ query: publish2channel, variables })

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
    console.log('RESPONSE BODY: ', responseBody)
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
