import { getAvatarStyleOneClickMode } from '../../bot/utils'
import { oneClickStore } from '../store/oneClickStore'

export const AvatarOneClick = () => {
  const { activeChannel } = oneClickStore
  const { type, source } = getAvatarStyleOneClickMode(activeChannel?.avatar)

  return (
    <div class='w-full h-full overflow-hidden rounded-xl z-10'>
      {type === 'image' ? (
        <img class='object-cover h-full w-full' src={source} alt='avatarOneClick' />
      ) : (
        <video
          class='w-full h-full object-cover'
          autoplay={true}
          loop
          muted
          src={source}
          style={{
            transform: 'scale(2)',
          }}
        />
      )}
    </div>
  )
}
