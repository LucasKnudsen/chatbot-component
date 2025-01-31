import { configStore } from '@/features/portal-init'
import { createEffect, createSignal, on, onMount } from 'solid-js'

export const SYSTEM_DEFAULT_LANGUAGE = 'en'

export const [currentLanguage, setLanguage] = createSignal<string>('')

export const useLanguage = () => {
  const storageKey = `${configStore.chatSpaceConfig.id}_DEFAULT_LANGUAGE`

  // const clear = () => {
  //   const newLanguage = languageOverride || SYSTEM_DEFAULT_LANGUAGE

  //   setLanguage(newLanguage)
  // }

  const initLanguage = (language: string) => {
    let defaultLanguage = localStorage.getItem(storageKey) || language || SYSTEM_DEFAULT_LANGUAGE

    setLanguage(defaultLanguage!)
  }

  onMount(() => {
    // Default language can be set by indivdual user, client override or system default
  })

  createEffect(
    on(currentLanguage, () => {
      localStorage.setItem(storageKey, currentLanguage())
    })
  )

  return { currentLanguage, initLanguage }
}
