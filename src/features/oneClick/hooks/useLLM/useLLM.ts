import { logDev } from '@/utils'
import { Accessor, createEffect, createSignal, on, Setter } from 'solid-js'
import { isMuted } from '../../components'
import { handleTTS, setTtsRequestsPending } from '../../services'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus, ChatMessage } from '../../types'
import { parseLLMStreamResponse } from './utils'

type SubmitInput = {
  message: string
  overrideSystemInstruction?: string
}

type LLMInput = {
  initialMessages?: ChatMessage[]
  onSubmit?: (input?: SubmitInput) => void
  onSuccess?: (data: string) => void
}

type LLMOutput = {
  messages: Accessor<ChatMessage[]>
  setMessages: Setter<ChatMessage[]>
  submitNewMessage: (input: SubmitInput) => void
  cancelQuery: () => void
  loading: Accessor<boolean>
}

export const [audio64, setAudio64] = createSignal<string[]>([])

export const useLLM = (props: LLMInput): LLMOutput => {
  const [messages, setMessages] = createSignal<ChatMessage[]>(props.initialMessages || [])
  const [loading, setLoading] = createSignal(false)

  let controller: AbortController

  createEffect(
    on(
      () => oneClickStore.activeConversationId,
      () => {
        setMessages([])
      }
    )
  )

  const cancelQuery = () => {
    if (loading()) {
      controller?.abort()
      setMessages((prev) => {
        if (prev[prev.length - 1].role === 'assistant' && prev[prev.length - 1].content === '') {
          return prev.slice(0, prev.length - 1)
        }
        return prev
      })
      setLoading(false)
    }
  }

  const queryLLM = async (input: SubmitInput) => {
    // Reset the requests queue
    setTtsRequestsPending([])
    controller = new AbortController()
    const endpoint = import.meta.env.VITE_LLM_STREAM_URL

    oneClickActions.setStatus(BotStatus.THINKING)
    const history = setMessages((prev) => prev)
    // !isMuted() && oneClickStore.activeChannel?.overrideConfig?.voiceMode !== VoiceMode.HEYGEN

    const body = JSON.stringify({
      knowledgeBaseId: oneClickStore.activeChannel?.id,
      message: input.message,
      history,
      returnSpeech: false,
      callFraiaAI: oneClickStore.activeChannel?.shouldUseFraiaAPI,
      conversationId: oneClickStore.activeConversationId,
      overrideSystemInstruction: input.overrideSystemInstruction,
    })

    setMessages((prev) => [...prev, { content: '', role: 'assistant' }])

    try {
      const response = await fetch(endpoint, {
        signal: controller?.signal,
        method: 'POST',
        headers: {
          'Content-Type': 'text/event-stream',
          Authorization: import.meta.env.VITE_LLM_STREAM_AUTH,
        },
        body,
      })

      const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader()
      let botResponse = ''
      let sentence = ''

      // Initiates the response object
      oneClickActions.setStatus(BotStatus.ANSWERING)

      while (true) {
        const { value, done } = await reader.read()

        if (done) {
          if (sentence) {
            // handleTTS(sentence)
            !isMuted() && handleTTS(sentence)
            logDev('Is done, fire last sentence', sentence)
            sentence = ''
          }
          return botResponse
        }

        if (value) {
          try {
            const parsedValue = parseLLMStreamResponse(value)

            if (parsedValue.event) {
              const { event } = parsedValue
              switch (event.type) {
                case 'ROUTING':
                  oneClickActions.setOneClickStore('activeAgent', event.data)
                  break

                case 'TOOL_CALLING':
                  switch (event.data.status) {
                    case 'processing':
                      console.time('processingToolCall')
                      oneClickActions.setOneClickStore('processingToolCall', event.data)
                      break

                    case 'completed':
                      console.timeEnd('processingToolCall')
                      oneClickActions.setOneClickStore('processingToolCall', null)
                      break

                    default:
                      break
                  }
                  break

                default:
                  break
              }
            }

            if (parsedValue.text) {
              parsedValue.text.forEach((chunk) => {
                botResponse += chunk
                sentence += chunk

                setMessages((prev) => {
                  prev[prev.length - 1].content += chunk

                  return [...prev]
                })

                const isSentenceEnd = /[.!?]$/.test(chunk || '')

                if (sentence.length > 25 && isSentenceEnd) {
                  // handleTTS(sentence)
                  !isMuted() && handleTTS(sentence)
                  logDev('Is done, fire sentence', sentence)
                  sentence = ''
                }
              })
            }

            if (parsedValue.audio.length > 0) {
              setAudio64((prev) => [...prev, ...parsedValue.audio!])
            }
          } catch (error) {
            oneClickActions.setStatus(BotStatus.IDLE)
          } finally {
            // isMuted() && oneClickActions.setStatus(BotStatus.IDLE)
            // oneClickActions.setStatus(BotStatus.IDLE)
          }
        }
      }
    } catch (error) {
      oneClickActions.setStatus(BotStatus.IDLE)
    } finally {
      if (isMuted()) {
        oneClickActions.setStatus(BotStatus.IDLE)
      }
    }
  }

  const submitNewMessage = async (input: SubmitInput) => {
    props.onSubmit?.(input)
    setLoading(true)
    const data = await queryLLM(input)
    setLoading(false)
    props.onSuccess?.(data || '')
  }

  return { messages, setMessages, submitNewMessage, cancelQuery, loading }
}
