import { ComprehendClient, DetectDominantLanguageCommand } from '@aws-sdk/client-comprehend' // ES Modules import
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const client = new ComprehendClient({ region: process.env.REGION })

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('EVENT BODY: ', event.body)

  let responseStatus = 200
  let responseBody

  try {
    const command = new DetectDominantLanguageCommand({
      Text: event.body,
    })
    const response = await client.send(command)

    // Find the object with the highest score
    const bestLanguage = response.Languages.reduce((prev, curr) => {
      return curr.Score > prev.Score ? curr : prev
    })

    responseBody = {
      languageCode: bestLanguage.LanguageCode,
      score: bestLanguage.Score,
    }
  } catch (error) {
    console.error('DETFAULT ERROR', error)

    responseStatus = 500
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
