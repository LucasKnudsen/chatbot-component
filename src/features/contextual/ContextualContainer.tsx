import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Accessor, For, createEffect } from 'solid-js'
import { ContextualElement } from '.'
import { Fact } from './components/Fact'
import { Iframe } from './components/Iframe'
import { Link } from './components/Link'
import { Picture } from './components/Picture'
import { Video } from './components/Video'

type Props = {
  contextualElements: Accessor<ContextualElement[]>
}

export const ContextualContainer = ({ contextualElements }: Props) => {
  let contextContainer: HTMLDivElement | undefined

  console.log('contextualElements', contextualElements())

  const [parent] = createAutoAnimate({ duration: 500 })

  // // Auto scroll chat to bottom
  createEffect(() => {
    if (contextualElements()) scrollToBottom()
  })

  const scrollToBottom = () => {
    setTimeout(() => {
      const contextualContainer = document.getElementById('contextual-container')
      if (contextualContainer) {
        contextualContainer.scrollTop = contextualContainer.scrollHeight
      }
    }, 50)
  }

  return (
    <div
      id='contextual-container'
      ref={parent}
      class='flex-1 flex-col  overflow-y-scroll pt-8 px-3 m-5 relative scrollable-container scroll-smooth border border-gray-300 rounded-md '
    >
      <For each={contextualElements()}>
        {(element) => {
          switch (element.type) {
            case 'fact':
              return <Fact element={element} />

            case 'picture':
              return <Picture element={element} />

            case 'video':
              return <Video element={element} />

            case 'iframe':
              return <Iframe element={element} />

            case 'link':
              return <Link element={element} />

            default:
              return null
          }
        }}
      </For>
    </div>
  )
}
