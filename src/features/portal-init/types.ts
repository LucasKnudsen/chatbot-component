export type ChatStyleConfig = {
  containerWidth?: string
  containerHeight?: string
}

export type ChatConfig = {
  spaceId: string

  config?: {
    autoOpen?: boolean
    overrideLogo?: string
    clientData?: Record<string, any>
    styleConfig?: ChatStyleConfig
  }
}
