import { Divider } from '@/components/Divider'
import { useTheme } from '@/features/theme/hooks'
import { For, Show } from 'solid-js'
import { Chat } from '../types'

type HistoryListSectionProps = {
  title: string
  history: Chat[]
  onSelect: (chat: Chat) => void
  disabled: boolean
}

export const HistoryListSection = (props: HistoryListSectionProps) => {
  const { theme } = useTheme()
  const primaryAccent = theme().primaryAccent

  return (
    <>
      <style>
        {`
        .history-list-section-item:hover {
          background: ${primaryAccent};
        }
      `}
      </style>
      <Show when={props.history.length > 0}>
        <div class='font-bold' style={{ color: theme().textSecondary }}>
          {props.title}
        </div>

        <Divider />

        <ul class='mt-6 mb-10'>
          <For each={props.history.reverse()}>
            {(h) => (
              <li
                class='history-list-section-item my-2 cursor-pointer font-light rounded-[10px] p-2 '
                style={{
                  color: theme().textColor,
                  cursor: props.disabled ? 'not-allowed' : 'pointer',
                }}
                onClick={() => (props.disabled ? null : props.onSelect(h))}
              >
                {h.question}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  )
}
