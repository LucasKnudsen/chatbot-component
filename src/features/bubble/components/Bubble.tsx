import awsconfig from '@/aws-exports'
import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { Show, Suspense, createResource, createSignal } from 'solid-js'
import { BotManager } from '../../bot/components/Bot'

import { TextConfig, useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { TrackingProvider } from '@/features/tracking'
import StyleSheet from '@/styles'
import { Amplify } from 'aws-amplify'
import { initializeConfig } from '..'
import { BubbleButton } from './BubbleButton'

Amplify.configure(awsconfig)

try {
  Predictions.addPluggable(new AmazonAIConvertPredictionsProvider())
} catch (error) {}

export type ChatConfig = {
  hostId: string
  spaceId: string
  text?: Partial<TextConfig>
}

export const Bubble = (props: ChatConfig) => {
  const [isBotStarted, setIsBotStarted] = createSignal(false)
  const [isBotOpened, setIsBotOpened] = createSignal(false)

  const [data] = createResource(async () => {
    const result = await initializeConfig(props.hostId, props.spaceId)

    if (result.status != 200 || !result.data) {
      // TODO: handle error
      return
    }

    const { themeId, theme, language, settings } = result.data

    initTheme(themeId, theme)
    initText(props.text, language || 'en')

    if (settings?.autoOpen) {
      openBot()
    }

    return result.data
  })

  const { initTheme, theme } = useTheme()
  const { initText } = useText()

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true)
    setIsBotOpened(true)

    document.body.style.overflow = 'hidden'
  }

  const closeBot = () => {
    setIsBotOpened(false)

    document.body.style.overflow = 'auto'
  }

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot()
  }

  return (
    <>
      <StyleSheet />

      <TrackingProvider />

      <Suspense>
        <BubbleButton toggleBot={toggleBot} isBotOpened={isBotOpened()} />
        {data()?.isMultiChannel}

        <div
          class={`fixed top-0 left-0 w-screen m-0 min-h-[-webkit-fill-available] z-50 h-full ${
            isBotOpened() ? 'opacity-1' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            transition: 'transform 350ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
            'transform-origin': 'bottom right',
            transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
            color: theme().textColor,
            background: `${theme().backgroundColor} url(${
              theme().backgroundImageUrl
            }) no-repeat center / cover`,
            'z-index': 69420,
          }}
          part='bot'
        >
          <Show when={isBotStarted()}>
            <BotManager {...data()!} toggleBot={toggleBot} />
          </Show>
        </div>
      </Suspense>
    </>
  )
}
