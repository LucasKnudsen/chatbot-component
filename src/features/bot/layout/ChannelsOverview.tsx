import { Spinner } from '@/components/loaders'
import { useTheme } from '@/features/theme'
import { Channel, ChannelUserAccess, ChatSpace } from '@/graphql'
import { useHovered } from '@/utils'
import { createMutation } from '@tanstack/solid-query'
import { botStoreActions, fetchChannelDetails } from '..'

type ChannelOverviewProps = {
  chatSpace: ChatSpace
  channels: Channel[] | ChannelUserAccess[] | undefined
}

export const ChannelsOverview = (props: ChannelOverviewProps) => {
  return (
    <div class='w-full h-full flex flex-col justify-center items-center animate-fade-in gap-4'>
      <div class='text-lg text-red-500 text-center'>
        <h1 class='text-xl  leading-tight tracking-tight '>Select a course</h1>

        {props.channels?.map((channel) => (
          <ChannelItem channel={channel} isChatSpacePublic={props.chatSpace.isPublic} />
        ))}
      </div>
    </div>
  )
}

const ChannelItem = (props: {
  channel: Channel | ChannelUserAccess
  isChatSpacePublic: boolean
}) => {
  const [hoverRef, isHovered] = useHovered()

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

  const { theme } = useTheme()

  return (
    <button
      ref={hoverRef}
      disabled={channelDetailsMutation.isPending}
      class=' m-4 px-4 py-2 rounded-md flex justify-center items-center gap-4 w-full'
      style={{
        background: isHovered() ? theme()?.surfaceHoveredBackground : theme()?.surfaceBackground,
        color: theme()?.textColor,
        border: `1px solid ${theme()?.borderColor}`,
      }}
      onClick={() => channelDetailsMutation.mutateAsync()}
    >
      {channelDetailsMutation.isPending && <Spinner size={24} />}
      <div class='relative'>
        <h3 class='text-md font-semibold'>
          {(props.channel as Channel).name || (props.channel as ChannelUserAccess).channelName}
        </h3>
        <p class='text-xs italic'>
          {(props.channel as Channel).description ||
            (props.channel as ChannelUserAccess).channelDescription}
        </p>

        {channelDetailsMutation.isError && (
          <div class='text-red-500'>{channelDetailsMutation.error.message}</div>
        )}
      </div>
    </button>
  )
}
