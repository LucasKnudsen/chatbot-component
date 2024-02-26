import awsconfig from '@/aws-exports'
import { TrackingProvider } from '@/features/tracking'
import StyleSheet from '@/styles'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Amplify } from 'aws-amplify'

import { ChatConfig, PortalInitializer } from '..'

Amplify.configure(awsconfig)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

try {
  Predictions.addPluggable(new AmazonAIConvertPredictionsProvider())
} catch (error) {}

export const FraiaPortal = (props: ChatConfig) => {
  console.log('Rendering FraiaPortal', props)
  return (
    <QueryClientProvider client={queryClient}>
      <StyleSheet />

      <TrackingProvider />

      <PortalInitializer {...props} />
    </QueryClientProvider>
  )
}
