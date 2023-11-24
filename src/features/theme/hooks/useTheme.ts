import { createSignal } from 'solid-js'
import { Theme, defaultTheme, themes } from '..'

const [theme, setTheme] = createSignal<Theme>(defaultTheme)

export const useTheme = () => {
  const initTheme = (themeKey?: string, themeOverrides: Partial<Theme> = {}) => {
    let theme = defaultTheme

    if (themeKey) {
      theme = themes[themeKey] || defaultTheme
    }

    theme = { ...theme, ...themeOverrides }

    setTheme(theme)
  }

  return { theme, initTheme }
}
