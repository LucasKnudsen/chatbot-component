import { Channel, ChannelUserAccess } from '@/graphql'
import { Show, createSignal } from 'solid-js'
import { Menu, MenuItem, Popover, PopoverButton, PopoverPanel } from 'terracotta'

import { botStore } from '@/features/bot'
import { configStore } from '@/features/portal-init'
import { useMediaQuery } from '@/utils/useMediaQuery'
import usePopper from 'solid-popper'
import { Button } from '..'

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
      <Popover defaultOpen={false} class=' flex items-center'>
        {({ isOpen }) => (
          <>
            <PopoverButton ref={setAnchor}>
              <div class='flex items-center gap-x-2.5'>
                <span
                  class='w-6 h-6 rounded-full border border-[var(--onPrimary)]'
                  style={{
                    background: botStore.activeChannel?.avatar || '',
                  }}
                ></span>
                <span class='flex items-center gap-x-3.5 text-sm font-bold text-[var(--primaryColor)]'>
                  {/* Name  */}
                  {device() !== 'mobile' && botStore.activeChannel?.name}

                  {/* Chevron  */}
                  <svg
                    width='8'
                    height='7'
                    viewBox='0 0 8 7'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.55543 6.07566C4.75494 7.06601 3.24506 7.06601 2.44457 6.07566L0.570617 3.75724C-0.486531 2.44936 0.444343 0.5 2.12604 0.5L5.87396 0.500001C7.55566 0.500001 8.48653 2.44936 7.42938 3.75724L5.55543 6.07566Z'
                      fill='#5B93FF'
                    />
                  </svg>
                </span>
              </div>
            </PopoverButton>

            <Show when={isOpen()}>
              <PopoverPanel ref={setPopper} unmount={false} class='z-[100]'>
                <Menu class='p-6 w-[300px] border border-[var(--borderColor)] bg-[var(--backgroundColor)] bg-backgroundColor rounded-[10px]'>
                  <h5 class='text-[16px] leading-[20px] font-bold text-[rgba(166,166,166,1)] mb-5'>
                    Selected
                  </h5>

                  <MenuItem
                    as='button'
                    class='flex items-center text-[var(--primaryColor)] text-[14px] leading-[20px] font-bold w-full'
                  >
                    {botStore.activeChannel?.name}

                    <svg
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      class='ml-auto'
                    >
                      <rect width='18' height='18' rx='9' fill='#5B93FF' />
                      <path d='M6.5 9.5L7.875 11L11 7.5' stroke='#EAE9EC' stroke-linecap='round' />
                    </svg>
                  </MenuItem>

                  <Separator />
                  <div class='space-y-2.5'>
                    {configStore.channels
                      ?.filter(
                        (channel) =>
                          (channel as Channel).id !== botStore.activeChannel?.id &&
                          (channel as ChannelUserAccess).channelId !== botStore.activeChannel?.id
                      )
                      .map((channel) => (
                        <MenuItem
                          as='button'
                          class='flex items-center text-[var(--primaryColor)] text-[14px] leading-[20px] font-medium w-full'
                        >
                          {(channel as Channel).name || (channel as ChannelUserAccess).channelName}
                        </MenuItem>
                      ))}
                  </div>
                  <Separator />
                  <Button
                    class='relative w-full border border-[rgba(194,194,194,1)] font-bold cursor-pointer'
                    type='button'
                    padding='6px 14px'
                  >
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
