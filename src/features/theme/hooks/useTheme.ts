import { createSignal } from 'solid-js'
import { Theme, defaultTheme, themes } from '..'

const [theme, setTheme] = createSignal<Theme>(defaultTheme)

export const useTheme = () => {
  const setThemeFromKey = (themeKey?: string) => {
    if (!themeKey) return setTheme(defaultTheme)

    const theme = themes[themeKey]

    if (theme) {
      console.log(theme)

      setTheme(theme)
    } else {
      console.warn(`Theme ${themeKey} not found, using default theme`)
      setTheme(defaultTheme)
    }
  }

  return { theme, setThemeFromKey }
}
