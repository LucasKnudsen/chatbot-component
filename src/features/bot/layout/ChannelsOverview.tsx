import { setIsLoadingSocket } from '@/features/messages'
import { useTheme } from '@/features/theme'
import { Channel, ChannelUserAccess, ChatSpace } from '@/graphql'
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
  const { theme } = useTheme()

  const handleClick = async () => {
    if (props.isPublic) {
      setIsLoadingSocket(true)
      botStoreActions.initBotStore(props.channel as Channel)
    } else {
      // Get Channel data through Lambda
      const channelDetails = await fetchChannelDetails(
        (props.channel as ChannelUserAccess).channelId
      )

      if (!channelDetails) {
        // Handle error
        return
      }

      setIsLoadingSocket(true)
      botStoreActions.initBotStore(channelDetails)
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
      {(props.channel as Channel).name || (props.channel as ChannelUserAccess).channelName}
    </button>
  )
}
