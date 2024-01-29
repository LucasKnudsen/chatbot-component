import { SourceDocument } from '../contextual'

export type ChatResponse = {
  text: string
  sourceDocuments: SourceDocument[]
}
