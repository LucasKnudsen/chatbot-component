import dynamicVoiceSymbol from '@/assets/oneClick/dynamicVoiceSymbol.mp4'
import { Fade } from '@/components'
import { createEffect, createSignal, Match, on, Switch } from 'solid-js'
import { oneClickStore } from '../../store/oneClickStore'
import { BotStatus } from '../../types'
import HeyGenAvatar from './HeyGen/HeyGenAvatar'

export const AvatarOneClick = () => {
  const { activeAgent } = oneClickStore

  let videoRef: HTMLVideoElement | null = null

  createEffect(
    on(
      () => oneClickStore.botStatus,
      () => {
        if (!videoRef) return

        switch (oneClickStore.botStatus) {
          case BotStatus.ANSWERING:
            videoRef.playbackRate = 2
            videoRef.classList.remove('animate-pulse')

            break

          case BotStatus.THINKING:
            videoRef.classList.add('animate-pulse')
            videoRef.playbackRate = 1.5

            break
          default:
            videoRef.playbackRate = 0.8
            videoRef.classList.remove('animate-pulse')
            break
        }
      }
    )
  )

  return (
    <div class={`h-full w-full flex items-center justify-center my-4 overflow-hidden rounded-xl`}>
      <Switch
        fallback={
          // Default blob animation
          <video
            ref={(el) => (videoRef = el)}
            // id={AI_VOICE_VISUALIZER_ID}
            class='w-auto h-full object-cover transition-all duration-1000 max-h-[340px]'
            autoplay={true}
            playsinline
            loop
            muted
            src={dynamicVoiceSymbol}
            style={{
              scale: oneClickStore.botStatus === BotStatus.ANSWERING ? 2.3 : 2,
            }}
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
      {showAvatar() && (
        <img class='object-cover h-full w-full rounded-xl' src={url()} alt='avatarOneClick' />
      )}
    </Fade>
  )
}
