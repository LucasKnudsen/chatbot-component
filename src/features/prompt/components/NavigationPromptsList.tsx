import { PromptType } from '@/features/bot'
import { For } from 'solid-js'
import { NavigationPrompt } from '.'

type NavigationPromptsProps = {
  title?: string
  prompts?: PromptType[]
  onSelect: (prompt: string) => void
  disabled: boolean
}

export const NavigationPromptsList = (props: NavigationPromptsProps) => {
  return (
    <>
      <ul>
        <For each={props.prompts}>
          {(p) => (
            <NavigationPrompt
              class='w-full mb-6'
              prompt={p}
              onClick={(prompt) => props.onSelect(prompt)}
              disabled={props.disabled}
            />
          )}
        </For>
      </ul>
    </>
  )
}
