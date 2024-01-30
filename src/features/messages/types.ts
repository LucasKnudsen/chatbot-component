import { SourceDocument } from '../contextual'

export type ChatResponse = {
  text: string
  sourceDocuments: SourceDocument[]
}

export type InitLLMStreamProps = {
  onStart?: () => void
  onToken?: (token: string) => void
  onDocuments?: (documents: SourceDocument[]) => void
}
