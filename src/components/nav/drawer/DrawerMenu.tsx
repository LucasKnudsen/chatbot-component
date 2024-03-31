import { botStore, botStoreActions, InteractionFlowSwitch } from '@/features/bot'
import { getAvatarStyle } from '@/features/bot/utils'
import { configStore, configStoreActions } from '@/features/portal-init'
import { ChannelAccessType } from '@/graphql'
import { createMemo, Show } from 'solid-js'
import { Divider } from '../../Divider'
import { ChatHistory } from './ChatHistory'

export const DrawerMenu = () => {
  const initiateNewChat = () => {
    botStoreActions.resetActiveChat()
    botStoreActions.setBotStore('isKnowledgeBaseOpen', false)
  }

  const hasWriteAccess = createMemo(() => {
    const access = botStore.activeChannel?.access?.accessType

    return (
      access === ChannelAccessType.ADMIN ||
      access === ChannelAccessType.OWNER ||
      access === ChannelAccessType.WRITE
    )
  })

  const openKnowledgeBase = () => {
    botStoreActions.toggleKnowledgeBase()
    configStoreActions.setConfigStore('isDrawerOpened', false)
  }

  return (
    <div class=' flex flex-col grow justify-between '>
      {/* NEW BUTTON  */}
      <div class='flex flex-col items-center gap-2 '>
        <Divider />

        <button
          class={`relative rounded-full font-semibold text-sm leading-[17px] active:scale-95
            bg-[var(--primaryColor)] text-[var(--onPrimary)] overflow-hidden
            transition-all hover:brightness-110 flex justify-between items-center
             disabled:bg-[var(--primaryColor)] disabled:cursor-not-allowed disabled:opacity-50
            `}
          style={{
            width: configStore.isDrawerOpened ? '100%' : '30px',
            height: '30px',
            padding: configStore.isDrawerOpened ? '0 16px' : '0',
          }}
          onClick={initiateNewChat}
          disabled={!Boolean(botStore.activeChannel?.activeChat)}
        >
          {/* PLUS svg  */}
          <svg
            class='transition-all'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            style={{
              width: configStore.isDrawerOpened ? '24px' : '30px',
              height: configStore.isDrawerOpened ? '24px' : '30px',
            }}
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.2'
              d='M12 7v10m-5-5h10'
            ></path>
          </svg>

          <span
            class='transition-all font-normal whitespace-nowrap'
            style={{
              opacity: configStore.isDrawerOpened ? 1 : 0,
              display: configStore.isDrawerOpened ? 'block' : 'none',
            }}
          >
            New chat
          </span>
        </button>

        <Divider />
      </div>

      {/* HISTORY */}
      <div
        class='brand-scroll-container flex grow overflow-y-auto overflow-x-hidden '
        style={{
          opacity: configStore.isDrawerOpened ? 1 : 0,
          width: configStore.isDrawerOpened ? '100%' : '0',
        }}
      >
        <ChatHistory />
      </div>

      <div class=''>
        {/* Switch between CHAT and VOICE flow  */}
        <Show when={configStore.isDrawerOpened}>
          <div class=' animate-fade-in '>
            <InteractionFlowSwitch onlyIcon />
          </div>
        </Show>

        {/* <Switch>
          <Match when={botStore.activeInteractionFlow === 'chat'}>
            <div>
              <MicrophoneIcon
                class='cursor-pointer hover:bg-[var(--surfaceHoveredBackground)] rounded-3xl px-4 py-1 w-12 h-12'
                onClick={() => {
                  botStoreActions.setBotStore('activeInteractionFlow', 'voice')
                }}
              />
            </div>
          </Match>

          <Match when={botStore.activeInteractionFlow === 'voice'}>
            <div>
              <MessageIcon
                class='cursor-pointer hover:bg-[var(--surfaceHoveredBackground)] rounded-3xl px-4 py-1 w-12 h-12'
                onClick={() => {
                  botStoreActions.setBotStore('activeInteractionFlow', 'chat')
                }}
              />
            </div>
          </Match>
        </Switch> */}

        {/* AVATAR BUTTON */}
        <Show when={hasWriteAccess()}>
          <Divider />

          <div
            class='flex items-center gap-4 cursor-pointer hover:bg-[var(--surfaceHoveredBackground)] rounded-3xl px-4 py-1 '
            onClick={openKnowledgeBase}
            style={{
              padding: configStore.isDrawerOpened ? '4px 16px' : '4px 0',
            }}
          >
            <div
              class={`w-9 h-9 rounded-full  border-white border transition`}
              style={{
                'background-image': getAvatarStyle(botStore.activeChannel?.avatar),
                'background-size': 'contain',
              }}
            ></div>

            <span
              class='transition-all text-[var(--primaryColor)] whitespace-nowrap'
              style={{
                opacity: configStore.isDrawerOpened ? 1 : 0,
                display: configStore.isDrawerOpened ? 'block' : 'none',
              }}
            >
              AI Profile
            </span>
          </div>
        </Show>
      </div>
    </div>
  )
}
