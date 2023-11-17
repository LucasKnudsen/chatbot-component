import { Marked } from '@ts-stack/markdown'
import { createEffect } from 'solid-js'
import { Question } from '../question'

type QuestionAnswerProps = {
  question: Question
}

export const QuestionAnswer = (props: QuestionAnswerProps) => {
  let botMessageEl: HTMLDivElement | undefined

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(props.question.answer)
    }
  })

  return (
    <div class='flex flex-1 flex-col overflow-y-scroll scrollable-container'>
      <div class='mb-4 text-xl text-gray-500'>{props.question.question}</div>

      <div ref={botMessageEl} class='prose'></div>
    </div>
  )
}
