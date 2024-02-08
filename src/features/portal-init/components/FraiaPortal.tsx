import awsconfig from '@/aws-exports'
import { TrackingProvider } from '@/features/tracking'
import StyleSheet from '@/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Amplify } from 'aws-amplify'
import { PortalInitializer } from '.'
import { ChatConfig } from '..'

Amplify.configure(awsconfig)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const FraiaPortal = (props: ChatConfig) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleSheet />

      <TrackingProvider />

      <PortalInitializer {...props} />
    </QueryClientProvider>
  )
}
