import { createSignal, onMount } from 'solid-js'
import { ChatConfig, configStoreActions, initializeConfig } from '..'
import { SYSTEM_DEFAULT_LANGUAGE, useLanguage } from '../../bot'

import { useText } from '@/features/text'
import { themes } from '@/features/theme'
import { useTheme } from '@/features/theme/hooks'
import { createQuery } from '@tanstack/solid-query'

export const PortalInitializer = (props: ChatConfig) => {
  const [hasInitialized, setHasInitialized] = createSignal(false)

  onMount(async () => {
    console.log('Starting PortalInitializer')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Finished PortalInitializer')
    setHasInitialized(true)
  })

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
  console.log(hasInitialized())

  return (
    <>
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

      {configQuery.isPending ? <h1>LOADING</h1> : <h1>NOT LOADING</h1>}
    </>
  )
}

//  ;<Switch
//    fallback={
//      <div class='absolute top-[50%] left-[50%] h-10 z-[200]'>
//        <TypingBubble />
//        THIS IS FALLBACK
//      </div>
//    }
//  >
//    {/* LOADING ON AUTO OPEN (Make this UI equal to App.tsx)  */}
//    <Match when={configQuery.isPending}>
//      <div class='fixed flex justify-between items-center h-full w-full p-10 lg:p-24'>
//        <h1 class='text-[32px] leading-[54px] font-extralight text-[var(--primaryColor)]'>
//          Welcome to <span class='font-medium'>Fraia Twin</span>
//        </h1>

//        <TypingBubble />
//      </div>
//    </Match>

//    {/* ERROR - TODO  */}
//    <Match when={configQuery.isError}>
//      <div class='fixed w-full h-full flex flex-col justify-center items-center  animate-fade-in gap-4 bg-slate-100'>
//        {configQuery.error?.message}
//      </div>
//    </Match>
//  </Switch>
