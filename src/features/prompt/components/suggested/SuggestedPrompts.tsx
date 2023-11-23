import { LoadingBubble } from '@/components/bubbles/LoadingBubble'
import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Accessor, For, Show } from 'solid-js'
import { Prompt } from './Prompt'

type Props = {
  handleSubmit: (prompt: string) => void
  suggestedPrompts: Accessor<string[]>
  isFetching: Accessor<boolean>
  suggestedPromptsTitle?: string
  loading: boolean
}

export const SuggestedPrompts = (props: Props) => {
  const { theme } = useTheme()
  const { primaryColor } = theme()
  const [suggestedPromptsParent] = createAutoAnimate(/* optional config */)

  return (
    <>
      <style>
        {`
            .custom-scrollbar::-webkit-scrollbar {
                width: 2px;
                height: 2px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: ${primaryColor};
                border-radius: 20px;
            }
        `}
      </style>

      <div class='pb-8' ref={suggestedPromptsParent}>
        <Show when={props.isFetching?.() || props.suggestedPrompts().length > 0}>
          <div class='flex items-center  gap-y-1 gap-x-4 '>
            <p
              class='whitespace-nowrap border-r-2 border-gray-200 pr-8 font-bold'
              style={{
                // TODO: Theme it
                color: '#231843A1',
              }}
            >
              {props.suggestedPromptsTitle ?? 'SUGGESTIONS'}
            </p>

            <div class='flex overflow-x-auto  whitespace-nowrap py-4 gap-x-4 custom-scrollbar'>
              <Show when={props.suggestedPrompts().length > 0} fallback={<LoadingBubble />}>
                <For each={props.suggestedPrompts()}>
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
