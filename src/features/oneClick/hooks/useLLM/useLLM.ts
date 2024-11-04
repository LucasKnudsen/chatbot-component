import { Priority } from '@/graphql'
import { logDev, logErrorToServer } from '@/utils'
import { createSignal } from 'solid-js'
import { handleTTS, initiateConversation, setTtsRequestsPending } from '../../services'
import { oneClickActions, oneClickStore } from '../../store/oneClickStore'
import { BotStatus, ChatMessage } from '../../types'
import { parseLLMStreamResponse } from './utils'

type SubmitInput = {
  message: string
  overrideSystemInstruction?: string
  withSpeech?: boolean
}

type LLMInput = {
  onSubmit?: (input?: SubmitInput) => void
  onSuccess?: (data: string) => void
}

type LLMOutput = {
  submitNewMessage: (input: SubmitInput) => void
  cancelQuery: () => void
}

export const [messages, setMessages] = createSignal<ChatMessage[]>([])
export const [audio64, setAudio64] = createSignal<string[]>([])
export const [isCanceled, setIsCanceled] = createSignal(false)

export const useLLM = (props: LLMInput): LLMOutput => {
  let controller: AbortController

  const cancelQuery = () => {
    if (oneClickStore.isBotProcessing) {
      try {
        controller?.abort('QUERY_CANCELLED')
      } catch (error) {
        logDev('Error cancelling query', error)
      } finally {
        setIsCanceled(true)

        // setMessages((prev) => {
        //   if (prev[prev.length - 1].role === 'assistant' && prev[prev.length - 1].content === '') {
        //     return prev.slice(0, prev.length - 1)
        //   }

        //   return prev
        // })
      }
    }
  }

  const queryLLM = async (input: SubmitInput) => {
    // Reset the requests queue
    setTtsRequestsPending([])
    setIsCanceled(false)

    controller = new AbortController()
    const endpoint = import.meta.env.VITE_LLM_STREAM_URL

    oneClickActions.setStatus(BotStatus.THINKING)
    const history = setMessages((prev) => prev)

    const body = JSON.stringify({
      knowledgeBaseId: oneClickStore.activeChannel?.id,
      message: input.message,
      history,
      returnSpeech: false,
      callFraiaAI: oneClickStore.activeChannel?.shouldUseFraiaAPI,
      conversationId: oneClickStore.activeConversationId,
      overrideSystemInstruction: input.overrideSystemInstruction,
    })

    setMessages((prev) => [
      ...prev,
      {
        content: '',
        role: 'assistant',
        conversationId: oneClickStore.activeConversationId || '',
        displayName: oneClickStore.botDisplayName,
      },
    ])

    let botResponse = ''

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

      // Context variables for sentence building
      let sentenceBuffer = ''
      let htmlBuffer = ''
      let isProcessingHtmlTag = false

      // Initiates the response object
      oneClickActions.setStatus(BotStatus.ANSWERING)

      // Function to handle sentences for TTS
      const handleSentencesForTTS = async (chunk: string) => {
        const isSentenceBufferEnd = /[.!?]$/.test(chunk || '')

        // Check if the sentence includes a URL pattern
        const sentenceIncludesURL = /https?:\/\/[^\s]+/g.test(sentenceBuffer || '')

        if (sentenceBuffer.split(' ').length > 2 && isSentenceBufferEnd) {
          // This check is to prevent breaking up a URL with a period or question mark
          if (!sentenceIncludesURL) {
            if (input.withSpeech) {
              handleTTS(sentenceBuffer)
            }

            logDev('Fire sentence: ', sentenceBuffer)
            sentenceBuffer = ''
          }
        }
      }

      while (true) {
        const { value, done } = await reader.read()

        if (done) {
          if (sentenceBuffer) {
            // If the sentence buffer is not empty, fire the last sentence
            logDev('Is done, fire last sentence: ', sentenceBuffer)

            if (htmlBuffer || isProcessingHtmlTag) {
              logDev('Handling incomplete HTML buffering')

              setMessages((prev) => {
                prev[prev.length - 1].content += htmlBuffer

                return [...prev]
              })

              htmlBuffer = ''
              isProcessingHtmlTag = false
              oneClickActions.setOneClickStore('indicationMessage', null)
            }

            if (input.withSpeech) {
              handleTTS(sentenceBuffer)
            }

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
                    // Potentially, we have to update the displayName field of the latest message
                    setMessages((prev) => {
                      prev[prev.length - 1].displayName = oneClickStore.botDisplayName

                      return [...prev]
                    })
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

                    const initiateData = await initiateConversation(oneClickStore.activeChannel!)

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

                  if (!chunk.trim().endsWith('>')) {
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

                input.withSpeech && handleSentencesForTTS(chunk)
              })
            }

            if (parsedValue.audio.length > 0) {
              setAudio64((prev) => [...prev, ...parsedValue.audio!])
            }
          } catch (error) {
            logErrorToServer({
              error,
              priority: Priority.MEDIUM,
              context: {
                description: 'Error parsing LLM stream response',
                component: 'useLLM',
              },
            })
            oneClickActions.setStatus(BotStatus.IDLE)
          } finally {
          }
        }
      }
    } catch (error: any) {
      oneClickActions.setStatus(BotStatus.IDLE)

      if (error === 'QUERY_CANCELLED') {
        logDev('Query aborted')
        setMessages((prev) => {
          prev[prev.length - 1].content = ' '
          return prev
        })
      } else {
        logErrorToServer({
          error,
          priority: Priority.HIGH,
          context: {
            description: 'Error fetching LLM stream',
            component: 'useLLM',
          },
          showToast: false,
        })
      }
    } finally {
      // If the bot response is empty, set a default message
      if (!botResponse) {
        setMessages((prev) => {
          // Only set the default message if the last message is from the assistant and is empty
          if (prev[prev.length - 1].role === 'assistant' && prev[prev.length - 1].content === '') {
            prev[prev.length - 1].content =
              'I am sorry, I am unable to process your request at the moment.'
          }

          return prev
        })
      }

      if (!input.withSpeech) {
        oneClickActions.setStatus(BotStatus.IDLE)
      }
    }
  }

  const submitNewMessage = async (input: SubmitInput): Promise<string> => {
    props.onSubmit?.(input)
    const data = await queryLLM(input)
    props.onSuccess?.(data || '')

    return data || ''
  }

  return { submitNewMessage, cancelQuery }
}
