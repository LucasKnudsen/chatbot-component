import {
  ChatConfig,
  PortalButton,
  PortalContainer,
  configStore,
  configStoreActions,
  initializeConfig,
} from '..'
import { BotManager, FraiaLoading, SYSTEM_DEFAULT_LANGUAGE, useLanguage } from '../../bot'

import { Nav, NavigationDrawer } from '@/components/nav'
import { AuthProvider } from '@/features/authentication'
import { useText } from '@/features/text'
import { themes } from '@/features/theme'
import { useTheme } from '@/features/theme/hooks'
import { createQuery } from '@/hooks'
import { Show } from 'solid-js'
import { Toaster } from 'solid-toast'

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
      {/* Shows loading while the config is being fetched and autoOpen is true as to not just show a blank screen */}
      <Show when={configQuery.isLoading() && props.config?.autoOpen}>
        <FraiaLoading />
      </Show>

      <Show when={configQuery.data()}>
        <PortalButton />

        <PortalContainer>
          <Toaster />

          <AuthProvider isPublic={Boolean(configQuery.data()?.isPublic)}>
            <Show when={configStore.isBotOpened}>
              <div
                data-testid='PortalInitializer'
                class='fixed top-0 left-0 flex flex-nowrap h-full w-full overflow-hidden animate-fade-in '
              >
                <div class='flex flex-col grow overflow-hidden'>
                  <Nav />

                  <BotManager />
                </div>

                <NavigationDrawer />
              </div>
            </Show>
          </AuthProvider>
        </PortalContainer>
      </Show>
    </>
  )
}
