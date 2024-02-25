import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

type EventBody = {
  urls: string[]
}

const scrapingbee = require('scrapingbee')

export const handler = async (
  event: APIGatewayProxyEvent & { isMock?: boolean }
): Promise<APIGatewayProxyResult> => {
  console.time('HANDLER')

  let responseStatus: number = 200
  let responseBody: any

  try {
    !event.isMock && console.log(`EVENT BODY: ${event.body}`)

    const body = JSON.parse(event.body || '') as EventBody

    const results = await Promise.allSettled(body.urls.map((url) => handleScraping(url)))
    // Add Indexing
    // Add S3 upload
    // Add DB write

    responseBody = results
  } catch (error: any) {
    console.error('DEFAULT ERROR', error)

    responseStatus = error.response?.status || 500
    responseBody = {
      message: error.message,
      status: responseStatus,
      type: error.type,
      stack: error.stack,
    }
  } finally {
    console.timeEnd('HANDLER')

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

async function handleScraping(url: string) {
  if (!url) {
    return
  }

  const client = new scrapingbee.ScrapingBeeClient(
    'BUMPPXMRO1PDPAU8RRT178DCGQU81KIROS732QXKEJQW9QONQAN3AOX4BPC22C07M1Z05GWT5G7YGY1L'
  )
  const response = await client.get({
    url: url,
    params: {
      block_ads: true,
      extract_rules: {
        text: {
          selector: 'body',
          output: 'text_relevant',
        },
      },
    },
  })

  const decoder = new TextDecoder()
  const text = decoder.decode(response.data)

  return JSON.parse(text)
}
