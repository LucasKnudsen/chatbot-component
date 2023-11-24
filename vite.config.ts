import path from 'path'
import { UserConfig, defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(({ mode }) => {
  let defineConfig: UserConfig['define'] = {
    // Fixes a script runtime error that "process is not defined"
    'process.env.NODE_ENV': JSON.stringify('production'),
  }

  if (mode === 'development') {
    defineConfig = {
      ...defineConfig,
      // Definitions specific to development mode
      global: {},
    }
  }

  return {
    plugins: [solid()],
    build: {
      lib: {
        name: 'Chatbot',
        entry: path.resolve(__dirname, 'src/web.ts'),
      },
    },
    define: defineConfig,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
  }
})
