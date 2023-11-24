import { useTheme } from '@/features/theme/hooks'

export const TypingBubble = () => {
  const { theme } = useTheme()
  const primaryColor = theme().primaryColor

  return (
    <div class='flex items-center'>
      <div
        class='w-2 h-2 mr-1 rounded-full bubble1'
        style={{
          background: primaryColor,
        }}
      />
      <div
        class='w-2 h-2 mr-1 rounded-full bubble2'
        style={{
          background: primaryColor,
        }}
      />
      <div
        class='w-2 h-2 rounded-full bubble3'
        style={{
          background: primaryColor,
        }}
      />
    </div>
  )
}
