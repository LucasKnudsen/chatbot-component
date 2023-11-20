import { TypingBubble } from '@/components'
import { Marked } from '@ts-stack/markdown'
import { Show, createEffect } from 'solid-js'
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
    <div>
      <Show when={!props.question.answer}>
        <div class='flex mt-4  '>
          <TypingBubble />
        </div>
      </Show>
      <div ref={botMessageEl} class='prose'></div>
    </div>
  )
}
