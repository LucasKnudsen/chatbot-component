import { BotProps } from '.'

// The props needs to be instantiated with the default values, otherwise it won't be filled from the Object.assign
export const defaultBotProps: BotProps = {
  hostId: '',
  spaceId: '',

  channelId: '',
  language: undefined,
  themeId: undefined,
  theme: undefined,
  text: undefined,

  initialPrompts: undefined,
  settings: undefined,
}

export const chatflows: Record<string, BotProps> = {
  // concordium: {
  //   chatflowid: 'e8ce12e8-1c2c-40c4-9c4d-70ab337caee9',
  //   apiHost: 'http://aiassistant.lionbrain.ai:3000',
  // },
  // fraia_test: {
  //   chatflowid: 'ac2aa23a-5c82-4f50-8b7a-76f87887fc38',
  //   apiHost: 'https://lionbrain.softdesign.dk',
  // },
  fraia_prod: {
    hostId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    spaceId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    channelId: '141aca34-5624-4441-87c8-62524f40ecd1',
    settings: {
      autoOpen: true,
    },
  },
  fraia_dev: {
    hostId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    spaceId: 'f86f6a13-a58c-44d8-87cd-077f559fc0fc',
    channelId: 'c03c3bbc-935a-11ee-b9d1-0242ac120002',
  },
}
