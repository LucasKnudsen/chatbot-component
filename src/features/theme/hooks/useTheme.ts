import { createSignal } from 'solid-js'
import { Theme, defaultTheme, themes } from '..'

const [theme, setTheme] = createSignal<Theme>(defaultTheme)

export const useTheme = () => {
  const initTheme = (themeKey?: string, themeOverrides: Partial<Theme> = {}) => {
    if (!themeKey) return setTheme(defaultTheme)

    let theme = themes[themeKey] || defaultTheme

    console.log(themeOverrides)

    theme = { ...theme, ...themeOverrides }

    console.log(theme)

    setTheme(theme)
  }

  return { theme, initTheme }
}
