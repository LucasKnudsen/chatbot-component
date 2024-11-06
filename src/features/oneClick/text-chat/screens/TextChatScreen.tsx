import { configStore } from '@/features/portal-init'
import { createEffect, on } from 'solid-js'
import { setMessages, useLLM } from '../../hooks'
import { oneClickStore } from '../../store/oneClickStore'
import { handleInitiateConversation } from '../../utils'
import { Conversation } from '../components/Conversation'
import { InputOneClick } from '../components/InputOneClick'

export const TextChatScreen = () => {
  const { submitNewMessage, cancelQuery } = useLLM({})

  const handleNewMessage = async (input: string) => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: input,
        conversationId: oneClickStore.activeConversationId || '',
      },
    ])
    submitNewMessage({
      message: input,
    })
  }

  createEffect(
    on(
      () => configStore.isBotOpened,
      () => {
        configStore.isBotOpened && handleInitiateConversation()
      }
    )
  )

  return (
    <div
      class={`w-full overflow-auto  bg-[var(--backgroundColor)] flex flex-col grow justify-end px-5 pb-4`}
      style={{
        height: '100%',
        transition: '0.4s height ease',
        bottom: 0,
      }}
    >
      <div
        class='overflow-auto'
        style={{
          height: '100%',
          transition: '0.4s height ease-in-out',
          'scrollbar-width': 'none',
        }}
      >
        <Conversation />
      </div>

      <InputOneClick
        onSubmit={handleNewMessage}
        cancelQuery={() => {
          cancelQuery()
        }}
      />
    </div>
  )
}
