import { Divider } from '@/components/Divider'
import { useTheme } from '@/features/theme/hooks'
import { ChannelHistoryItem } from '@/graphql'
import { For, Show } from 'solid-js'

type HistoryListSectionProps = {
  title: string
  history: ChannelHistoryItem[]
  onSelect: (chat: ChannelHistoryItem) => void
  disabled: boolean
}

export const HistoryListSection = (props: HistoryListSectionProps) => {
  const { theme } = useTheme()

  return (
    <>
      <Show when={props.history.length > 0}>
        <div
          class='font-semibold uppercase tracking-wider'
          style={{ color: theme().textSecondary }}
        >
          {props.title}
        </div>

        <Divider />

        <ul class='mt-6 mb-10'>
          <For each={props.history.reverse()}>
            {(h) => (
              <li
                data-testid='history-list-item'
                class='history-list-section-item my-2 cursor-pointer font-light rounded-[10px] p-2 transition-all '
                style={{
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
