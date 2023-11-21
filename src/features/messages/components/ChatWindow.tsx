import { TypingBubble } from '@/components'
import { Marked } from '@ts-stack/markdown'
import { createEffect, on, Show } from 'solid-js'
import { Chat } from '../types'
import Gallery from './Gallery'

type ChatWindowProps = {
  question: Chat
  isFetchingSuggestedPrompts: boolean
}

export const ChatWindow = (props: ChatWindowProps) => {
  let questionAnswerContainer: HTMLDivElement | undefined

  let botMessageEl: HTMLDivElement | undefined

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(props.question.answer)
    }
  })

  const scrollToBottom = () => {
    setTimeout(() => {
      questionAnswerContainer?.scrollTo(0, questionAnswerContainer.scrollHeight)
    }, 50)
  }

  createEffect(on(() => props.question, scrollToBottom, { defer: true }))

  createEffect(
    on(
      () => props.isFetchingSuggestedPrompts,
      () => setTimeout(() => scrollToBottom(), 300),
      { defer: true }
    )
  )

  return (
    <div
      ref={questionAnswerContainer}
      class='flex flex-1 py-4 flex-col overflow-y-scroll scrollable-container scroll-smooth relative'
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
