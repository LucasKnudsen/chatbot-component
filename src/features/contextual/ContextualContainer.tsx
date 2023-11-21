import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, createEffect } from 'solid-js'
import { Resources } from '.'
import { Fact } from './components/Fact'
import { Iframe } from './components/Iframe'
import { Link } from './components/Link'

type Props = {
  resources: Resources
}

export const ContextualContainer = (props: Props) => {
  const [parent] = createAutoAnimate()
  const [parent2] = createAutoAnimate()

  // // Auto scroll chat to bottom
  createEffect(() => {
    if (props.resources) scrollToBottom()
  })

  const scrollToBottom = () => {
    setTimeout(() => {
      const contextualContainer = document.getElementById('contextual-resources')
      if (contextualContainer) {
        contextualContainer.scrollTop = contextualContainer.scrollHeight
      }
      const contextualContainer2 = document.getElementById('contextual-facts')
      if (contextualContainer2) {
        contextualContainer2.scrollTop = contextualContainer2.scrollHeight
      }
    }, 50)
  }

  return (
    <div class='flex flex-1 gap-12 flex-nowrap overflow-hidden'>
      <div
        id='contextual-resources'
        ref={parent}
        class='flex-1 flex-col py-4  overflow-y-scroll relative  scroll-smooth rounded-md scrollable-container'
      >
        <For each={props.resources.link}>{(element) => <Link element={element} />}</For>

        <For each={props.resources.iframe}>{(element) => <Iframe element={element} />}</For>
      </div>

      <div
        id='contextual-facts'
        ref={parent2}
        class='flex-1 flex-col py-4 overflow-y-scroll relative  scroll-smooth rounded-md scrollable-container  '
      >
        <For each={props.resources.fact}>{(element) => <Fact element={element} />}</For>
      </div>
    </div>
  )
}
