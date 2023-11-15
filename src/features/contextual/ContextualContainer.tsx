import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Accessor, For } from 'solid-js'
import { ContextualElement } from '.'

type Props = {
  contextualElements: Accessor<ContextualElement[]>
}

export const ContextualContainer = ({ contextualElements }: Props) => {
  const [parent] = createAutoAnimate(/* optional config */)

  return (
    <div
      ref={parent}
      class='flex-1 overflow-y-scroll pt-8 px-3 m-5 relative scrollable-container scroll-smooth border border-gray-300 rounded-md '
    >
      <For each={contextualElements()}>
        {(element) => (
          <div class='flex flex-row flex-nowrap justify-between'>
            <p style={{ 'font-weight': 600 }}>{element.header}</p>
            <p>{JSON.stringify(element.value)}</p>
          </div>
        )}
      </For>
    </div>
  )
}
