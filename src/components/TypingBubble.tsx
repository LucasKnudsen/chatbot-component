import { useTheme } from '@/features/theme/hooks'

type Props = {
  color?: string | undefined
  height?: string | undefined
  width?: string | undefined
}

export const TypingBubble = (props: Props) => {
  const { theme } = useTheme()
  const color = props.color ?? theme().primaryColor

  return (
    <div class='flex items-center'>
      <div
        class='mr-1 rounded-full bubble1'
        style={{
          background: color,
          height: props.height || '8px',
          width: props.width || '8px',
        }}
      />
      <div
        class='mr-1 rounded-full bubble2'
        style={{
          background: color,
          height: props.height || '8px',
          width: props.width || '8px',
        }}
      />
      <div
        class='rounded-full bubble3'
        style={{
          background: color,
          height: props.height || '8px',
          width: props.width || '8px',
        }}
      />
    </div>
  )
}
