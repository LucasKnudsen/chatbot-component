import { useTheme } from '@/features/theme/hooks'
import { ContextualElement } from '..'

type Props = {
  fact: ContextualElement
  class?: string
}

export const Fact = (props: Props) => {
  const { theme } = useTheme()

  return (
    <div
      class={'p-2 text-sm ' + props.class}
      style={{
        background: theme().surfaceBackground2,
        'border-left': `3px solid ${theme().primaryColor}`,
        color: theme().textColor,
      }}
    >
      <div class='font-semibold'>{props.fact.header}</div>
      <div class='font-light'>
        {Array.isArray(props.fact.value) ? props.fact.value.join(', ') : props.fact.value}
      </div>
    </div>
  )
}
