import { ComprehendClient, DetectDominantLanguageCommand } from '@aws-sdk/client-comprehend' // ES Modules import
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

const client = new ComprehendClient({ region: process.env.REGION })

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    // Your code logic here

    const command = new DetectDominantLanguageCommand({
      Text: event.body,
    })
    const response = await client.send(command)

    // Find the object with the highest score
    const bestLanguage = response.Languages.reduce((prev, curr) => {
      return curr.Score > prev.Score ? curr : prev
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        languageCode: bestLanguage.LanguageCode,
        score: bestLanguage.Score,
      }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(error),
    }
  }
}
