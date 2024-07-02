import { createSignal } from 'solid-js'

export type ParsedAIResponse = {
  text?: string
  audio: string[]
}
const [incompleteChunk, setIncompleteChunk] = createSignal('')

export const parseLLMStreamResponse = (value: string): ParsedAIResponse => {
  const lines = value.trim().split('\n')
  let index = 0

  // Sometimes, the last chunk of the response is incomplete, so we need to store it and concatenate it with the next chunk
  // We can check if the last chunk is incomplete by checking if the last character is a "}"

  for (const line of lines) {
    if (line.slice(-1) !== '}') {
      setIncompleteChunk((incompleteChunk) => incompleteChunk + line)
      lines[index] = ''
      index++
    } else if (line.slice(-1) == '}' && line.slice(0, 1) !== '{') {
      lines[index] = incompleteChunk() + line
      index++
      setIncompleteChunk('')
    }
  }

  const parsedValue: ParsedAIResponse = lines
    .map((line: string) => {
      try {
        return JSON.parse(line)
      } catch (error) {
        return {}
      }
    })
    .reduce(
      (acc: ParsedAIResponse, line: any) => {
        if (line.text) {
          acc.text = acc.text ? acc.text + line.text : line.text
        }

        if (line.audio) {
          console.log('Audio parsed:', line.audio.slice(0, 20))
          acc.audio?.push(line.audio)
        }

        return acc
      },
      { audio: [] }
    )

  return parsedValue
}
