import { botStore } from '../bot'
import { getAvatarStyleOneClickMode } from '../bot/utils'

export const AvatarOneClick = () => {
  const { activeChannel } = botStore;
  const {type, source} = getAvatarStyleOneClickMode(activeChannel?.avatar)

  
  return (
    <div class='w-full h-full overflow-hidden rounded-xl z-10'>
      {type === 'image' ? (
        <img class='object-cover h-full w-full' src={source} alt='avatarOneClick' />
      ): (
        <video class='w-full h-full object-cover' autoplay={true} loop muted src={source} style={{
          transform: 'scale(2)',
        }}/>
      )}
    </div>
  )
}
