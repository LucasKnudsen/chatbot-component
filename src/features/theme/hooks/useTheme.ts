import { isEmpty } from 'lodash'
import { createSignal } from 'solid-js'
import { Theme, defaultTheme, themes } from '..'

const [theme, setTheme] = createSignal<Theme>(defaultTheme)

export const useTheme = () => {
  const initTheme = (themeKey?: string, themeOverrides: Partial<Theme> = {}) => {
    let theme = defaultTheme

    if (themeKey) {
      theme = themes[themeKey] || defaultTheme
    }

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

    setTheme(theme)
  }

  return { theme, initTheme }
}
