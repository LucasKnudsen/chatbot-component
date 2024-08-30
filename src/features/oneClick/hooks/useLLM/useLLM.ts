import { logDev } from '@/utils'
import { Accessor, createSignal, Setter } from 'solid-js'
import { isMuted } from '../../components'
import { handleTTS, initiateConversation, setTtsRequestsPending } from '../../services'
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

  // createEffect(
  //   on(
  //     () => oneClickStore.activeConversationId,
  //     () => {
  //       setMessages([])
  //     }
  //   )
  // )

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
      let sentenceBuffer = ''
      let htmlBuffer = ''
      let isProcessingHtmlTag = false

      // Initiates the response object
      oneClickActions.setStatus(BotStatus.ANSWERING)

      while (true) {
        const { value, done } = await reader.read()

        if (done) {
          if (sentenceBuffer) {
            !isMuted() && handleTTS(sentenceBuffer)
            logDev('Is done, fire last sentenceBuffer', sentenceBuffer)

            sentenceBuffer = ''
          }
          return botResponse
        }

        if (value) {
          try {
            const parsedValue = parseLLMStreamResponse(value)

            if (parsedValue.events) {
              const { events } = parsedValue

              events.forEach(async (event) => {
                switch (event.type) {
                  case 'ROUTING':
                    logDev('Routing event', event.data)
                    oneClickActions.setOneClickStore('activeAgent', event.data)
                    break

                  case 'TOOL_CALLING':
                    switch (event.data.status) {
                      case 'processing':
                        oneClickActions.setOneClickStore('indicationMessage', {
                          message: event.data.processing_message,
                          metadata: {
                            toolName: event.data.name,
                          },
                        })
                        break

                      case 'completed':
                        oneClickActions.setOneClickStore('indicationMessage', null)
                        break

                      default:
                        break
                    }
                    break

                  case 'CONVERSATION_COMPLETE':
                    // Should initiate a new conversation
                    oneClickActions.setOneClickStore('indicationMessage', {
                      message: 'Flow complete. Initiating new conversation...',
                      metadata: {
                        initiatingNewConversation: true,
                      },
                    })

                    const initiateData = await initiateConversation(oneClickStore.activeChannel!.id)

                    await new Promise((resolve) => setTimeout(resolve, 2500))

                    oneClickActions.resetConversation(initiateData.conversationId)
                    oneClickActions.setOneClickStore('indicationMessage', null)

                    break

                  default:
                    break
                }
              })
            }

            if (parsedValue.text) {
              parsedValue.text.forEach((chunk) => {
                // HTML tag cleaning
                if (chunk.startsWith('<') || isProcessingHtmlTag) {
                  // Check for start HTML tags or if the stream is in the middle of streaming the HTML tag
                  // If one is true, add chunk to the html buffer and check for end tags
                  // If no end tag is found, continue to the next index
                  // If end tag is found, add the html buffer to the bot response and setMessages
                  htmlBuffer += chunk

                  if (!chunk.endsWith('>')) {
                    isProcessingHtmlTag = true
                    oneClickActions.setOneClickStore('indicationMessage', {
                      message: 'Processing HTML..',
                    })
                  } else {
                    oneClickActions.setOneClickStore('indicationMessage', null)
                    isProcessingHtmlTag = false

                    botResponse += htmlBuffer
                    setMessages((prev) => {
                      prev[prev.length - 1].content += htmlBuffer

                      return [...prev]
                    })
                    htmlBuffer = ''
                  }

                  return
                }

                botResponse += chunk
                sentenceBuffer += chunk

                setMessages((prev) => {
                  prev[prev.length - 1].content += chunk

                  return [...prev]
                })

                const issentenceBufferEnd = /[.!?]$/.test(chunk || '')

                if (sentenceBuffer.length > 25 && issentenceBufferEnd) {
                  !isMuted() && handleTTS(sentenceBuffer)
                  logDev('Is done, fire sentenceBuffer', sentenceBuffer)
                  sentenceBuffer = ''
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

  const submitNewMessage = async (input: SubmitInput): Promise<string> => {
    props.onSubmit?.(input)
    setLoading(true)
    const data = await queryLLM(input)
    setLoading(false)
    props.onSuccess?.(data || '')

    return data || ''
  }

  return { messages, setMessages, submitNewMessage, cancelQuery, loading }
}
