import { createEffect, createSignal, on, onMount } from 'solid-js'
import { botStore } from '..'

export const SYSTEM_DEFAULT_LANGUAGE = 'en'

export const [currentLanguage, setLanguage] = createSignal<string>('')

export const useLanguage = (languageOverride?: string) => {
  const storageKey = `${botStore.activeChannel.chatflowId!}_DEFAULT_LANGUAGE`

  const clear = () => {
    const newLanguage = languageOverride || SYSTEM_DEFAULT_LANGUAGE

    setLanguage(newLanguage)
  }

  onMount(() => {
    // Default language can be set by indivdual user, client override or system default
    let defaultLanguage =
      localStorage.getItem(storageKey) || languageOverride || SYSTEM_DEFAULT_LANGUAGE

    setLanguage(defaultLanguage!)
  })

  createEffect(
    on(currentLanguage, () => {
      localStorage.setItem(storageKey, currentLanguage())
    })
  )

  return { currentLanguage, clear }
}
