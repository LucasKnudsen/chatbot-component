import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'acmvin',
  e2e: {
    baseUrl: 'http://localhost:5173',
    includeShadowDom: true,
    supportFile: false,
  },
})
