import {
  ChatConfig,
  PortalButton,
  PortalContainer,
  configStore,
  configStoreActions,
  initializeConfig,
} from '..'
import { BotManager, SYSTEM_DEFAULT_LANGUAGE, useLanguage } from '../../bot'

import { TypingBubble } from '@/components'
import { Nav } from '@/components/nav'
import { AuthProvider } from '@/features/authentication'
import { useText } from '@/features/text'
import { themes } from '@/features/theme'
import { useTheme } from '@/features/theme/hooks'
import { createQuery } from '@/hooks'
import { Show } from 'solid-js'

export const PortalInitializer = (props: ChatConfig) => {
  const { initTheme } = useTheme()
  const { initText } = useText()
  const { initLanguage } = useLanguage()

  const configQuery = createQuery({
    queryFn: async () => {
      const result = await initializeConfig(props.spaceId)

      const { themeId, theme, defaultLanguage, text } = result

      configStoreActions.setConfigStore('chatSpaceConfig', result)

      initTheme(
        import.meta.env.DEV ? 'bubbles' : (themeId as keyof typeof themes),
        import.meta.env.DEV ? null : theme
      )
      initText(text, defaultLanguage || SYSTEM_DEFAULT_LANGUAGE)
      initLanguage(defaultLanguage || SYSTEM_DEFAULT_LANGUAGE)

      if (props.config?.autoOpen) {
        configStoreActions.toggleBot()
      }
      return result
    },
  })

  return (
    <>
      <Show
        when={configQuery.data()}
        fallback={
          <div class='fixed flex justify-between items-center h-full w-full p-10 lg:p-24'>
            <h1 class='text-[32px] leading-[54px] font-extralight text-[var(--primaryColor)]'>
              Welcome to <span class='font-medium'>Fraia Twin</span>
            </h1>

            <TypingBubble />
          </div>
        }
      >
        <PortalButton />

        <PortalContainer>
          <AuthProvider isPublic={Boolean(configQuery.data()?.isPublic)}>
            <Show when={configStore.isBotOpened}>
              <div class='fixed top-0 left-0 flex flex-col h-full w-full overflow-hidden animate-fade-in '>
                <Nav />

                <BotManager />
              </div>
            </Show>
          </AuthProvider>
        </PortalContainer>
      </Show>
    </>
  )
}
