import { LoadingBubble } from '@/components/bubbles/LoadingBubble'
import { botStore } from '@/features/bot'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, Show } from 'solid-js'
import { suggestedPromptsStore } from '../..'
import { Prompt } from './Prompt'

type Props = {
  handleSubmit: (prompt: string) => void
}

export const SuggestedPrompts = (props: Props) => {
  const [suggestedPromptsParent] = createAutoAnimate(/* optional config */)

  const { theme } = useTheme()
  const { surfaceBackground, surfaceHoveredBackground } = theme()

  const { text } = useText()
  return (
    <>
      <style>
        {`
        .prompt:hover {
          background: ${surfaceHoveredBackground};
        }
        .prompt {
          background: ${surfaceBackground};
        }
      `}
      </style>

      <div ref={suggestedPromptsParent}>
        <Show when={suggestedPromptsStore.isFetching || suggestedPromptsStore.prompts.length > 0}>
          <div class='flex flex-col md:flex-row md:items-center gap-y-2 md:mt-4'>
            <p
              style={{
                color: theme().textSecondary,
                'border-color': theme().borderColor,
              }}
              class='whitespace-nowrap md:border-r-2 max-md:pl-6 md:pr-6 max-sm:text-sm font-semibold'
            >
              {text().suggestedPromptsTitle}
            </p>

            <div class='flex overflow-x-scroll max-md:px-6 md:pl-6 whitespace-nowrap gap-x-6 no-scrollbar '>
              <Show when={suggestedPromptsStore.prompts.length > 0} fallback={<LoadingBubble />}>
                <For each={suggestedPromptsStore.prompts}>
                  {(p) => (
                    <Prompt
                      prompt={p}
                      onClick={props.handleSubmit}
                      disabled={botStore.isAwaitingAnswer}
                    />
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
