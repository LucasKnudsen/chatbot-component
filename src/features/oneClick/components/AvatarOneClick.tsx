import dynamicVoiceSymbol from '@/assets/oneClick/dynamicVoiceSymbol.mp4'
import { Fade } from '@/components'
import { createEffect, createSignal, Match, on, Switch } from 'solid-js'
import { heyGenStore } from '../store/heyGenStore'
import { oneClickStore } from '../store/oneClickStore'
import { BotStatus } from '../types'
import HeyGenAvatar from './HeyGen/HeyGenAvatar'

export const AvatarOneClick = () => {
  const { activeAgent } = oneClickStore

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
    <div
      class={`flex justify-center w-full overflow-hidden z-10 ${
        heyGenStore.isExpandAvatar ? 'h-full' : 'h-[calc(100%-40px)] rounded-xl'
      }`}
    >
      <Switch
        fallback={
          // Default blob animation
          <video
            ref={(el) => (videoRef = el)}
            id='one-click-entity'
            class='w-auto h-full object-cover scale-[2] md:scale-[1.7] lg:scale-[2]'
            autoplay={true}
            playsinline
            loop
            muted
            src={dynamicVoiceSymbol}
          />
        }
      >
        {/* When the active channel has an overrideConfig with voiceMode set to HEYGEN, render the HeyGenAvatar component */}
        <Match when={oneClickStore.isHeyGenMode}>
          <HeyGenAvatar />
        </Match>

        {/* When the active channel has an avatar, render the image */}
        <Match when={activeAgent?.avatar}>
          <ImageAvatar initialUrl={activeAgent!.avatar!} />
        </Match>
      </Switch>
    </div>
  )
}

const ImageAvatar = (props: { initialUrl: string }) => {
  const [url, setUrl] = createSignal(props.initialUrl)
  const [showAvatar, setShowAvatar] = createSignal<boolean>(true)
  const { activeAgent } = oneClickStore

  createEffect(
    on(
      () => activeAgent!.avatar,
      (newAvatar, oldAvatar) => {
        if (oldAvatar && newAvatar !== oldAvatar) {
          setShowAvatar(false)

          setTimeout(() => {
            setUrl(newAvatar!)
            setShowAvatar(true)
          }, 600)
        }
      }
    )
  )

  return (
    <Fade duration={600}>
      {showAvatar() && <img class='object-cover h-full w-full' src={url()} alt='avatarOneClick' />}
    </Fade>
  )
}
