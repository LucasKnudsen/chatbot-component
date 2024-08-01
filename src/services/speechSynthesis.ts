import { getAuthMode } from '@/features/authentication'
import { mutations, SpeechSynthesisMutation } from '@/graphql'
import { GraphQLQuery } from '@aws-amplify/api'

import { API } from 'aws-amplify'

export const speechSynthesis = async (
  text: string,
  knowledgeBaseId: string,
  requestIndex?: number
) => {
  const { data } = await API.graphql<GraphQLQuery<SpeechSynthesisMutation>>({
    query: mutations.speechSynthesis,
    variables: {
      input: {
        text,
        knowledgeBaseId,
        requestIndex,
      },
    },
    authMode: await getAuthMode(),
  })

  return data!.speechSynthesis
}
