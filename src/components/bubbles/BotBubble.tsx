import { Marked } from '@ts-stack/markdown'
import { Show, onMount } from 'solid-js'
import { Avatar } from '../avatars/Avatar'

type Props = {
  message: string
  showAvatar?: boolean
  avatarSrc?: string
  backgroundColor?: string
  textColor?: string
}

const defaultBackgroundColor = '#f7f8ff'
const defaultTextColor = '#303235'

Marked.setOptions({ isNoP: true })

export const BotBubble = (props: Props) => {
  let botMessageEl: HTMLDivElement | undefined

  onMount(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(props.message)
    }
  })

  console.log('BotBubble', props.message)

  return (
    <div
      class='flex justify-start mb-2 items-start host-container'
      style={{ 'margin-right': '50px' }}
    >
      <Show when={props.showAvatar}>
        <Avatar initialAvatarSrc={props.avatarSrc} />
      </Show>

      <div
        ref={botMessageEl}
        class='px-4 py-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble text-lg font-light'
        data-testid='host-bubble'
        style={{
          'line-height': 1.7,
          'background-color': props.backgroundColor ?? defaultBackgroundColor,
          color: props.textColor ?? defaultTextColor,
          'border-radius': '6px',
        }}
      />
    </div>
  )
}
