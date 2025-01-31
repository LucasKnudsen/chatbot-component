import { ContextualElementType } from '@/graphql'

export type SourceFact = {
  id: string
  name: string
  value: string
}
export type SourceResource = {
  id: string
  link: string
  type: ContextualElementType
  description: string
  thumbnail?: string
}

export type SourceDocument = {
  id: string
  metadata: {
    tags: {
      namespace: string
    }
    facts: SourceFact[]
    source: string
    source_document: string
    linked_resources: SourceResource[]
  }
}
