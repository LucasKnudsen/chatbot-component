import { Channel, ChannelUserAccess } from '@/graphql'
import { isValidURL } from '@/utils/isValidUrl'
import { configStore } from '../portal-init'
import { fetchChannelDetails } from './services'
import { botStoreActions } from './stores'
import dynamicVoiceSymbol from '@/assets/oneClick/dynamicVoiceSymbol.mp4'

export const getAvatarStyle = (avatar?: string | null) => {
  if (!avatar) return 'linear-gradient(to right, #ed4264, #ffedbc)'

  // Either the avatar is a URL or a gradient
  if (isValidURL(avatar)) {
    return `url(${avatar})`
  } else if (avatar) {
    return avatar
  }
}

export const getAvatarStyleOneClickMode = (avatar?: string | null) => {
  if (avatar && isValidURL(avatar)) {
    return { type: 'image', source: avatar };
  } else {
    return { type: 'video', source: dynamicVoiceSymbol };
  }
}

export const selectActiveChannel = async (channel: Channel | ChannelUserAccess) => {
  const isChatSpacePublic = configStore.chatSpaceConfig.isPublic
  let _channel = channel as Channel

  if (!isChatSpacePublic) {
    _channel = await fetchChannelDetails((channel as ChannelUserAccess).channelId)
  }

  await botStoreActions.initBotStore(_channel, channel as ChannelUserAccess)

  return _channel
}
