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
  // Fixes the Amplify global issue
  define: {
    global: {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
})
