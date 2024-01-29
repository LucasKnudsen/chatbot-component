import { AmazonAIConvertPredictionsProvider, Predictions } from '@aws-amplify/predictions'
import { createQuery } from '@tanstack/solid-query'
import { Match, Show, Switch } from 'solid-js'
import { BotManager, SYSTEM_DEFAULT_LANGUAGE, useLanguage } from '../../bot'

import { TypingBubble } from '@/components'
import { Nav } from '@/components/Nav'
import { AuthProvider } from '@/features/authentication'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { ChatConfig, PortalWrapper, configStore, configStoreActions, initializeConfig } from '..'
import { BubbleButton } from './BubbleButton'

try {
  Predictions.addPluggable(new AmazonAIConvertPredictionsProvider())
} catch (error) {}

export const PortalInitializer = (props: ChatConfig) => {
  const configQuery = createQuery(() => ({
    queryKey: ['chatSpace'],
    queryFn: async () => {
      const result = await initializeConfig(props.spaceId)

      const { themeId, theme, defaultLanguage, text } = result

      initTheme(themeId, theme)
      initText(text, defaultLanguage || SYSTEM_DEFAULT_LANGUAGE)
      initLanguage(defaultLanguage || SYSTEM_DEFAULT_LANGUAGE)
      configStoreActions.setConfigStore('chatSpaceConfig', result)

      if (props.config?.autoOpen) {
        configStoreActions.toggleBot()
      }

      return result
    },
  }))

  const { initTheme, theme } = useTheme()
  const { initText } = useText()
  const { initLanguage } = useLanguage()

  return (
    <Switch>
      <Match when={configQuery.isPending && props.config?.autoOpen}>
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
      </Match>
      <Match when={configQuery.isError}>{null}</Match>

      <Match when={configQuery.isSuccess && configQuery.data}>
        <BubbleButton />

        <PortalWrapper>
          <AuthProvider isPublic={Boolean(configQuery.data!.isPublic)}>
            <Show when={configStore.isBotOpened}>
              <div
                class={
                  'fixed top-0 left-0 flex flex-col h-full w-full overflow-hidden animate-fade-in '
                }
              >
                <Nav />

                <BotManager />
              </div>
            </Show>
          </AuthProvider>
        </PortalWrapper>
      </Match>
    </Switch>
  )
}
