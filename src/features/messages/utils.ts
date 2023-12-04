import { isValidURL } from '@/utils/isValidUrl'
import { MessageType } from '../bot/components/Bot'

export const removeDuplicateURL = (message: MessageType) => {
  const visitedURLs: string[] = []
  const newSourceDocuments: any = []

  message.sourceDocuments.forEach((source: any) => {
    if (isValidURL(source.metadata.source) && !visitedURLs.includes(source.metadata.source)) {
      visitedURLs.push(source.metadata.source)
      newSourceDocuments.push(source)
    } else if (!isValidURL(source.metadata.source)) {
      newSourceDocuments.push(source)
    }
  })
  return newSourceDocuments
}

export const extractChatbotResponse = (response: any) => {
  let text = ''

  if (response.text) text = response.text
  else if (response.json) text = JSON.stringify(response.json, null, 2)
  else text = JSON.stringify(response, null, 2)

  return text
}
