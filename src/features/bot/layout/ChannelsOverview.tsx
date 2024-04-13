import { Channel, ChannelUserAccess, ChatSpace } from '@/graphql'
import { Show, onMount } from 'solid-js'
import { botStoreActions, fetchChannelDetails } from '..'

import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { Spinner } from '@/components/loaders'
import { createMutation } from '@/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { getAvatarStyle } from '../utils'

type ChannelOverviewProps = {
  chatSpace: ChatSpace
  channels: Channel[] | ChannelUserAccess[] | undefined
}

export const ChannelsOverview = (props: ChannelOverviewProps) => {
  let wrapper: HTMLDivElement | undefined
  let content: HTMLDivElement | undefined
  let shadowLeft: HTMLDivElement | undefined
  let shadowRight: HTMLDivElement | undefined

  const device = useMediaQuery()

  onMount(() => {
    let contentScrollWidth = content?.scrollWidth ?? 0 - (wrapper?.scrollWidth ?? 0)

    if (content) {
      // check if overflow is present
      if (content.scrollWidth != Math.max(content.offsetWidth, content.clientWidth)) {
        // add initial style opacity to 1 in shadowRight
        if (shadowRight) shadowRight.style.opacity = '1'

        content.addEventListener('scroll', function () {
          let currentScroll = this.scrollLeft / contentScrollWidth

          if (shadowLeft) shadowLeft.style.opacity = currentScroll.toString()
          if (shadowRight) shadowRight.style.opacity = (1 - currentScroll).toString()
        })
      }
    }
  })

  return (
    <div
      data-testid='ChannelsOverview'
      class='h-screen w-screen overflow-y-auto py-[50px] sm:pt-16 sm:pb-10 px-[35px] md:px-[100px] animate-fade-in'
    >
      <h1 class='text-4xl sm:text-[64px] sm:leading-[70px] font-light mb-[50px] max-w-[1016px] w-full'>
        Please choose the
        <br />
        <span class='font-bold text-[var(--primaryColor)]'>FRAIA AI Knowledge Base</span>
        <br />
        you want to use:
      </h1>

      <div class='flex flex-col lg:flex-row gap-5 md:gap-10 lg:gap-[50px]'>
        <div ref={wrapper} class='relative min-w-0 overflow-hidden'>
          {/* <div
            ref={shadowLeft}
            class='absolute z-10 w-5 h-full top-0 left-0 bottom-0 opacity-0 hidden lg:block'
            style={{
              background: 'rgba(234, 233, 236, 0.14)',
            }}
          ></div> */}
          <div
            ref={content}
            class='flex flex-col sm:flex-row sm:grid sm:grid-cols-2 lg:flex lg:flex-nowrap gap-y-[30px] sm:gap-x-8 lg:gap-[50px] overflow-x-auto overflow-y-hidden brand-scroll-container pb-6'
          >
            {props.channels?.map((channel) => (
              <ChannelItem channel={channel} isChatSpacePublic={props.chatSpace.isPublic} />
            ))}
            <Show when={device() == 'tablet' || device() == 'mobile'}>
              <AddChannelItem />
            </Show>
          </div>
          {/* <div
            ref={shadowRight}
            class='absolute z-10 w-5 h-full top-0 right-0 bottom-0 opacity-0 hidden lg:block'
            style={{
              background: 'rgba(234, 233, 236, 0.14)',
            }}
          ></div> */}
        </div>
        <Show when={device() == 'desktop'}>
          <AddChannelItem />
        </Show>
      </div>

      <button class='fixed right-5 bottom-5 flex sm:hidden justify-center items-center shadow-lg rounded-full w-[45px] h-[45px] bg-[var(--primaryColor)]'>
        <svg
          class='w-5 h-5'
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
      </button>

      {/* <div class='text-center text-sm md:text-base font-bold mt-auto underline text-[var(--primaryColor)] pt-10'>
        Why I have to choose an AI?
      </div> */}
    </div>
  )
}

const ChannelItem = (props: {
  channel: Channel | ChannelUserAccess
  isChatSpacePublic: boolean
}) => {
  const channelDetailsMutation = createMutation({
    mutationFn: async () => {
      let _channel = props.channel as Channel

      if (!props.isChatSpacePublic) {
        _channel = await fetchChannelDetails((props.channel as ChannelUserAccess).channelId)
      }

      await botStoreActions.initBotStore(_channel, props.channel as ChannelUserAccess)

      return _channel
    },
  })

  let ref: HTMLDivElement | undefined

  //? will use if needed
  // const [height, setHeight] = createSignal(null)
  // onMount(() => {
  //   setHeight(() => ref?.offsetHeight ?? (null as any))
  // })

  console.log(props.channel)

  return (
    <div
      class={`menu-card group flex relative aspect-square ${
        channelDetailsMutation.isLoading() ? 'active' : ''
      }`}
      onClick={() => channelDetailsMutation.mutate()}
    >
      <div class='relative'>
        <h3 class='text-xs sm:text-sm md:text-base font-medium'>
          {(props.channel as Channel).subtitle ||
            (props.channel as ChannelUserAccess).channelSubtitle}
        </h3>

        {channelDetailsMutation.error() && (
          <div class='text-red-500'>{channelDetailsMutation.error().message}</div>
        )}
      </div>
      <div class='menu-card__content'>
        <div
          class='menu-card__avatar'
          style={{
            'background-size': 'contain',
            'background-image': getAvatarStyle(
              (props.channel as Channel).avatar ||
                (props.channel as ChannelUserAccess).channelAvatar
            ),
          }}
        ></div>

        <div class='menu-card__heading pr-8'>
          <h1 class='menu-card__title'>
            {' '}
            {(props.channel as Channel).name || (props.channel as ChannelUserAccess).channelName}
          </h1>
        </div>

        <div ref={ref} class='transition-all hidden lg:block h-0 group-hover:h-24 overflow-hidden'>
          <div class='menu-card__divider'></div>

          <div class='menu-card__description pr-8 pb-12'>
            <p class='line-clamp-2'>
              {(props.channel as Channel).description ||
                (props.channel as ChannelUserAccess).channelDescription}
            </p>
          </div>
        </div>
      </div>

      <span class='menu-card__icon'>
        {channelDetailsMutation.isLoading() ? <Spinner size={24} /> : <ArrowRightIcon />}
      </span>
    </div>
  )
}

const AddChannelItem = () => {
  return (
    <div class='menu-card hidden sm:flex items-center justify-center lg:min-w-[146px] lg:max-w-[146px]'>
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

        <span class='block text-sm sm:text-sm leading-[20px] lg:max-w-[145px] w-full'>
          Create a new knowledge base
        </span>
      </div>
    </div>
  )
}
