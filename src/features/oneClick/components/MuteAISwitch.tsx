import { MuteIcon, SoundIcon } from '@/components'
import { VoiceMode } from '@/graphql'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { createSignal, Show } from 'solid-js'
import { oneClickStore } from '../store/oneClickStore'

export const [isMuted, setIsMuted] = createSignal<boolean>(false)
interface Props {
  onMute?: () => void
}
export const MuteAISwitch = (props: Props) => {
  const [parent] = createAutoAnimate()
  const [noAvatarParent] = createAutoAnimate()
  const [noAvatarTextParent] = createAutoAnimate()
  const { activeChannel } = oneClickStore
  const isHasAvatar =
    !!activeChannel?.avatar || activeChannel?.overrideConfig?.voiceMode === VoiceMode.HEYGEN

  const handleOnClick = () => {
    setIsMuted(!isMuted())
    props.onMute && props.onMute()
  }

  return (
    <>
      <style>
        {`
          .toggle {
            position: relative;
            width: 60px;
            height: 24px;
            display: inline-block;
            cursor: pointer;
            transform: scale(0.7);
            background-color: rgba(228, 228, 228, 1);
            border-radius: 20px;
            display: flex;
            align-items: center;
          }

          .muted {
            width: 35px;
            height: 35px;
            border-radius: 50px;
            background-color: white;
            border-radius: 50%;
            border: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid rgba(228, 228, 228, 1);
          }

          .sound {
           width: 35px;
            height: 35px;
            border-radius: 50px;
            background-color: rgba(91, 147, 255, 1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
          }

          .toggle input {
            position: absolute;
          }

          .avatar-wrapper {
            width: 110px;
          }
        `}
      </style>
      <Show when={isHasAvatar} keyed>
        <div
          ref={parent}
          onClick={handleOnClick}
          class='avatar-wrapper cursor-pointer flex gap-1 items-center justify-between border-white border rounded-3xl '
          style={{
            'background-color': 'rgba(228, 228, 228, 0.5)',
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <Show when={isMuted()} keyed>
            <span class='ml-2.5 text-sm'>Muted</span>
          </Show>
          <div>
            <span class={`${isMuted() ? 'muted' : 'sound'}`}>
              {isMuted() ? (
                <MuteIcon onClick={handleOnClick} />
              ) : (
                <SoundIcon onClick={handleOnClick} />
              )}
            </span>
          </div>
          <Show when={!isMuted()} keyed>
            <span class='mr-2.5 text-sm'>Unmuted</span>
          </Show>
        </div>
      </Show>

      <Show when={!isHasAvatar} keyed>
        <div class='flex items-center gap-1'>
          <div>
            <label
              class={`toggle ${isMuted() ? 'justify-start' : 'justify-end'}`}
              style={{
                transition: 'all 0.5s ease-in-out',
              }}
            >
              <div ref={noAvatarParent} class='cursor-pointer '>
                <Show when={isMuted()}>
                  <span
                    onClick={handleOnClick}
                    class={`${isMuted() ? 'muted' : 'sound'}  !w-[40px] !h-[40px]`}
                  >
                    {isMuted() ? <MuteIcon class='text-lg' /> : <SoundIcon class='text-lg' />}
                  </span>
                </Show>
                <Show when={!isMuted()}>
                  <span
                    onClick={handleOnClick}
                    class={`${isMuted() ? 'muted' : 'sound'}  !w-[40px] !h-[40px]`}
                  >
                    {isMuted() ? <MuteIcon class='text-lg' /> : <SoundIcon class='text-lg' />}
                  </span>
                </Show>
              </div>
            </label>
          </div>

          <span ref={noAvatarTextParent}>
            <Show when={isMuted()} keyed>
              <span class='text-sm'>Muted</span>
            </Show>
            <Show when={!isMuted()} keyed>
              <span class='text-sm'>Unmuted</span>
            </Show>
          </span>
        </div>
      </Show>
    </>
  )
}
