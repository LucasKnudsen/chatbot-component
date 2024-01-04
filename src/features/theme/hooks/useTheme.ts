import { ChatSpaceTheme } from '@/graphql/types'
import { isEmpty } from 'lodash'
import { createSignal } from 'solid-js'
import { Theme, defaultTheme, themes } from '..'

const [theme, setTheme] = createSignal<Theme>(defaultTheme)

export const useTheme = () => {
  const initTheme = (themeKey?: string | null, themeOverrides?: ChatSpaceTheme | null) => {
    let theme = defaultTheme

    if (themeKey) {
      theme = themes[themeKey] || defaultTheme
    }

    if (themeOverrides) {
      const nonEmptyThemeOverrides = Object.entries<any>(themeOverrides).reduce(
        (acc, [key, value]) => {
          if (!isEmpty(value)) {
            acc[key as keyof Theme] = value
          }
          return acc
        },
        {} as Partial<Theme>
      )

      theme = { ...theme, ...nonEmptyThemeOverrides }
    }

    setTheme(theme)
  }

  return { theme, initTheme }
}
