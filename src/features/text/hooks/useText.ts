import { createSignal } from 'solid-js'
import { Language, TextTemplate } from '..'
import { en } from '../templates'

const SYSTEM_LANGUAGE = 'en' as const

const [text, setText] = createSignal<TextTemplate>(en)

export const useText = () => {
  const initText = (defaultLanguage?: string, textOverrides: Partial<TextTemplate> = {}) => {
    let text = {
      ...(Language as { [key: string]: TextTemplate })[defaultLanguage || SYSTEM_LANGUAGE],
      ...textOverrides,
    }

    setText(text)
  }

  return { text, initText }
}
