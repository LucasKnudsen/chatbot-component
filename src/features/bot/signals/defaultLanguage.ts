import { createSignal, onMount } from 'solid-js'

const SYSTEM_DEFAULT_LANGUAGE = 'en'

const [defaultLanguage, setDefaultLanguage] = createSignal<string>('')

export const useDefaultLanguage = (chatflowid: string) => {
  const storageKey = `${chatflowid}_DEFAULT_LANGUAGE`

  const clear = () => {
    const newDefaultLanguage = SYSTEM_DEFAULT_LANGUAGE

    localStorage.setItem(storageKey, newDefaultLanguage)

    setDefaultLanguage(newDefaultLanguage)
  }

  onMount(() => {
    let defaultLanguage = localStorage.getItem(storageKey) ?? SYSTEM_DEFAULT_LANGUAGE

    localStorage.setItem(storageKey, defaultLanguage)

    setDefaultLanguage(defaultLanguage!)
  })

  return { defaultLanguage, clear }
}
