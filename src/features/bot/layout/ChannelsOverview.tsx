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
    <div class='flex flex-col h-full pt-[106px] pb-10 px-[100px] animate-fade-in'>
      <h1 class='text-5xl font-light mb-[50px]'>
        Please choose the{' '}
        <span class='font-bold text-[var(--primaryColor)]'>FRAIA AI knowledge hub</span> <br /> you
        want to use :
      </h1>

      <div class='flex flex-wrap gap-x-[50px] overflow-x-auto overflow-y-hidden'>
        {props.channels?.map((channel) => (
          <ChannelItem channel={channel} isChatSpacePublic={props.chatSpace.isPublic} />
        ))}
      </div>

      <div class='text-center font-bold mt-auto underline text-[var(-textColor)]'>
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
  let getContentHeight: any

  const [height, setHeight] = createSignal(null)

  onMount(() => {
    getContentHeight = () => (ref ? `${ref.offsetHeight}px` : '0')
    setHeight(() => ref?.offsetHeight ?? (null as any))
    console.log(height())
  }) // div

  return (
    <div class='menu-card' onClick={() => channelDetailsMutation.mutateAsync()}>
      {channelDetailsMutation.isPending && <Spinner size={24} />}
      <div class='relative'>
        <h3 class='font-medium'>
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
          <h1 class='menu-card__title'>FRAIA.AI</h1>
          <span class='menu-card__icon'>
            <ArrowRightIcon />
          </span>
        </div>
        <div class='menu-card__divider'></div>
        <div ref={ref} class='menu-card__description'>
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
  )
}
