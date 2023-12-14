import { TypingBubble } from '@/components'
import { useTheme } from '@/features/theme'
import { Accessor } from 'solid-js'

export const FraiaLoading = (props: {
  brandName: string | undefined
  channelError: Accessor<string>
  toggleBot: () => void
}) => {
  const { theme } = useTheme()

  return (
    <div class='w-screen h-screen flex flex-col justify-center items-center  animate-fade-in gap-4'>
      <h1 class='text-5xl tracking-wider'>{props.brandName || 'AI Chatbot'}</h1>

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

      {props.channelError() ? (
        <div class='text-lg  text-red-500 text-center'>
          <p class='mb-4'>Error: {props.channelError()}</p>
          <button
            class='rounded-full px-4 py-2 bg-red-300 text-black'
            onClick={() => {
              props.toggleBot()
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <TypingBubble />
      )}
    </div>
  )
}
