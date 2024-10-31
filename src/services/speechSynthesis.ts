import { getAuthMode } from '@/features/authentication'
import { oneClickStore } from '@/features/oneClick'
import { mutations, SpeechSynthesisInput, SpeechSynthesisMutation } from '@/graphql'
import { GraphQLQuery } from '@aws-amplify/api'

import { API } from 'aws-amplify'

export const speechSynthesis = async (
  text: string,
  knowledgeBaseId: string,
  requestIndex?: number
) => {
  const { activeAgent } = oneClickStore
  // const cleanedText = cleanContentForSpeech(text)

  const input: SpeechSynthesisInput = {
    text,
    knowledgeBaseId,
    requestIndex,
    overrideConfig: activeAgent ? JSON.stringify(activeAgent) : undefined,
  }

  const { data } = await API.graphql<GraphQLQuery<SpeechSynthesisMutation>>({
    query: mutations.speechSynthesis,
    variables: {
      input,
    },
    authMode: await getAuthMode(),
  })

  return data!.speechSynthesis
}
