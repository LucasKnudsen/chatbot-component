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
