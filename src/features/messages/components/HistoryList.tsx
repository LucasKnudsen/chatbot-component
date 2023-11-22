import { createMemo } from 'solid-js'
import { HistoryListSection } from '.'
import { Chat } from '../types'

type HistoryProps = {
  history: Chat[]
  onSelect: (chat: Chat) => void
  disabled?: boolean
}

export const History = (props: HistoryProps) => {
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
    props.history.filter((h) => new Date(h.createdAt) >= todayStartOfDay())
  )

  const yesterdayChats = createMemo(() => {
    return props.history.filter(
      (h) =>
        new Date(h.createdAt) >= yesterdayStartOfDay() && new Date(h.createdAt) < todayStartOfDay()
    )
  })

  const remainingChats = createMemo(() => {
    return props.history.filter((h) => new Date(h.createdAt) < yesterdayStartOfDay())
  })

  return (
    <>
      <HistoryListSection
        title='TODAY'
        history={todayChats()}
        onSelect={props.onSelect}
        disabled={!!props.disabled}
      />
      <HistoryListSection
        title='YESTERDAY'
        history={yesterdayChats()}
        onSelect={props.onSelect}
        disabled={!!props.disabled}
      />
      <HistoryListSection
        title='PREVIOUS'
        history={remainingChats()}
        onSelect={props.onSelect}
        disabled={!!props.disabled}
      />
    </>
  )
}
