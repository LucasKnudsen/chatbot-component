import { useTheme } from '@/features/theme/hooks'

type Props = {
  onClick?: () => void | Promise<void>
  children: string
  class?: string
}

export const Button = (props: Props) => {
  const { theme } = useTheme()

  return (
    <button
      class={
        'rounded-full px-3 py-1 ml-4  font-medium tracking-widest text-xs active:scale-95 transition-transform duration-100' +
        props.class
      }
      style={{
        background: theme().primaryColor,
        color: theme().textAccent,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
