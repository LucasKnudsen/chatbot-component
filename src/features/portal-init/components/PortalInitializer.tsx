import awsconfig from '@/aws-exports'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { Show, Suspense, createResource } from 'solid-js'
import { BotManager } from '../../bot'

import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { TrackingProvider } from '@/features/tracking'
import StyleSheet from '@/styles'
import { Amplify } from 'aws-amplify'
import { ChatConfig, configStore, configStoreActions, initializeConfig } from '..'
import { BubbleButton } from './BubbleButton'

Amplify.configure(awsconfig)

try {
  Predictions.addPluggable(new AmazonAIConvertPredictionsProvider())
} catch (error) {}

export const PortalInitializer = (props: ChatConfig) => {
  const { initTheme, theme } = useTheme()
  const { initText } = useText()

  const [data] = createResource(async () => {
    // Gets ChatSpace information
    const result = await initializeConfig(props.hostId, props.spaceId)

    if (result.status != 200 || !result.data) {
      // TODO: handle error
      console.error('Error initializing config', result.error)
      return
    }

    const { themeId, theme, language, settings, text } = result.data

    initTheme(themeId, theme)
    initText(text, language || 'en')

    if (settings?.autoOpen) {
      configStoreActions.toggleBot()
    }

    return result.data
  })

  return (
    <>
      <StyleSheet />

      <TrackingProvider />

      <Suspense fallback='System Loader if autoOpen'>
        <BubbleButton />
        {data()?.isMultiChannel}

        <div
          class={`fixed top-0 left-0 w-screen m-0 min-h-[-webkit-fill-available] z-50 h-full ${
            configStore.isBotOpened ? 'opacity-1' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            transition: 'transform 350ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
            'transform-origin': 'bottom right',
            transform: configStore.isBotOpened ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
            color: theme().textColor,
            background: `${theme().backgroundColor} url(${
              theme().backgroundImageUrl
            }) no-repeat center / cover`,
            'z-index': 69420,
          }}
          part='bot'
        >
          <Show when={configStore.isBotOpened}>
            <BotManager {...data()!} />
          </Show>
        </div>
      </Suspense>
    </>
  )
}
