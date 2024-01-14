import { TypingBubble } from '@/components'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme'

export const FraiaLoading = () => {
  const { theme } = useTheme()
  const { text } = useText()

  return (
    <div class='w-full h-full flex flex-col justify-center items-center  animate-fade-in gap-4'>
      <h1 class='text-5xl tracking-wider'>{text().brandName || 'AI Chatbot'}</h1>

      <p>
        Powered by{' '}
        <span
          style={{
            color: theme().primaryColor,
          }}
          class='font-bold'
        >
          Fraia
        </span>
      </p>

      <TypingBubble />
    </div>
  )
}
