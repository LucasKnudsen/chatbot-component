import { Component } from 'solid-js'
import { BrainAIOneClick, UserIconOneClick } from '@/components'

interface ConversationProps {
  message: string
  role: 'bot' | 'user'
}
export const Conversation: Component<ConversationProps> = ({ message, role }) => {
  if (role === 'user') {
    return (
      <div class='flex flex-col gap-1'>
        <div class='flex items-center gap-2'>
          <UserIconOneClick />
          <div class='font-bold'>You</div>
        </div>
        <div>{message}</div>
      </div>
    )
  }

  return (
    <div class='flex flex-col gap-1'>
      <div class='flex items-center gap-2'>
        <BrainAIOneClick />
        <div class='font-bold'>AI</div>
      </div>
      <div class='text-[var(--primaryColor)]'>{message}</div>
    </div>
  )
}
