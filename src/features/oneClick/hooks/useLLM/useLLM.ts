import { Accessor, createSignal, Setter } from 'solid-js'
import { isMuted } from '../../components'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus, ChatMessage } from '../../types'
import { parseLLMStreamResponse } from './utils'

type Input = {
  initialMessages?: ChatMessage[]
  onSubmit?: (input?: any) => void
  onSuccess?: (data?: any) => void
}

type Output = {
  messages: Accessor<ChatMessage[]>
  setMessages: Setter<ChatMessage[]>
  submitNewMessage: (message: string) => void
  audio64: Accessor<string[]>
  setAudio64: Setter<string[]>
  cancelQuery: () => void
  loading: Accessor<boolean>
}

export const useLLM = (props: Input): Output => {
  const [messages, setMessages] = createSignal<ChatMessage[]>(props.initialMessages || [])
  const [audio64, setAudio64] = createSignal<string[]>([])
  const [loading, setLoading] = createSignal(false)

  let controller: AbortController;

  const cancelQuery = () => {
    controller?.abort();
    setLoading(false)
  }

    const queryLLM = async (input: string) => {
    try {
      oneClickActions.setStatus(BotStatus.THINKING)
      controller = new AbortController()
      return await handleNewAPI(input, setMessages, setAudio64, controller )
    } catch (error) {
      oneClickActions.setStatus(BotStatus.IDLE)
    } finally {
      if (isMuted() && oneClickStore.chatMode === 'text') {
        oneClickActions.setStatus(BotStatus.IDLE)
      }

      if (isMuted() && oneClickStore.isHeyGenMode) {
        oneClickActions.setStatus(BotStatus.IDLE)
      }
    }
  }

  const submitNewMessage = async (input: string) => {
    props.onSubmit?.(input)
    setLoading(true)
    const data = await queryLLM(input)
    setLoading(false)
    props.onSuccess?.(data)
  }

  return { messages, setMessages, submitNewMessage, audio64, setAudio64, cancelQuery, loading }
}

// Util function to handle the new API
const handleNewAPI = async (
  input: string,
  setMessages: Setter<ChatMessage[]>,
  setAudio64: Setter<string[]>,
  controller: AbortController,
) => {
  const history = setMessages((prev) => [...prev, { content: input, role: 'user' }])
  const { isHeyGenMode } = oneClickStore

  const body = JSON.stringify({
    knowledgeBaseId: oneClickStore.activeChannel?.id,
    message: input,
    history,
    returnSpeech: !isHeyGenMode && !isMuted(),
  })

  setMessages((prev) => [...prev, { content: '', role: 'assistant' }])

  // const endpoint = import.meta.env.VITE_LLM_STREAM_URL
  const endpoint = import.meta.env.VITE_LLM_STREAM_URL

  const response = await fetch(endpoint, {
    signal: controller?.signal,
    method: 'POST',
    headers: {
      'Content-Type': 'text/event-stream',
    },
    body,
  })

  const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader()
  let botResponse = ''

  // Initiates the response object
  oneClickActions.setStatus(BotStatus.ANSWERING)
  while (true) {
    const { value, done } = await reader.read()

    if (done) {
      return botResponse;
      break
    }

    if (value) {
      try {
        const parsedValue = parseLLMStreamResponse(value)

        if (parsedValue.text) {
          botResponse += parsedValue.text
          setMessages((prev) => {
            prev[prev.length - 1].content += parsedValue.text

            return [...prev]
          })
          // memory.nested(memory.get().length - 1).content.merge(parsedValue.text)
        }

        if (parsedValue.audio.length > 0) {
          setAudio64((prev) => [...prev, ...parsedValue.audio!])
        }

        //   if (parsedValue.toolCall) {
        //     console.log('Tool call:', parsedValue.toolCall)
        //     switch (parsedValue.toolCall.status) {
        //       case 'processing':
        //         processingToolCall.set(true)
        //         break

        //       case 'done':
        //         processingToolCall.set(false)
        //         break

        //       default:
        //         break
        //     }
        //   }
      } catch (error) {
        oneClickActions.setStatus(BotStatus.IDLE)
      } finally {
        // isMuted() && oneClickActions.setStatus(BotStatus.IDLE)
        // oneClickActions.setStatus(BotStatus.IDLE)
      }
    }
  }
}
