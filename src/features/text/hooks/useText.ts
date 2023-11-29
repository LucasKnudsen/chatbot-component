import { createSignal } from 'solid-js'
import { Language, TextTemplate } from '..'
import { defaultText } from '../templates'

const [text, setText] = createSignal<TextTemplate>(defaultText)

export const useText = () => {
  const initText = (textOverrides: Partial<TextTemplate> = {}, defaultLanguage?: string) => {
    let text = defaultText // system default to english

    if (defaultLanguage) {
      text = { ...text, ...Language[defaultLanguage as keyof typeof Language] } // override with client default language
    }

    if (textOverrides) {
      text = { ...text, ...textOverrides } // override with client text overrides
    }

    setText(text)
  }

  return { text, initText }
}
