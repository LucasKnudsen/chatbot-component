import { Channel, ChannelUserAccess } from '@/graphql'
import { For, Show, createMemo, createSignal } from 'solid-js'
import { Menu, MenuItem, Popover, PopoverButton, PopoverPanel } from 'terracotta'

import { botStore } from '@/features/bot'
import { getAvatarStyle, selectActiveChannel } from '@/features/bot/utils'
import { clearChannelConnection } from '@/features/messages'
import { configStore } from '@/features/portal-init'
import { useMediaQuery } from '@/utils/useMediaQuery'
import usePopper from 'solid-popper'
import { Button, CheckIcon, ChevronIcon, Spinner } from '..'

function Separator() {
  return (
    <div class='flex items-center py-5' aria-hidden='true'>
      <div class='w-full border-t border-[var(--borderColor)]' />
    </div>
  )
}

export const ChannelMenu = () => {
  const [anchor, setAnchor] = createSignal<HTMLButtonElement>()
  const [popper, setPopper] = createSignal<HTMLDivElement>()

  const unselectedChannels = createMemo(() => {
    return configStore.channels?.filter(
      (channel) =>
        (channel as Channel).id !== botStore.activeChannel?.id &&
        (channel as ChannelUserAccess).channelId !== botStore.activeChannel?.id
    )
  })

  const device = useMediaQuery()

  usePopper(anchor, popper, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [60, 30],
        },
      },
      {
        name: 'preventOverflow',
        options: {},
      },
    ],
  })

  return (
    <Show when={configStore.chatSpaceConfig.isMultiChannel}>
      <Popover defaultOpen={false} class='flex items-center'>
        {({ isOpen, setState }) => (
          <>
            <PopoverButton ref={setAnchor}>
              <div class='flex items-center gap-x-2.5 group'>
                <span
                  class='w-6 h-6 rounded-full border border-[var(--onPrimary)]'
                  style={{
                    'background-size': 'contain',
                    'background-image': getAvatarStyle(botStore.activeChannel?.avatar),
                  }}
                ></span>
                <span class='flex items-center gap-x-3.5 text-sm font-semibold text-[var(--primaryColor)]'>
                  {/* Name  */}
                  {device() !== 'mobile' && botStore.activeChannel?.name}

                  {/* Chevron  */}
                  <ChevronIcon class='transition-all -rotate-90 group-hover:rotate-0 duration-300' />
                </span>
              </div>
            </PopoverButton>

            <Show when={isOpen()}>
              <PopoverPanel ref={setPopper} unmount={false} class='z-[100]'>
                <Menu class='p-6 w-[300px] border border-[var(--borderColor)] bg-[var(--backgroundColor)] bg-backgroundColor rounded-[10px]'>
                  <h5 class='text-[16px] leading-[20px] font-bold text-[rgba(166,166,166,1)] mb-5'>
                    Selected
                  </h5>

                  {/* SELECTED ITEM  */}
                  <MenuItem
                    as='button'
                    class='flex items-center text-[var(--primaryColor)] text-[14px] leading-[20px] font-bold w-full'
                  >
                    {botStore.activeChannel?.name}

                    <div class='bg-[var(--primaryColor)] rounded-full p-1 ml-auto'>
                      <CheckIcon class='w-3 h-3 text-[var(--onPrimary)]' />
                    </div>
                  </MenuItem>

                  <Separator />

                  <div class='space-y-2.5'>
                    <For each={unselectedChannels()}>
                      {(channel) => (
                        <UnselectedChannel channel={channel} closePopup={() => setState(false)} />
                      )}
                    </For>
                  </div>

                  <Separator />

                  <Button class='w-full ' type='button' padding='6px 14px' disabled>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      class='absolute left-3.5'
                    >
                      <path d='M5 12h14' />
                      <path d='M12 5v14' />
                    </svg>
                    Create a new AI
                  </Button>
                </Menu>
              </PopoverPanel>
            </Show>
          </>
        )}
      </Popover>
    </Show>
  )
}

const UnselectedChannel = (props: {
  channel: Channel | ChannelUserAccess
  closePopup: () => void
}) => {
  const [loading, setLoading] = createSignal(false)

  const handleChannelChange = async () => {
    setLoading(true)
    clearChannelConnection()

    await new Promise((resolve) => setTimeout(resolve, 250))

    await selectActiveChannel(props.channel)
    setLoading(false)
    props.closePopup()
  }
  return (
    <MenuItem
      as='button'
      onClick={() => handleChannelChange()}
      class='flex items-center justify-between p-1 text-[var(--primaryColor)] text-[14px] leading-[20px] font-medium w-full rounded-[10px] hover:bg-[var(--surfaceBackground)] hover:pl-2 transition-all'
    >
      {(props.channel as Channel).name || (props.channel as ChannelUserAccess).channelName}

      <Show when={loading()}>
        <Spinner size={20} />
      </Show>
    </MenuItem>
  )
}
