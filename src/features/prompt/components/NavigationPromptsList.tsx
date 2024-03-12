import { For } from 'solid-js'
import { InitialPrompt } from '@/graphql/types'
import { NavigationPrompt } from '.'

type NavigationPromptsProps = {
  title?: string
  prompts?: InitialPrompt[] | null
  onSelect: (prompt: string) => void
  disabled: boolean
}

export const NavigationPromptsList = (props: NavigationPromptsProps) => {
  return (
    <ul class='space-y-4'>
      <For each={props.prompts}>
        {(p) => (
          <NavigationPrompt
            prompt={p}
            onClick={(prompt) => props.onSelect(prompt)}
            disabled={props.disabled}
          />
        )}
      </For>
    </ul>
  )
}
