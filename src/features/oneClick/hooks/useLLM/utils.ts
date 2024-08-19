import { createSignal } from 'solid-js'

export enum EventTypes {
  TOOL_CALLING = 'TOOL_CALLING',
  ROUTING = 'ROUTING',
  ERROR = 'ERROR',
}

export type ToolCallStreamObject = {
  name: string
  processing_message: string
  status: 'processing' | 'completed'
}

export enum VoiceMode {
  WHISPER = 'WHISPER',
  ELEVEN_LABS = 'ELEVEN_LABS',
  HEYGEN = 'HEYGEN',
}

export type RoutingStreamObject = {
  agent_id?: string | null
  avatar?: string | null
  voice_mode?: VoiceMode | null
  voice_id?: string | null
}

type EventObject =
  | { type: EventTypes.TOOL_CALLING; data: ToolCallStreamObject }
  | { type: EventTypes.ROUTING; data: RoutingStreamObject }
  | { type: EventTypes.ERROR; data: string }

export type ParsedAIResponse = {
  text: string[]
  audio: string[]
  event: EventObject
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
          acc.text.push(line.text)
        }

        if (line.audio) {
          console.log('Audio parsed:', line.audio.slice(0, 20))
          acc.audio?.push(line.audio)
        }

        if (line.event) {
          console.log('Event to be parsed:', line.event)
          acc.event = line.event
        }

        return acc
      },
      { audio: [], text: [] }
    )

  return parsedValue
}
