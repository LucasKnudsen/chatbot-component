/* eslint-disable solid/reactivity */

import { ChatConfig } from './features/portal-init'

// export const initFull = (props: BotProps & { id?: string }) => {
//   const fullElement = props.id
//     ? document.getElementById(props.id)
//     : document.querySelector('fraia-fullchatbot')
//   if (!fullElement) throw new Error('<fraia-fullchatbot> element not found.')
//   Object.assign(fullElement, props)
// }

export const init = (props: ChatConfig) => {
  const element = document.createElement('fraia-chatbot')
  Object.assign(element, props)
  document.body.appendChild(element)
}

type Chatbot = {
  // initFull: typeof initFull
  init: typeof init
}

declare const window:
  | {
      Chatbot: Chatbot | undefined
    }
  | undefined

export const parseChatbot = () => ({
  // initFull,
  init,
})

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === 'undefined') return
  window.Chatbot = { ...bot }
}
