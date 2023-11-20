import { TypingBubble } from '@/components'
import { Marked } from '@ts-stack/markdown'
import { createEffect, on, Show } from 'solid-js'
import { Question } from '../question'

type QuestionAnswerProps = {
  question: Question
  isFetchingSuggestedPrompts: boolean
}

export const QuestionAnswer = (props: QuestionAnswerProps) => {
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
      class='flex flex-1 py-4 flex-col overflow-y-scroll scrollable-container scroll-smooth'
    >
      <Show when={!props.question.answer}>
        <div class='flex mt-4  '>
          <TypingBubble />
        </div>
      </Show>

      <div ref={botMessageEl} class='prose' />
    </div>
  )
}
