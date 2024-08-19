import { getAuthMode } from '@/features/authentication'
import { cleanContentForSpeech, oneClickStore } from '@/features/oneClick'
import { mutations, SpeechSynthesisMutation } from '@/graphql'
import { GraphQLQuery } from '@aws-amplify/api'

import { API } from 'aws-amplify'

export const speechSynthesis = async (
  text: string,
  knowledgeBaseId: string,
  requestIndex?: number
) => {
  const { activeAgent } = oneClickStore
  const cleanedText = cleanContentForSpeech(text)

  const { data } = await API.graphql<GraphQLQuery<SpeechSynthesisMutation>>({
    query: mutations.speechSynthesis,
    variables: {
      input: {
        text: cleanedText,
        knowledgeBaseId,
        requestIndex,
        overrideConfig: activeAgent ? JSON.stringify(activeAgent) : undefined,
      },
    },
    authMode: await getAuthMode(),
  })

  return data!.speechSynthesis
}
