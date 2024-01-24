import awsconfig from '@/aws-exports'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { Show, Suspense, createResource, createSignal } from 'solid-js'
import { BotManager } from '../../bot'

import { TypingBubble } from '@/components'
import { Nav } from '@/components/Nav'
import { AuthProvider } from '@/features/authentication'
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
  const [chatSpaceError, setChatSpaceError] = createSignal(false)
  const { initTheme, theme } = useTheme()
  const { initText } = useText()

  const [data] = createResource(async () => {
    // Gets ChatSpace information
    setChatSpaceError(false)

    const result = await initializeConfig(props.spaceId)

    if (result.status != 200 || !result.data) {
      console.error('Error initializing config', result.error)
      setChatSpaceError(true)
      return
    }

    const { themeId, theme, defaultLanguage, text } = result.data

    initTheme(themeId, theme)
    initText(text, defaultLanguage || 'en')

    if (props.config?.autoOpen) {
      configStoreActions.toggleBot()
    }

    return result.data
  })

  return (
    <>
      <StyleSheet />

      <TrackingProvider />

      <Suspense
        fallback={
          // Show loading screen if autoOpen is true
          props.config?.autoOpen && (
            <div class='fixed w-full h-full flex flex-col justify-center items-center  animate-fade-in gap-4 bg-slate-100'>
              <h1 class='text-5xl tracking-wider'>Chula Knowledge Hub</h1>

              <p>
                Powered by{' '}
                <span
                  style={{
                    color: theme().primaryColor,
                  }}
                  class='font-bold'
                >
                  Fraia
                </span>
              </p>

              <TypingBubble />
            </div>
          )
        }
      >
        {/* Dont initiate bot if there is a chat space error */}
        <Show when={!chatSpaceError()}>
          {Boolean(data())}

          <BubbleButton />

          <div
            class={`fixed top-0 left-0 w-screen m-0 min-h-[-webkit-fill-available] h-full ${
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
            <AuthProvider isPublic={Boolean(data()?.isPublic)}>
              <Show when={configStore.isBotOpened}>
                <div
                  class={
                    'fixed top-0 left-0 flex flex-col h-full w-full overflow-hidden animate-fade-in '
                  }
                >
                  <Nav />

                  <BotManager {...data()!} />
                </div>
              </Show>
            </AuthProvider>
          </div>
        </Show>
      </Suspense>
    </>
  )
}
