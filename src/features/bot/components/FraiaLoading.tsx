import { TypingBubble } from '@/components'

export const FraiaLoading = () => {
  return (
    <div class='w-screen h-screen flex flex-col justify-center items-center  animate-fade-in'>
      <h1 class='text-5xl mb-4'>
        FR
        <span
          style={{
            color: '#3B81F6',
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
