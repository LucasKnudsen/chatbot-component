import { useTheme } from '@/features/theme/hooks'

type DividerProps = {
  margin?: number
  vertical?: boolean
}

export const Divider = (props: DividerProps) => {
  const { theme } = useTheme()

  const margin = props.margin ?? 8

  return (
    <div
      style={{
        width: props.vertical ? '1px' : '100%',
        height: props.vertical ? '100%' : '1px',
        margin: props.vertical ? `0 ${margin}px` : `${margin}px 0`,
        background: theme().borderColor,
      }}
    />
  )
}
