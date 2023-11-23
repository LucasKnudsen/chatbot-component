import type { BubbleProps } from './features/bubble'

export const defaultBotProps: BubbleProps = {
  chatflowid: '',
  apiHost: '',
  chatflowConfig: undefined,
  theme: undefined,
}

export const chatflows = {
  concordium: {
    chatflowid: 'e8ce12e8-1c2c-40c4-9c4d-70ab337caee9',
    apiHost: 'http://aiassistant.lionbrain.ai:3000',
  },
  fraia_test: {
    chatflowid: 'ac2aa23a-5c82-4f50-8b7a-76f87887fc38',
    apiHost: 'https://lionbrain.softdesign.dk',
  },
}
