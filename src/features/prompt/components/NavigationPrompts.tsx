import { PromptType } from '@/features/bot'
import { useTheme } from '@/features/theme/hooks'
import { For } from 'solid-js'
import { NavigationPrompt } from '.'

type NavigationPromptsProps = {
  title?: string
  prompts?: PromptType[]
  onSelect: (prompt: string) => void
  disabled: boolean
}

export const NavigationPrompts = (props: NavigationPromptsProps) => {
  const { theme } = useTheme()
  const { borderColor, navPromptBackground, textColor } = theme()

  return (
    <>
      <div class='text-lg font-semibold'>{props.title ?? 'What would you like to know?'}</div>

      <ul>
        <For each={props.prompts}>
          {(p) => (
            <NavigationPrompt
              class='w-full mt-6'
              prompt={p}
              onClick={(prompt) => props.onSelect(prompt)}
              disabled={props.disabled}
              borderColor={borderColor}
              background={navPromptBackground}
              color={textColor}
            />
          )}
        </For>
      </ul>
    </>
  )
}
