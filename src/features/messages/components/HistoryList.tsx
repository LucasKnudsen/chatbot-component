import { botStore } from '@/features/bot'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { Show, createMemo } from 'solid-js'
import { HistoryListSection } from '.'
import { Chat } from '../types'

type HistoryProps = {
  history: Chat[]
  onSelect: (chat: Chat) => void
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
    botStore.history.filter((h) => new Date(h.createdAt) >= todayStartOfDay())
  )

  const yesterdayChats = createMemo(() => {
    return botStore.history.filter(
      (h) =>
        new Date(h.createdAt) >= yesterdayStartOfDay() && new Date(h.createdAt) < todayStartOfDay()
    )
  })

  const remainingChats = createMemo(() => {
    return botStore.history.filter((h) => new Date(h.createdAt) < yesterdayStartOfDay())
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
        when={botStore.history.length}
        fallback={
          <div class='text-center' style={{ color: theme().textSecondary }}>
            {text().noHistory}
          </div>
        }
      >
        <div
          class='overflow-y-auto custom-scrollbar pr-1 '
          style={{
            'max-height': 'calc(100vh - 180px)',
          }}
        >
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
