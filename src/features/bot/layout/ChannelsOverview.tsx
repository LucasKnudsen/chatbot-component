import { Channel, ChannelUserAccess, ChatSpace } from '@/graphql'
import { botStoreActions, fetchChannelDetails } from '..'
import { createSignal, onMount } from 'solid-js'

import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { Spinner } from '@/components/loaders'
import { createMutation } from '@tanstack/solid-query'

type ChannelOverviewProps = {
  chatSpace: ChatSpace
  channels: Channel[] | ChannelUserAccess[] | undefined
}

export const ChannelsOverview = (props: ChannelOverviewProps) => {
  return (
    <div class='flex flex-col h-full pt-10 md:pt-[106px] pb-10 px-[35px] md:px-[100px] animate-fade-in'>
      <h1 class='text-3xl sm:text-4xl md:text-5xl font-light mb-[50px] max-w-[1016px] w-full'>
        Please choose the{' '}
        <span class='font-bold text-[var(--primaryColor)]'>FRAIA AI knowledge hub</span> you want to
        use:
      </h1>

      <div class='grid grid-cols-2 md:flex flex-nowrap gap-5 md:gap-10 lg:gap-[50px] overflow-x-auto overflow-y-hidden pb-2'>
        {props.channels?.map((channel) => (
          <ChannelItem channel={channel} isChatSpacePublic={props.chatSpace.isPublic} />
        ))}
        <div class='menu-card flex items-center justify-center'>
          <div class='m-auto text-center'>
            <div class='flex items-center justify-center w-11 h-11 md:w-[54px] md:h-[54px] mx-auto mb-3 md:mb-[25px] bg-[var(--primaryColor)] rounded-full'>
              <svg
                class='w-5 h-5 md:w-6 md:h-6'
                width='25'
                height='25'
                viewBox='0 0 25 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.584 0V24.48H10.848V0H13.584ZM0 10.992H24.432V13.488H0V10.992Z'
                  fill='white'
                />
              </svg>
            </div>

            <span class='block text-sm md:text-base md:leading-[20px] max-w-[145px] w-full'>
              Create your own knowledge
            </span>
          </div>
        </div>
      </div>

      <div class='text-center text-sm md:text-base font-bold mt-auto underline text-[var(--primaryColor)] pt-10'>
        Why I have to choose an AI?
      </div>
    </div>
  )
}

const ChannelItem = (props: {
  channel: Channel | ChannelUserAccess
  isChatSpacePublic: boolean
}) => {
  const channelDetailsMutation = createMutation(() => ({
    mutationKey: ['channels', (props.channel as ChannelUserAccess).channelId],

    mutationFn: async () => {
      let _channel = props.channel as Channel

      if (!props.isChatSpacePublic) {
        _channel = await fetchChannelDetails((props.channel as ChannelUserAccess).channelId)
      }

      await botStoreActions.initBotStore(_channel)

      return _channel
    },
  }))

  let ref: HTMLDivElement | undefined

  const [height, setHeight] = createSignal(null)

  onMount(() => {
    setHeight(() => ref?.offsetHeight ?? (null as any))
  })

  return (
    <div class='menu-card aspect-square' onClick={() => channelDetailsMutation.mutateAsync()}>
      {channelDetailsMutation.isPending && <Spinner size={24} />}
      <div class='relative'>
        <h3 class='text-sm md:text-base font-medium'>
          {(props.channel as Channel).name || (props.channel as ChannelUserAccess).channelName}
        </h3>

        {channelDetailsMutation.isError && (
          <div class='text-red-500'>{channelDetailsMutation.error.message}</div>
        )}
      </div>
      <div
        class='menu-card__content'
        style={{
          '--hovered-translate-y': `${height()}px`,
        }}
      >
        <div class='menu-card__avatar'></div>
        <div class='menu-card__heading'>
          <h1 class='menu-card__title'>FRAIA.AI </h1>
          <span class='menu-card__icon'>
            <ArrowRightIcon />
          </span>
        </div>

        <div ref={ref}>
          <div class='menu-card__divider'></div>
          <div class='menu-card__description'>
            <p class='line-clamp-2'>
              {(props.channel as Channel).description ||
                (props.channel as ChannelUserAccess).channelDescription}
            </p>
          </div>
          <span class='menu-card__icon'>
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </div>
  )
}
