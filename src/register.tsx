import { customElement } from 'solid-element'
import { defaultBotProps } from './constants'
import { FraiaMain } from './features/portal-init'

export const registerWebComponents = () => {
  if (typeof window === 'undefined') return
  // customElement('fraia-fullchatbot', defaultBotProps, Full)

  customElement('fraia-chatbot', defaultBotProps, FraiaMain)
}
