import { MuteIcon, SoundIcon } from '@/components'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Show, createSignal } from 'solid-js'

type SwitchMode = 'hasAvatar' | 'noAvatar'

export const MuteAISwitch = (props: { mode?: SwitchMode }) => {
  const { mode = 'noAvatar' } = props // Add default value for mode

  const [isMuted, setIsMuted] = createSignal(false)
  const [parent] = createAutoAnimate()

  const handleOnClick = () => {
    setIsMuted(!isMuted())
  }

  return (
    <>
      <style>
        {`
          .toggle {
            position: relative;
            width: 80px;
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
      <Show when={mode === 'hasAvatar'} keyed>
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
      <Show when={mode === 'noAvatar'} keyed>
        <div class='flex items-center gap-2'>
          <label class={`toggle ${isMuted() ? 'justify-start' : 'justify-end'}`}>
            <div>
              <span onClick={handleOnClick} class={`${isMuted() ? 'muted' : 'sound'}`}>
                {isMuted() ? <MuteIcon class='text-lg' /> : <SoundIcon class='text-lg' />}
              </span>
            </div>
          </label>
          <span>{isMuted() ? 'Unmute the AI' : 'Mute the AI'}</span>
        </div>
      </Show>
    </>
  )
}
