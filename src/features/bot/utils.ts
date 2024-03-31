import { isValidURL } from '@/utils/isValidUrl'

export const getAvatarStyle = (avatar?: string | null) => {
  if (!avatar) return 'linear-gradient(to right, #ed4264, #ffedbc)'

  // Either the avatar is a URL or a gradient
  if (isValidURL(avatar)) {
    return `url(${avatar})`
  } else if (avatar) {
    return avatar
  }
}
