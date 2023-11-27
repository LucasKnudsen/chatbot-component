export type SourceFact = {
  id: string
  name: string
  value: string | string[]
}
export type SourceResource = {
  id: string
  link: string
  type: string
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

export type ContextualElement = {
  id: string
  source: string
  type: ContextualElementType
  value: string | string[]

  header?: string
  description?: string
  thumbnail?: string
}

export enum ContextualElementType {
  FACT = 'fact',
  LINK = 'link',
  VIDEO = 'video',
  IFRAME = 'iframe',
  PICTURE = 'picture',
}

export type Resources = {
  fact: ContextualElement[]
  link: ContextualElement[]
  video: ContextualElement[]
  iframe: ContextualElement[]
  picture: ContextualElement[]
}
