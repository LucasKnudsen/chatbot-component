import { MicrophoneIcon, MicrophoneOffIcon } from '@/components'
import { makePersisted } from '@solid-primitives/storage'
import { createSignal, Signal } from 'solid-js'

export const [isMuted, setIsMuted] = makePersisted(createSignal<boolean>(false), {
  name: 'isMuted',
}) as unknown as Signal<boolean>

interface Props {
  onMute?: () => void
}

export const MuteAISwitch = (props: Props) => {
  const handleOnClick = () => {
    setIsMuted((wasMuted) => {
      !wasMuted && props.onMute?.()

      return !wasMuted
    })
  }

  return (
    <>
      <div
        class={`flex justify-center items-center h-8 w-8 transition-all rounded-full ml-2 cursor-pointer  ${
          isMuted() ? 'bg-[var(--primaryColor)]' : 'bg-[var(--onPrimary)]'
        }`}
        onClick={handleOnClick}
      >
        {isMuted() ? (
          <MicrophoneOffIcon
            width={20}
            height={20}
            stroke-width={1.7}
            class='text-[var(--onPrimary)]'
          />
        ) : (
          <MicrophoneIcon
            width={20}
            height={20}
            stroke-width={1.7}
            class='text-[var(--primaryColor)]'
          />
        )}
      </div>
      {/* <style>
        {`
          .mute-switch-icon {
            width: 28px;
            height: 28px;
            border-radius: 100%;
            background-color: var(--primaryColor);
            border: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid var(--onPrimary);
          }


        `}
      </style>
      <div
        ref={parent}
        onClick={handleOnClick}
        class='avatar-wrapper cursor-pointer flex gap-1 items-center bg-[var(--surfaceHoveredBackground)] justify-between border-[var(--onPrimary)] border rounded-3xl w-24 h-6 '
        style={{
          transition: 'all 0.5s ease-in-out',
        }}
      >
        <Show when={isMuted()} keyed>
          <span class='ml-2.5 text-sm'>Muted</span>
        </Show>

        <div>
          <span class={`mute-switch-icon`}>
            {isMuted() ? (
              <MuteIcon onClick={handleOnClick} class='fill-[var(--onPrimary)]' />
            ) : (
              <SoundIcon onClick={handleOnClick} class='fill-[var(--onPrimary)]' />
            )}
          </span>
        </div>
        <Show when={!isMuted()} keyed>
          <span class='mr-2.5 text-sm'>Unmuted</span>
        </Show>
      </div> */}

      {/* <div class='flex items-center gap-1'>
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
        </div> */}
    </>
  )
}
