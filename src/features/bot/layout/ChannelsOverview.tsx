import { setIsLoadingSocket } from '@/features/messages'
import { useTheme } from '@/features/theme'
import { Channel, ChannelUserAccess, ChatSpace } from '@/graphql'
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
        <h1 class='text-xl font-bold leading-tight tracking-tight '>Select a course</h1>

        {props.channels?.map((channel) => (
          <ChannelItem channel={channel} isPublic={props.chatSpace.isPublic} />
        ))}
      </div>
    </div>
  )
}

const ChannelItem = (props: { channel: Channel | ChannelUserAccess; isPublic: boolean }) => {
  const channelDetailsMutation = createMutation(() => ({
    mutationKey: ['channels', (props.channel as ChannelUserAccess).channelId],
    mutationFn: fetchChannelDetails,
    onSuccess(data) {
      console.log('Channel details fetched', data)
      botStoreActions.initBotStore(data)
    },
  }))

  const { theme } = useTheme()

  const handleClick = async () => {
    setIsLoadingSocket(true)

    if (props.isPublic) {
      botStoreActions.initBotStore(props.channel as Channel)
    } else {
      await channelDetailsMutation.mutateAsync((props.channel as ChannelUserAccess).channelId)
    }
  }

  return (
    <button
      class=' m-4 px-4 py-2 rounded-md'
      style={{
        background: theme()?.surfaceHoveredBackground,
        color: theme()?.textColor,
      }}
      onClick={handleClick}
    >
      {channelDetailsMutation.isPending && (
        <div class='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900'></div>
      )}
      {(props.channel as Channel).name || (props.channel as ChannelUserAccess).channelName}

      {channelDetailsMutation.isError && (
        <div class='text-red-500'>{channelDetailsMutation.error.message}</div>
      )}
    </button>
  )
}
