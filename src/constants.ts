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
  staging: {
    spaceId: 'za5d64f3-6d58-49d1-8143-d59caa88fd1f',
    config: {
      autoOpen: true,
    },
  },
  testing: {
    spaceId: 'd52a53f0-d497-4e0a-b17d-d1d1eee4d16b',
    config: {
      autoOpen: false,
      startInFullscreen: false,
      overrideLogo: 'https://fraia-test-bucket.s3.ap-southeast-1.amazonaws.com/logo.svg',
      clientData: {
        name: 'John',
      },
    },
  },
  dev: {
    spaceId: 'a05d64f3-6d58-49d1-8143-d59caa88fd1f',
    config: {
      autoOpen: false,
      startInFullscreen: false,
      overrideLogo: 'https://fraia-test-bucket.s3.ap-southeast-1.amazonaws.com/logo.svg',
      clientData: {
        access_group_id: 'test',
        name: 'John',
      },
      styleConfig: {
        containerWidth: '500px',
        containerHeight: '680px',
      },
    },
  },
}
