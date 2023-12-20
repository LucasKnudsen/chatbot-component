import { useTheme } from '@/features/theme'
import { JSX } from 'solid-js'

type IconProps = {
  variant?: 'primary' | 'outline' | 'default'
  onClick?: () => void
  class?: string
  children: JSX.Element
}

export const IconButton = (props: IconProps) => {
  const { theme } = useTheme()

  const getVariantStyle = (): JSX.CSSProperties => {
    switch (props.variant) {
      case 'primary':
        return {
          'background-color': theme().primaryColor,
          color: theme().onPrimary,
          fill: theme().onPrimary,
        }
      case 'outline':
        return {
          // Add your outline style here
          'border-color': theme().primaryColor,
        }
      default:
        return {}
    }
  }

  return (
    <div
      onClick={props.onClick}
      class={
        'rounded-full cursor-pointer active:scale-95 transition hover:brightness-110 ' + props.class
      }
      style={getVariantStyle()}
    >
      {props.children}
    </div>
  )
}
