import { MuteIcon, SoundIcon } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createSignal } from 'solid-js'
import { botStore } from '../../bot'

export const MuteAISwitch = () => {
  const [isMuted, setIsMuted] = createSignal(false)
  const [parent] = createAutoAnimate()
  const [noAvatarParent] = createAutoAnimate()
  const [noAvatarTextParent] = createAutoAnimate()
  const { activeChannel } = botStore
  const isHasAvatar = !!activeChannel?.avatar

  const handleOnClick = () => {
    setIsMuted(!isMuted())
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
            cursor: pointer;
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
            cursor: pointer;
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
          class='avatar-wrapper flex gap-1 items-center justify-between border-white border rounded-3xl '
          style={{
            'background-color': 'rgba(228, 228, 228, 0.5)',
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <Show when={isMuted()} keyed>
            <span class='ml-2.5'>Unmute</span>
          </Show>
          <div>
            <span class={`${isMuted() ? 'sound' : 'muted'}`}>
              {isMuted() ? (
                <SoundIcon onClick={handleOnClick} />
              ) : (
                <MuteIcon onClick={handleOnClick} />
              )}
            </span>
          </div>
          <Show when={!isMuted()} keyed>
            <span class='mr-2.5'>Mute</span>
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
              <div ref={noAvatarParent}>
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
              <span>Unmute</span>
            </Show>
            <Show when={!isMuted()} keyed>
              <span>Mute</span>
            </Show>
          </span>
        </div>
      </Show>
    </>
  )
}
