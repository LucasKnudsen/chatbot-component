import { BotProps } from '.'

// The props needs to be instantiated with the default values, otherwise it won't be filled from the Object.assign
export const defaultBotProps: BotProps = {
  channelId: '',
  language: undefined,
  themeId: undefined,
  theme: undefined,
  text: undefined,

  initialPrompts: undefined,
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
    channelId: '141aca34-5624-4441-87c8-62524f40ecd1',
  },
  fraia_dev: {
    channelId: 'c03c3bbc-935a-11ee-b9d1-0242ac120002',
  },
}
