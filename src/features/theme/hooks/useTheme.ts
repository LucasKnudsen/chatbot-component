import { ChatSpaceTheme } from '@/graphql/types'
import { isEmpty } from 'lodash'
import { createSignal } from 'solid-js'
import { Theme, defaultTheme } from '..'
import { themes } from '../themes' // Direct import to mitigate init error

const [theme, setTheme] = createSignal<Theme>(themes.bubbles)

export const useTheme = () => {
  const initTheme = (
    themeKey?: keyof typeof themes | null,
    themeOverrides?: ChatSpaceTheme | null
  ) => {
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
    injectIntoRoot(theme)
  }

  return { theme, initTheme }
}

const injectIntoRoot = (theme: Theme) => {
  const styleElement = document.createElement('style')
  styleElement.textContent = `
      :host, :root {
        ${Object.entries(theme)
          .map(([key, value]) => typeof value === 'string' && `--${key}: ${value};`)
          .join('\n')}
      }
    `

  console.log('styleElement', styleElement)

  document.head.appendChild(styleElement)
}
