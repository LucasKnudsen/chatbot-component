export function splitTextAtNearestWhitespace(text: string) {
  if (text.length < 50) {
    return [text, '']
  }

  const splitIndexApprox = Math.floor(text.length * (0.5 + Math.random() * 0.1)) // Between 50-60% of the length
  let splitIndex = splitIndexApprox

  // Search for the nearest whitespace, either back or forward from the calculated point
  while (splitIndex < text.length && text[splitIndex] !== ' ' && text[splitIndex - 1] !== ' ') {
    splitIndex++
  }

  // If no whitespace is found, default to the approximate split point
  if (splitIndex === text.length) {
    splitIndex = splitIndexApprox
  }

  const firstPart = text.slice(0, splitIndex).trim()
  const secondPart = text.slice(splitIndex).trim()

  return [firstPart, secondPart]
}

export function extractSuggestedPrompts(text: string | string[]) {
  let questionsArray: string[] = []

  if (!text) return []

  if (Array.isArray(text)) {
    return text
  }

  try {
    // In case the response is a stringified JSON array
    questionsArray = JSON.parse(text)
  } catch (error) {
    // In case the response is a string with newlines
    questionsArray = text.split('\n').map((question) => question.replace(/^\d+\.\s/, ''))
  }

  return questionsArray
}
