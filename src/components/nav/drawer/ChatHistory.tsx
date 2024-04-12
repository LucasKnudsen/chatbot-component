import { ChatMessageIcon } from '@/components/icons'
import { botStore, botStoreActions } from '@/features/bot'
import { configStoreActions } from '@/features/portal-init'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme'
import { ChannelHistoryItem } from '@/graphql'
import { todayStartOfDay, yesterdayStartOfDay } from '@/utils'
import { For, Show, createMemo } from 'solid-js'

export const ChatHistory = () => {
  const { text } = useText()

  const todayChats = createMemo(() =>
    botStore.activeHistory.filter((h) => new Date(h.timestamp) >= todayStartOfDay())
  )

  const yesterdayChats = createMemo(() => {
    return botStore.activeHistory.filter(
      (h) =>
        new Date(h.timestamp) >= yesterdayStartOfDay() && new Date(h.timestamp) < todayStartOfDay()
    )
  })

  const remainingChats = createMemo(() => {
    return botStore.activeHistory.filter((h) => new Date(h.timestamp) < yesterdayStartOfDay())
  })

  return (
    <div class=''>
      <HistorySection title={text().today} chats={todayChats()} />
      <HistorySection title={text().yesterday} chats={yesterdayChats()} />
      <HistorySection title={text().previous} chats={remainingChats()} />
    </div>
  )
}

const HistorySection = (props: { title: string; chats: ChannelHistoryItem[] }) => {
  const { theme } = useTheme()

  return (
    <Show when={props.chats.length > 0}>
      <div>
        <div
          class='font-semibold my-1 '
          style={{
            color: theme().textSecondary,
          }}
        >
          {props.title}
        </div>

        <For each={props.chats.reverse()}>
          {(chat) => (
            <div
              data-testid='history-list-item'
              class='flex gap-4 items-center my-2 lg:my-1 p-1 text-[var(--primaryColor)] cursor-pointer font-light rounded-[10px] transition-all hover:bg-[var(--surfaceBackground)] '
              style={{
                cursor: 'pointer',
              }}
              onClick={() => {
                botStoreActions.setActiveChat(chat)
                configStoreActions.toggleDrawer()
              }}
            >
              <div>
                <ChatMessageIcon class='w-5 h-5' />
              </div>
              <span class='line-clamp-2'>{chat.question}</span>
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}
