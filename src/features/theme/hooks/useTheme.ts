import { createSignal } from 'solid-js'
import { Theme, defaultTheme, themes } from '..'

const [theme, _setTheme] = createSignal<Theme>(defaultTheme)

export const useTheme = () => {
  const setTheme = (themeKey?: string) => {
    if (!themeKey) return _setTheme(defaultTheme)

    const theme = themes[themeKey]

    if (theme) {
      _setTheme(theme)
    } else {
      console.warn(`Theme ${themeKey} not found, using default theme`)
      _setTheme(defaultTheme)
    }
  }

  return { theme, setTheme }
}
