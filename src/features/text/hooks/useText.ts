import { isEmpty } from 'lodash'
import { createSignal } from 'solid-js'
import { TextConfig } from '..'
import { Languages, defaultText } from '../templates'

const [text, setText] = createSignal<TextConfig>(defaultText)

export const useText = () => {
  const initText = (textOverrides: Partial<TextConfig> = {}, defaultLanguage?: string) => {
    let text = defaultText // system default to english

    const templateOverrides = Languages[defaultLanguage as keyof typeof Languages] || null

    if (templateOverrides) {
      text = { ...text, ...templateOverrides } // override with client default language
    }

    const nonEmptyTextOverrides = Object.entries<any>(textOverrides).reduce((acc, [key, value]) => {
      if (!isEmpty(value)) {
        acc[key as keyof TextConfig] = value
      }
      return acc
    }, {} as Partial<TextConfig>)

    if (nonEmptyTextOverrides) {
      text = { ...text, ...nonEmptyTextOverrides } // override with client text overrides
    }

    setText(text)
  }

  return { text, initText }
}
