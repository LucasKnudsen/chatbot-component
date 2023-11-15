export type SourceDocument = {
  id: string
  metadata: {
    tags: {
      namespace: string
    }
    facts: {
      id: string
      name: string
      value: string | string[]
    }[]
    source: string
    source_document: string
    linked_resources: {
      link: string
      type: string
      description: string
    }[]
  }
}

export type ContextualElement = {
  id: string
  source: string
  type: ContextualElementType
  value: string | string[]

  header?: string
  description?: string
}

export enum ContextualElementType {
  FACT = 'fact',
  LINK = 'link',
  VIDEO = 'video',
  PICTURE = 'picture',
}
