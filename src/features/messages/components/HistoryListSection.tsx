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
  const { frostTitleColor, textColor } = theme()

  return (
    <Show when={props.history.length > 0}>
      <div class='font-bold' style={{ color: frostTitleColor }}>
        {props.title}
      </div>

      <Divider />

      <ul class='mb-6'>
        <For each={props.history.reverse()}>
          {(h) => (
            <li
              class='my-4 cursor-pointer font-light'
              style={{
                color: textColor,
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
  )
}
