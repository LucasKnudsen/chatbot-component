import { InitialPrompt } from '@/graphql/types'
import { For } from 'solid-js'
import { NavigationPrompt } from '.'

type NavigationPromptsProps = {
  title?: string
  prompts?: InitialPrompt[] | null
  onSelect: (prompt: string) => void
  disabled: boolean
}

export const NavigationPromptsList = (props: NavigationPromptsProps) => {
  return (
    <ul>
      <For each={props.prompts}>
        {(p) => (
          <NavigationPrompt
            class='w-full mb-4'
            prompt={p}
            onClick={(prompt) => props.onSelect(prompt)}
            disabled={props.disabled}
          />
        )}
      </For>
    </ul>
  )
}
