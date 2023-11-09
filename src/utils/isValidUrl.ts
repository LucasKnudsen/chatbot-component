export const isValidURL = (url: string): URL | undefined => {
  try {
    return new URL(url)
  } catch (err) {
    return undefined
  }
}
