import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For } from 'solid-js'
import { Resources } from '.'
import { sidebarInnerWidthNum, sidebarPaddingNum } from '../bot/constants'
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
  // createEffect(() => {
  //   if (props.resources) scrollToBottom()
  // })

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     const contextualContainer = document.getElementById('contextual-resources')
  //     if (contextualContainer) {
  //       contextualContainer.scrollTop = contextualContainer.scrollHeight
  //     }
  //     const contextualContainer2 = document.getElementById('contextual-facts')
  //     if (contextualContainer2) {
  //       contextualContainer2.scrollTop = contextualContainer2.scrollHeight
  //     }
  //   }, 50)
  // }

  return (
    <div
      id='contextual-resources'
      ref={parent}
      class={
        'flex flex-col gap-2 h-full relative scroll-smooth rounded-md scrollable-container ' +
        props.class
      }
      style={{
        width: sidebarInnerWidthNum + sidebarPaddingNum + 'px',
        'padding-left': sidebarPaddingNum + 'px',
      }}
    >
      <div class='flex-1 overflow-y-scroll'>
        <For each={props.resources.fact}>{(element) => <Fact fact={element} />}</For>
      </div>

      <div class='flex-1 overflow-y-scroll'>
        <For each={props.resources.link}>{(element) => <Link element={element} />}</For>
        <For each={props.resources.iframe}>{(element) => <Iframe element={element} />}</For>
      </div>
    </div>
  )
}
