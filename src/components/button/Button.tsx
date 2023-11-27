import { useTheme } from '@/features/theme/hooks'

type Props = {
  onClick?: () => void | Promise<void>
  children: string
}

export const Button = (props: Props) => {
  const { theme } = useTheme()

  return (
    <button
      class='rounded-full px-4 py-2 ml-4  font-medium tracking-widest text-sm active:scale-95 transition-transform duration-100'
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
