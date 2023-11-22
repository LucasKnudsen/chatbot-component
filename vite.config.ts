import path from 'path'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      name: 'Chatbot',
      entry: path.resolve(__dirname, 'src/web.ts'),
    },
  },
  // define: {
  //   // Fixes the Amplify global issue
  //   global: {},
  //   // Fixes Amplify build issue 🤔 https://stackoverflow.com/questions/75925195/how-to-fix-vite-build-syntax-error-unexpected-token-in-third-party-dependenc
  //   _global: {},
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
})
