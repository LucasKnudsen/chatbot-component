import useHovered from './useHovered'

export * from './dateHelpers'
export * from './errors'
export * from './subscriptionHelpers'
export { useHovered }

export const isNotDefined = <T>(value: T | undefined | null): value is undefined | null =>
  value === undefined || value === null

export const isDefined = <T>(value: T | undefined | null): value is NonNullable<T> =>
  value !== undefined && value !== null

export const isEmpty = (value: string | undefined | null): value is undefined =>
  value === undefined || value === null || value === ''

export const isNotEmpty = <T>(value: T | undefined | null): value is T =>
  value !== undefined && value !== null && value !== ''

export const removeTypenameFromInput = <T>(input: T): T => {
  if (input === null || input === undefined) return input

  if (Array.isArray(input)) {
    return input.map(removeTypenameFromInput) as any
  }

  if (typeof input === 'object') {
    const newInput: any = { ...input }
    delete newInput['__typename']

    // Recursively remove __typename from nested objects
    for (const key in newInput) {
      if (newInput.hasOwnProperty(key)) {
        newInput[key] = removeTypenameFromInput(newInput[key])
      }
    }

    return newInput
  }

  return input
}

export const randomUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const logDev = (...args: any): void => {
  if (import.meta.env.DEV) {
    console.log(...args)
  }
}

export const parseProxy = <T>(proxy: T): T => JSON.parse(JSON.stringify(proxy))

export const base64ToBlob = (
  base64: string,
  contentType: string = '',
  sliceSize: number = 512
): Blob => {
  const byteCharacters = atob(base64)
  const byteArrays: Uint8Array[] = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export const sendRequest = async <ResponseData>(
  params:
    | {
        url: string
        method: string
        body?: Record<string, unknown> | FormData
      }
    | string
): Promise<{ data?: ResponseData; error?: Error }> => {
  try {
    const url = typeof params === 'string' ? params : params.url
    const response = await fetch(url, {
      method: typeof params === 'string' ? 'GET' : params.method,
      mode: 'cors',
      headers:
        typeof params !== 'string' && isDefined(params.body)
          ? {
              'Content-Type': 'application/json',
            }
          : undefined,
      body:
        typeof params !== 'string' && isDefined(params.body)
          ? JSON.stringify(params.body)
          : undefined,
    })
    let data: any
    const contentType = response.headers.get('Content-Type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }
    if (!response.ok) {
      let errorMessage

      if (typeof data === 'object' && 'error' in data) {
        errorMessage = data.error
      } else {
        errorMessage = data || response.statusText
      }

      throw errorMessage
    }

    return { data }
  } catch (e) {
    console.error(e)
    return { error: e as Error }
  }
}

export const shadowQuerySelector = (selector: string): HTMLElement | null => {
  const shadowHost = document.querySelector('fraia-chatbot')

  if (shadowHost) {
    return shadowHost.shadowRoot?.querySelector(selector) || null
  } else {
    return document.querySelector(selector)
  }
}
