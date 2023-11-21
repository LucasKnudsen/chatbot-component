import { TypingBubble } from '@/components'
import { Marked } from '@ts-stack/markdown'
import { createEffect, on, Show } from 'solid-js'
import { scrollChatWindowToBottom } from '..'
import { Chat } from '../types'
import Gallery from './Gallery/Gallery'

type ChatWindowProps = {
  question: Chat
  isFetchingSuggestedPrompts: boolean
}

export const ChatWindow = (props: ChatWindowProps) => {
  let botMessageEl: HTMLDivElement | undefined

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(props.question.answer)
    }
  })

  createEffect(on(() => props.question, scrollChatWindowToBottom, { defer: true }))

  createEffect(
    on(
      () => props.isFetchingSuggestedPrompts,
      () => setTimeout(() => scrollChatWindowToBottom(), 200),
      { defer: true }
    )
  )

  return (
    <div
      id='chat-window'
      class='flex flex-1 py-4 mb-4 flex-col overflow-y-scroll scrollable-container scroll-smooth relative'
    >
      <Show when={!props.question.answer}>
        <div class='flex mt-4  '>
          <TypingBubble />
        </div>
      </Show>

      <div ref={botMessageEl} class='prose ' />

      {/* Gallery  */}
      <Gallery resources={props.question.resources} />
    </div>
  )
}
