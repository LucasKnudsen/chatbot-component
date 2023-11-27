import { LoadingBubble } from '@/components/bubbles/LoadingBubble'
import { useText } from '@/features/text'
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

  const { text } = useText()
  return (
    <>
      <div ref={suggestedPromptsParent}>
        <Show when={props.isFetching || props.suggestedPrompts.length > 0}>
          <div class='flex items-center  gap-y-1 gap-x-4 '>
            <p
              class='whitespace-nowrap border-r-2 border-gray-200 pr-8 font-bold'
              style={{
                // TODO: Theme it
                color: '#231843A1',
              }}
            >
              {text().suggestedPromptsTitle}
            </p>

            <div class='flex overflow-x-auto  whitespace-nowrap pb-2 pt-4 gap-x-4 custom-scrollbar'>
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
