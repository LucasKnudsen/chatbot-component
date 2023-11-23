import { useTheme } from '@/features/theme/hooks'
import { ContextualElement } from '..'

type Props = {
  fact: ContextualElement
}

export const Fact = (props: Props) => {
  const { theme } = useTheme()

  const { textColor, primaryColor, primaryColorHovered } = theme()

  return (
    <div
      class='p-2 mb-2 text-sm'
      style={{
        background: primaryColorHovered,
        'border-left': `3px solid ${primaryColor}`,
        color: textColor,
      }}
    >
      <div class='font-bold'>{props.fact.header}</div>
      <div class='font-light'>
        {Array.isArray(props.fact.value) ? props.fact.value.join(', ') : props.fact.value}
      </div>
    </div>
  )
}
