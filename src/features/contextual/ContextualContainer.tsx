import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, createEffect } from 'solid-js'
import { Resources } from '.'
import { sidebarInnerWidthNum } from '../bot/constants'
import { Fact } from './components/Fact'
import { Iframe } from './components/Iframe'
import { Link } from './components/Link'

type Props = {
  resources: Resources
  class?: string
}

export const ContextualContainer = (props: Props) => {
  const [parent] = createAutoAnimate()

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
    <div
      id='contextual-resources'
      ref={parent}
      class={
        'flex-col overflow-y-scroll relative scroll-smooth rounded-md scrollable-container ' +
        props.class
      }
      style={{ width: sidebarInnerWidthNum + 'px' }}
    >
      <For each={props.resources.link}>{(element) => <Link element={element} />}</For>

      <For each={props.resources.iframe}>{(element) => <Iframe element={element} />}</For>

      <For each={props.resources.fact}>{(element) => <Fact element={element} />}</For>
    </div>
  )
}
