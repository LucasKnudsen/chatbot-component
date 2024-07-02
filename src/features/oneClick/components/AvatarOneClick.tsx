import { createEffect, on } from 'solid-js'
import { getAvatarStyleOneClickMode } from '../../bot/utils'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'

export const AvatarOneClick = () => {
  const { activeChannel } = oneClickStore
  const { type, source } = getAvatarStyleOneClickMode(activeChannel?.avatar)

  let videoRef: HTMLVideoElement | null = null

  createEffect(
    on(
      () => oneClickStore.botStatus,
      () => {
        if (!videoRef) return

        if (oneClickStore.botStatus === BotStatus.ANSWERING) {
          videoRef.playbackRate = 2.5
        } else {
          videoRef.playbackRate = 0.8
        }
      }
    )
  )

  return (
    <div class='flex justify-center w-full h-full overflow-hidden rounded-xl z-10'>
      {type === 'image' ? (
        <img class='object-cover h-full w-full' src={source} alt='avatarOneClick' />
      ) : (
        <video
          ref={(el) => (videoRef = el)}
          id='one-click-entity'
          class='w-auto h-full object-cover scale-[2] md:scale-[1.7] lg:scale-[1.8]'
          autoplay={true}
          playsinline
          loop
          muted
          src={source}
        />
      )}
    </div>
  )
}
