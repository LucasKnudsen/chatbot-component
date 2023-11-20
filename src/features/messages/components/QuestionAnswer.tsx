import { Marked } from '@ts-stack/markdown'
import { createEffect, on } from 'solid-js'
import { Question } from '../question'

type QuestionAnswerProps = {
  question: Question
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

  return (
    <div
      ref={questionAnswerContainer}
      class='flex flex-1 py-4 flex-col overflow-y-scroll scrollable-container scroll-smooth'
    >
      <div class='mb-4 text-xl text-gray-500'>{props.question.question}</div>

      <div ref={botMessageEl} class='prose' />
    </div>
  )
}
