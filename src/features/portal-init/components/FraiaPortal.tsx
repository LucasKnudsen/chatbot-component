import StyleSheet from '@/styles'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'

import { Amplify, Storage } from 'aws-amplify'
import { ChatConfig, PortalInitializer } from '..'
import awsconfig from '../../../amplifyconfiguration.json'

Amplify.configure({
  ...awsconfig,
})

Storage.configure({
  customPrefix: {
    public: '_/',
  },
  // ...
})

try {
  Predictions.addPluggable(new AmazonAIConvertPredictionsProvider())
} catch (error) {}

export const FraiaPortal = (props: ChatConfig) => {
  return (
    <>
      <StyleSheet />

      <PortalInitializer {...props} />
    </>
  )
}
