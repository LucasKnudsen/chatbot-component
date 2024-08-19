/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

// import { defaultTheme as theme } from './src/features/theme/themes.ts'

function rem2px(input, fontSize = 16) {
  if (input == null) {
    return input
  }
  switch (typeof input) {
    case 'object':
      if (Array.isArray(input)) {
        return input.map((val) => rem2px(val, fontSize))
      }
      // eslint-disable-next-line no-case-declarations
      const ret = {}
      for (const key in input) {
        ret[key] = rem2px(input[key], fontSize)
      }
      return ret
    case 'string':
      return input.replace(/(\d*\.?\d+)rem$/, (_, val) => `${parseFloat(val) * fontSize}px`)
    case 'function':
      return eval(
        input.toString().replace(/(\d*\.?\d+)rem/g, (_, val) => `${parseFloat(val) * fontSize}px`)
      )
    default:
      return input
  }
}

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    ...rem2px(defaultTheme),
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-slow': 'fade-in 1s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%', // add required value here
          },
        },
      },
      translate: {
        '-1/2': '-50%',
      },
      // colors: theme,
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
