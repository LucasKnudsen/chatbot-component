import { useTheme } from '@/features/theme/hooks'
import { Show } from 'solid-js'
import { ContextualElement } from '..'

type Props = {
  fact: ContextualElement
  class?: string
}

export const Fact = (props: Props) => {
  const { theme } = useTheme()

  return (
    <div
      data-testid='fact-resource'
      class={
        'p-2 text-sm rounded-r-lg ' +
        props.class +
        ' ' +
        (!props.fact.header ? 'animate-pulse' : '')
      }
      style={{
        background: theme().surfaceBackground,
        'border-left': `3px solid ${theme().primaryColor}`,
        color: theme().textColor,
      }}
    >
      <Show when={props.fact.header} fallback={<div class='max-md:h-10 h-14 max-md:w-40' />}>
        <div class='font-semibold'>{props.fact.header}</div>
        <div class='font-light'>
          {Array.isArray(props.fact.value) ? props.fact.value.join(', ') : props.fact.value}
        </div>
      </Show>
    </div>
  )
}
