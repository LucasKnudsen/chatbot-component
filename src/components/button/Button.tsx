import { useTheme } from '@/features/theme/hooks'
import { JSX } from 'solid-js'

type Props = {
  onClick?: () => void | Promise<void>
  children: JSX.Element
  padding?: string
  class?: string
}

export const Button = (props: Props) => {
  const padding = props.padding ?? '4px 12px'
  const { theme } = useTheme()

  return (
    <button
      class={
        'rounded-full font-medium tracking-widest text-xs active:scale-95 transition-transform duration-100 ' +
        props.class
      }
      style={{
        background: theme().primaryColor,
        color: theme().textAccent,
        padding,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
