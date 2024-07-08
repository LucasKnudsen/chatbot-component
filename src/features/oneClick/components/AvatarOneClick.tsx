import dynamicVoiceSymbol from '@/assets/oneClick/dynamicVoiceSymbol.mp4'
import { VoiceMode } from '@/graphql'
import { Accessor, createEffect, Match, on, Switch } from 'solid-js'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'
import HeyGenAvatar from './HeyGen/HeyGenAvatar'

export const AvatarOneClick = (props: { botResponse?: Accessor<string> }) => {
  const { activeChannel } = oneClickStore

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
      <Switch
        fallback={
          <video
            ref={(el) => (videoRef = el)}
            id='one-click-entity'
            class='w-auto h-full object-cover scale-[2] md:scale-[1.7] lg:scale-[1.8]'
            autoplay={true}
            playsinline
            loop
            muted
            src={dynamicVoiceSymbol}
          />
        }
      >
        {/* When the active channel has an overrideConfig with voiceMode set to HEYGEN, render the HeyGenAvatar component */}
        <Match when={activeChannel?.overrideConfig?.voiceMode === VoiceMode.HEYGEN}>
          <HeyGenAvatar botResponse={props.botResponse} />
        </Match>

        {/* When the active channel has an avatar, render the image */}
        <Match when={activeChannel?.avatar}>
          <img
            class='object-cover h-full w-full'
            src={activeChannel!.avatar!}
            alt='avatarOneClick'
          />
        </Match>
      </Switch>
    </div>
  )
}
