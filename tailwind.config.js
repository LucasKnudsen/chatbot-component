/** @type {import('tailwindcss').Config} */

// import { defaultTheme as theme } from './src/features/theme/themes.ts'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // ...rem2px(defaultTheme),
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
