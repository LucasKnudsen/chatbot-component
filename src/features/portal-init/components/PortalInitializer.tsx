import { BotManager, SYSTEM_DEFAULT_LANGUAGE, useLanguage } from '../../bot'
import {
  ChatConfig,
  PortalButton,
  PortalContainer,
  configStore,
  configStoreActions,
  initializeConfig,
} from '..'

import { AuthProvider } from '@/features/authentication'
import { Nav } from '@/components/nav'
import { Show } from 'solid-js'
import { TypingBubble } from '@/components'
import { createQuery } from '@/hooks'
import { themes } from '@/features/theme'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'

export const PortalInitializer = (props: ChatConfig) => {
  const { initTheme, theme } = useTheme()
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

  const assignTheme = theme()

  return (
    <>
      <style>
        {`
          :host, :root {
            --primaryColor: ${assignTheme.primaryColor};
            --primaryAccent: ${assignTheme.primaryAccent};
            --textColor: ${assignTheme.textColor};
            --textSecondary: ${assignTheme.textSecondary};
            --onPrimary: ${assignTheme.onPrimary};
            --backgroundColor: ${assignTheme.backgroundColor};
            --backgroundAccent: ${assignTheme.backgroundAccent};
            --bubbleButtonColor: ${assignTheme.bubbleButtonColor};
            --drawerBackground: ${assignTheme.drawerBackground};
            --borderColor: ${assignTheme.borderColor};
            --textInputTextColor: ${assignTheme.textInputTextColor};
            --textInputBackgroundColor: ${assignTheme.textInputBackgroundColor};
            --errorColor: ${assignTheme.errorColor};
            --surfaceBackground: ${assignTheme.surfaceBackground};
            --surfaceHoveredBackground: ${assignTheme.surfaceHoveredBackground};
          }
        `}
      </style>

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
              <div
                class='flex flex-col h-full w-full overflow-hidden animate-fade-in backdrop-blur-lg'
                style={{ background: 'rgba(223, 221, 232, 0.4)' }}
              >
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
