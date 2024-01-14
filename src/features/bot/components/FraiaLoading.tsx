import { TypingBubble } from '@/components'
import { configStoreActions } from '@/features/chat-init'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme'
import { Accessor } from 'solid-js'

export const FraiaLoading = (props: { channelError: Accessor<string> }) => {
  const { theme } = useTheme()
  const { text } = useText()

  return (
    <div class='w-screen h-screen flex flex-col justify-center items-center  animate-fade-in gap-4'>
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

      {props.channelError() ? (
        <div class='text-lg  text-red-500 text-center'>
          <p class='mb-4'>Error: {props.channelError()}</p>
          <button
            class='rounded-full px-4 py-2 bg-red-300 text-black'
            onClick={() => {
              configStoreActions.toggleBot()
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
