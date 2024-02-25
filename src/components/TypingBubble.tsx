import { useTheme } from '@/features/theme/hooks'

type Props = {
  color?: string | undefined
}

export const TypingBubble = (props: Props) => {
  const { theme } = useTheme()
  const color = props.color ?? theme().primaryColor

  return (
    <div class='flex items-center'>
      <div
        class='w-2 h-2 mr-1 rounded-full bubble1'
        style={{
          background: color,
        }}
      />
      <div
        class='w-2 h-2 mr-1 rounded-full bubble2'
        style={{
          background: color,
        }}
      />
      <div
        class='w-2 h-2 rounded-full bubble3'
        style={{
          background: color,
        }}
      />
    </div>
  )
}
