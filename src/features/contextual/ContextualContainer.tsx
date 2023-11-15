import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Accessor, For } from 'solid-js'
import { ContextualElement } from '.'
import { Fact } from './components/Fact'

type Props = {
  contextualElements: Accessor<ContextualElement[]>
}

export const ContextualContainer = ({ contextualElements }: Props) => {
  let contextContainer: HTMLDivElement | undefined

  const [parent] = createAutoAnimate(/* optional config */)

  // // Auto scroll chat to bottom
  // createEffect(() => {
  //   if (contextualElements()) scrollToBottom()
  // })

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     parent()?.scrollTo(0, parent().scrollHeight)
  //   }, 50)
  // }

  return (
    <div
      ref={parent}
      class='flex-1 overflow-y-scroll pt-8 px-3 m-5 relative scrollable-container scroll-smooth border border-gray-300 rounded-md '
    >
      <For each={contextualElements()}>
        {(element) => {
          switch (element.type) {
            case 'fact':
              return <Fact element={element} />

            default:
              return null
          }
        }}
      </For>
    </div>
  )
}
