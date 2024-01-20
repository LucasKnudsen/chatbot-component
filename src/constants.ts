import { ChatConfig } from './features/portal-init'

type DefaultChatFlowsKeys = 'fraia_prod' | 'fraia_dev' | 'private'

// The props needs to be instantiated with the default values, otherwise it won't be filled from the Object.assign
export const defaultBotProps: ChatConfig = {
  hostId: '',
  spaceId: '',
  // text: undefined,
  // channelId: '',
  // language: undefined,
  // themeId: undefined,
  // theme: undefined,

  // initialPrompts: undefined,
  // settings: undefined,
}

export const chatflows: Record<DefaultChatFlowsKeys, ChatConfig> = {
  // concordium: {
  //   chatflowid: 'e8ce12e8-1c2c-40c4-9c4d-70ab337caee9',
  //   apiHost: 'http://aiassistant.lionbrain.ai:3000',
  // },
  // fraia_test: {
  //   chatflowid: 'ac2aa23a-5c82-4f50-8b7a-76f87887fc38',
  //   apiHost: 'https://lionbrain.softdesign.dk',
  // },
  private: {
    hostId: 'x',
    spaceId: 'x',
    config: {
      autoOpen: true,
    },
  },
  fraia_prod: {
    hostId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    spaceId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
  },
  fraia_dev: {
    hostId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    spaceId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
  },
}
