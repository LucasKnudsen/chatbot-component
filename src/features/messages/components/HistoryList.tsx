import { botStore } from '@/features/bot'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { ChannelHistoryItem } from '@/graphql'
import { Show, createMemo } from 'solid-js'
import { HistoryListSection } from '.'

type HistoryProps = {
  history: ChannelHistoryItem[]
  onSelect: (chat: ChannelHistoryItem) => void
  disabled?: boolean
}

export const History = (props: HistoryProps) => {
  const { text } = useText()
  const { theme } = useTheme()

  const primaryAccent = theme().primaryAccent

  const todayStartOfDay = createMemo(() => {
    const date = new Date()

    date.setHours(0, 0, 0, 0)

    return date
  })

  const yesterdayStartOfDay = createMemo(() => {
    const date = new Date()

    date.setHours(0, 0, 0, 0)
    date.setDate(todayStartOfDay().getDate() - 1)

    return date
  })

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
    <>
      <style>
        {`
        .history-list-section-item:hover {
          background: ${primaryAccent};
        }
      `}
      </style>

      <Show
        when={botStore.activeHistory.length}
        fallback={
          <div class='text-center' style={{ color: theme().textSecondary }}>
            {text().noHistory}
          </div>
        }
      >
        <div>
          <HistoryListSection
            title={text().today}
            history={todayChats()}
            onSelect={props.onSelect}
            disabled={!!props.disabled}
          />
          <HistoryListSection
            title={text().yesterday}
            history={yesterdayChats()}
            onSelect={props.onSelect}
            disabled={!!props.disabled}
          />
          <HistoryListSection
            title={text().previous}
            history={remainingChats()}
            onSelect={props.onSelect}
            disabled={!!props.disabled}
          />
        </div>
      </Show>
    </>
  )
}
