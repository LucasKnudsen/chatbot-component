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
      class={'p-2 text-sm ' + props.class + ' ' + (!props.fact.header ? 'animate-pulse' : '')}
      style={{
        background: theme().surfaceBackground2,
        'border-left': `3px solid ${theme().primaryColor}`,
        color: theme().textColor,
      }}
    >
      <Show when={props.fact.header} fallback={<div class='h-14' />}>
        <div class='font-semibold'>{props.fact.header}</div>
        <div class='font-light'>
          {Array.isArray(props.fact.value) ? props.fact.value.join(', ') : props.fact.value}
        </div>
      </Show>
    </div>
  )
}
