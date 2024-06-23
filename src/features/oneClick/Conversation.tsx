import { BrainAIOneClick, UserIconOneClick } from '@/components'

interface Props {
  message: string
  role: 'bot' | 'user'
}
export const Conversation = (props: Props) => {
  if (props.role === 'user') {
    return (
      <div class='flex flex-col gap-1'>
        <div class='flex items-center gap-2'>
          <UserIconOneClick />
          <div class='font-bold'>You</div>
        </div>
        <div>{props.message}</div>
      </div>
    )
  }

  return (
    <div class='flex flex-col gap-1'>
      <div class='flex items-center gap-2'>
        <BrainAIOneClick />
        <div class='font-bold'>AI</div>
      </div>
      <div class='text-[var(--primaryColor)]'>{props.message}</div>
    </div>
  )
}
