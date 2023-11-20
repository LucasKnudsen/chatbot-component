import { TypingBubble } from '@/components'
import { ContextualElement } from '@/features/contextual'
import { Marked } from '@ts-stack/markdown'
import { Accessor, createEffect, on, Show } from 'solid-js'
import { Chat } from '../types'
import Gallery from './Gallery'

type ChatWindowProps = {
  question: Chat
  contextualElements: Accessor<ContextualElement[]>
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

  createEffect(
    on(() => [props.question, props.contextualElements()], scrollToBottom, { defer: true })
  )

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
      class='flex flex-1 py-4 flex-col overflow-y-scroll scrollable-container scroll-smooth'
    >
      <Show when={!props.question.answer}>
        <div class='flex mt-4  '>
          <TypingBubble />
        </div>
      </Show>

      <div ref={botMessageEl} class='prose' />

      {/* Gallery  */}
      <Gallery contextualElements={props.contextualElements} />
    </div>
  )
}
