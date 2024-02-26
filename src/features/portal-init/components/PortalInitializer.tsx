import { Match, Show, Switch } from 'solid-js'
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
import { Nav } from '@/components/Nav'
import { AuthProvider } from '@/features/authentication'
import { useText } from '@/features/text'
import { themes } from '@/features/theme'
import { useTheme } from '@/features/theme/hooks'
import { createQuery } from '@tanstack/solid-query'

export const PortalInitializer = (props: ChatConfig) => {
  console.log('Rendering PortalInitializer')

  const configQuery = createQuery(() => ({
    queryKey: ['chatSpace', props.spaceId],
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
  }))

  const { initTheme, theme } = useTheme()
  const { initText } = useText()
  const { initLanguage } = useLanguage()

  const assignTheme = theme()

  console.log(configQuery)
  console.log('Is success', configQuery.isSuccess)
  console.log('Is pending', configQuery.isPending)

  return (
    <PortalContainer>
      <style>
        {`
          :host {
            --primaryColor: ${assignTheme.primaryColor};
            --primaryAccent: ${assignTheme.primaryAccent};
            --textColor: ${assignTheme.textColor};
            --textSecondary: ${assignTheme.textSecondary};
            --onPrimary: ${assignTheme.onPrimary};
            --backgroundColor: '${assignTheme.backgroundColor};
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

      <Switch
        fallback={
          <div class='absolute top-[50%] left-[50%] h-10 z-[200]'>
            <TypingBubble />
            THIS IS FALLBACK
          </div>
        }
      >
        {/* LOADING ON AUTO OPEN (Make this UI equal to App.tsx)  */}
        <Match when={configQuery.isPending && props.config?.autoOpen}>
          <div class='fixed flex justify-between items-center h-full w-full p-10 lg:p-24'>
            <h1 class='text-[32px] leading-[54px] font-extralight text-[var(--primaryColor)]'>
              Welcome to <span class='font-medium'>Fraia AI</span>
            </h1>

            <TypingBubble />
          </div>
        </Match>

        {/* ERROR - TODO  */}
        <Match when={configQuery.isError}>
          <div class='fixed w-full h-full flex flex-col justify-center items-center  animate-fade-in gap-4 bg-slate-100'>
            {configQuery.error?.message}
          </div>
        </Match>

        <Match when={configQuery.data}>
          <PortalButton />

          {/* <PortalContainer> */}
          <AuthProvider isPublic={Boolean(configQuery.data!.isPublic)}>
            <Show when={configStore.isBotOpened}>
              <div
                class='fixed top-0 left-0 flex flex-col h-full w-full overflow-hidden animate-fade-in backdrop-blur-lg'
                style={{ background: 'rgba(223, 221, 232, 0.4)' }}
              >
                <Nav />

                <BotManager />
              </div>
            </Show>
          </AuthProvider>
          {/* </PortalContainer> */}
        </Match>
      </Switch>
    </PortalContainer>
  )
}
