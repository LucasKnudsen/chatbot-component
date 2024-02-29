import { TrackingProvider } from '@/features/tracking'
import StyleSheet from '@/styles'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'

import { Amplify } from 'aws-amplify'
import { ChatConfig, PortalInitializer } from '..'
import awsconfig from '../../../aws-exports'

Amplify.configure({
  ...awsconfig,
})

try {
  Predictions.addPluggable(new AmazonAIConvertPredictionsProvider())
} catch (error) {}

export const FraiaPortal = (props: ChatConfig) => {
  return (
    // <QueryClientProvider client={queryClient}>
    <>
      <StyleSheet />

      <TrackingProvider />

      <PortalInitializer {...props} />
    </>

    // </QueryClientProvider>
  )
}
