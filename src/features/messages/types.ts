import { Resources, SourceDocument } from '../contextual'

export type Chat = {
  id: string
  question: string
  answer: string
  resources: Resources
  createdAt: string
}

export type ChatResponse = {
  text: string
  sourceDocuments: SourceDocument[]
}
