import { ChatConfig } from './features/portal-init'

// The props needs to be instantiated with the default values, otherwise it won't be filled from the Object.assign
export const defaultBotProps: ChatConfig = {
  spaceId: '',
  config: {},
  // text: undefined,
  // channelId: '',
  // language: undefined,
  // themeId: undefined,
  // theme: undefined,

  // initialPrompts: undefined,
  // settings: undefined,
}

export const chatflows: Record<string, ChatConfig> = {
  // concordium: {
  //   chatflowid: 'e8ce12e8-1c2c-40c4-9c4d-70ab337caee9',
  //   apiHost: 'http://aiassistant.lionbrain.ai:3000',
  // },
  // fraia_test: {
  //   chatflowid: 'ac2aa23a-5c82-4f50-8b7a-76f87887fc38',
  //   apiHost: 'https://lionbrain.softdesign.dk',
  // },
  private: {
    spaceId: 'f05d64f3-6d58-49d1-8143-d59caa88fd1f',
    config: {
      autoOpen: true,
    },
  },
  chula: {
    spaceId: 'a05d64f3-6d58-49d1-8143-d59caa88fd1f',
    config: {
      autoOpen: false,
    },
  },
  fraia_prod: {
    spaceId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    config: {
      autoOpen: false,
    },
  },
  fraia_dev: {
    spaceId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    config: {
      autoOpen: false,
    },
  },
}
