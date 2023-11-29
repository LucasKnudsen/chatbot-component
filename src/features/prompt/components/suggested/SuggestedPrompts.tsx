import { LoadingBubble } from '@/components/bubbles/LoadingBubble'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, Show } from 'solid-js'
import { Prompt } from './Prompt'

type Props = {
  handleSubmit: (prompt: string) => void
  suggestedPrompts: string[]
  isFetching: boolean
  loading: boolean
}

export const SuggestedPrompts = (props: Props) => {
  const [suggestedPromptsParent] = createAutoAnimate(/* optional config */)
  const { theme } = useTheme()

  const { text } = useText()
  return (
    <>
      <div ref={suggestedPromptsParent}>
        <Show when={props.isFetching || props.suggestedPrompts.length > 0}>
          <div class='flex flex-col md:flex-row gap-y-2'>
            <p
              style={{
                color: theme().textSecondary,
              }}
              class='whitespace-nowrap md:border-r-2 border-gray-200 pr-8 font-bold'
            >
              {text().suggestedPromptsTitle}
            </p>

            <div class='flex overflow-x-auto whitespace-nowrap gap-x-4 custom-scrollbar'>
              <Show when={props.suggestedPrompts.length > 0} fallback={<LoadingBubble />}>
                <For each={props.suggestedPrompts}>
                  {(p) => (
                    <Prompt prompt={p} onClick={props.handleSubmit} disabled={props.loading} />
                  )}
                </For>
              </Show>
            </div>
          </div>
        </Show>
      </div>
    </>
  )
}
