import {
  ChatConfig,
  PortalButton,
  PortalContainer,
  configStore,
  configStoreActions,
  initializeConfig,
} from '..'
import { BotManager, FraiaLoading, SYSTEM_DEFAULT_LANGUAGE, botStore, useLanguage } from '../../bot'

import { Nav } from '@/components/nav'
import { AuthProvider } from '@/features/authentication'
import { useText } from '@/features/text'
import { themes } from '@/features/theme'
import { useTheme } from '@/features/theme/hooks'
import { Channel } from '@/graphql'
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
      {/* Shows loading while the config is being fetched and autoOpen is true as to not just show a blank screen */}
      <Show when={configQuery.isLoading() && props.config?.autoOpen}>
        <FraiaLoading />
      </Show>

      <Show when={configQuery.data()}>
        <PortalButton />

        <PortalContainer>
          <AuthProvider isPublic={Boolean(configQuery.data()?.isPublic)}>
            <Show when={configStore.isBotOpened}>
              <div class='fixed top-0 left-0 flex flex-row flex-nowrap h-full w-full overflow-hidden animate-fade-in '>
                <div class='flex flex-col w-full h-full '>
                  <Nav />

                  <BotManager />
                </div>

                <DrawerMenu />
              </div>
            </Show>
          </AuthProvider>
        </PortalContainer>
      </Show>
    </>
  )
}

const DrawerMenu = () => {
  return (
    <div
      class={`h-screen overflow-hidden px-5 transition-all ]
                  justify-center items-center 
                  border-l border-[var(--borderColor)]
                  `}
      style={{
        width: botStore.activeChannel ? '82px' : '0',
      }}
    >
      <div
        class={`w-9 h-9 rounded-full hover:cursor-pointer border-white border
                    hover:outline-4 outline outline-transparent hover:outline-[var(--surfaceHoveredBackground)] transition`}
        style={{
          'background-image':
            (botStore.activeChannel as Channel)?.avatar ||
            'linear-gradient(to right, #ed4264, #ffedbc)',
        }}
      ></div>
    </div>
  )
}
