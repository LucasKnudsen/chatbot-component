import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { Accessor, For, Match, Switch, createEffect } from 'solid-js'
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
  const [parent] = createAutoAnimate()
  const [parent2] = createAutoAnimate()

  // // Auto scroll chat to bottom
  createEffect(() => {
    if (contextualElements()) scrollToBottom()
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
        class='flex-1 flex-col  overflow-y-scroll relative  scroll-smooth rounded-md scrollable-container  pt-4'
      >
        <For each={contextualElements()}>
          {(element) => (
            <Switch fallback={null}>
              <Match when={element.type === 'picture'}>
                <Picture element={element} />
              </Match>
              <Match when={element.type === 'video'}>
                <Video element={element} />
              </Match>
              <Match when={element.type === 'iframe'}>
                <Iframe element={element} />
              </Match>
              <Match when={element.type === 'link'}>
                <Link element={element} />
              </Match>
            </Switch>
          )}
        </For>
      </div>

      <div
        id='contextual-facts'
        ref={parent2}
        class='flex-1 flex-col  overflow-y-scroll relative  scroll-smooth rounded-md scrollable-container   pt-4'
      >
        <For each={contextualElements()}>
          {(element) => (
            <Switch fallback={null}>
              <Match when={element.type === 'fact'}>
                <Fact element={element} />
              </Match>
            </Switch>
          )}
        </For>
      </div>
    </div>
  )
}
