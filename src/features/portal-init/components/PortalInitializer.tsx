import { OneClickContainer, OneClickManager } from '@/features/oneClick'
import { ChatConfig, PortalButton, configStore, configStoreActions, initializeConfig } from '..'
import { SYSTEM_DEFAULT_LANGUAGE, useLanguage } from '../../bot'

import { AuthProvider, authStoreActions } from '@/features/authentication'
import { useText } from '@/features/text'
import { themes } from '@/features/theme'
import { useTheme } from '@/features/theme/hooks'
import { createQuery } from '@/hooks'
import { logErrorMessage } from '@/utils'
import { Show } from 'solid-js'
import { Toaster } from 'solid-toast'

export const PortalInitializer = (props: ChatConfig) => {
  const { initTheme } = useTheme()
  const { initText } = useText()
  const { initLanguage } = useLanguage()
  const { chatSpaceConfig } = configStore

  const chatConfig = createQuery({
    queryFn: async () => {
      const result = await initializeConfig(props.spaceId)

      const { themeId, theme, defaultLanguage, text, isPublic } = result

      configStoreActions.setConfigStore('chatSpaceConfig', result)
      configStoreActions.setConfigStore('clientData', props.config?.clientData || {})
      configStoreActions.setConfigStore('styleConfig', props.config?.styleConfig || {})
      configStoreActions.setConfigStore(
        'isInFullScreenMode',
        props?.config?.startInFullscreen || false,
      )

      // If the chat is public, we don't need to authenticate the user
      authStoreActions.setAuthStore('shouldAuthenticate', !isPublic)

      initTheme(chatSpaceConfig.isOneClick ? 'oneClick' : (themeId as keyof typeof themes), theme)
      initText(text, defaultLanguage || SYSTEM_DEFAULT_LANGUAGE)
      initLanguage(defaultLanguage || SYSTEM_DEFAULT_LANGUAGE)

      if (props.config?.autoOpen) {
        configStoreActions.toggleBot()
      }

      return result
    },
    onError: (error) => {
      logErrorMessage(error, 'PortalInitializer.initialiseConfig')
    },
  })

  return (
    <>
      {/* Shows loading while the config is being fetched and autoOpen is true as to not just show a blank screen */}
      {/* <Show when={chatConfig.isLoading() && props.config?.autoOpen}>
        <FraiaLoading overrideLogo={props.config?.overrideLogo} />
      </Show> */}

      <Show when={chatConfig.data()}>
        {/* <Show when={false}> */}
        <PortalButton />

        {/* OneClickManager goes here  */}
        <OneClickContainer>
          <Toaster />

          <AuthProvider>
            <div
              data-testid='PortalInitializer'
              class='fixed top-0 left-0 rounded-xl flex flex-nowrap h-full w-full justify-center overflow-hidden animate-fade-in '
            >
              <OneClickManager overrideLogo={props.config?.overrideLogo} />
            </div>
          </AuthProvider>
        </OneClickContainer>

        {/* Traditional BotManager goes here */}
        {/* <Show when={!chatSpaceConfig.isOneClick}>
          <PortalContainer>
            <Toaster />

            <AuthProvider isPublic={Boolean(chatConfig.data()?.isPublic)}>
              <Show when={configStore.isBotOpened}>
                <div
                  data-testid='PortalInitializer'
                  class='fixed top-0 left-0 flex flex-nowrap h-full w-full overflow-hidden animate-fade-in '
                >
                  <div class='flex flex-col grow max-lg:overflow-hidden '>
                    <Nav />

                    <BotManager />
                  </div>

                  <NavigationDrawer />
                </div>
              </Show>
            </AuthProvider>
          </PortalContainer>
        </Show> */}
      </Show>
    </>
  )
}
