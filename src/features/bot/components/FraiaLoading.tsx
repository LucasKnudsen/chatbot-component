import { TypingBubble } from '@/components'
import { useTheme } from '@/features/theme'

export const FraiaLoading = () => {
  const { theme } = useTheme()

  return (
    <div class='w-screen h-screen flex flex-col justify-center items-center  animate-fade-in'>
      <h1 class='text-5xl mb-4'>
        FR
        <span
          style={{
            color: theme().primaryColor,
          }}
        >
          AI
        </span>
        A
      </h1>

      <TypingBubble />
    </div>
  )
}
