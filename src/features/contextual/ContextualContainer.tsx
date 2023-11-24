import linkIcon1 from '@/assets/link-icon-1.svg'
import { Divider } from '@/components/Divider'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, createMemo } from 'solid-js'
import { Resources } from '.'
import { sidebarInnerWidthNum, sidebarPaddingNum } from '../bot/constants'
import { useTheme } from '../theme/hooks'
import { Fact } from './components/Fact'
import { Iframe } from './components/Iframe'
import { Link } from './components/Link'

type Props = {
  resources?: Resources
  class?: string
}

export const ContextualContainer = (props: Props) => {
  const facts = createMemo(() => props.resources?.fact ?? [])
  const links = createMemo(() => props.resources?.link ?? [])
  const iframes = createMemo(() => props.resources?.iframe ?? [])
  const [parent] = createAutoAnimate()

  const { theme } = useTheme()
  const { textSecondary } = theme()

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
        'flex flex-col gap-5 h-full relative scroll-smooth rounded-md scrollable-container text-sm ' +
        props.class
      }
      style={{
        width: sidebarInnerWidthNum + sidebarPaddingNum + 'px',
        'padding-left': sidebarPaddingNum + 'px',
      }}
    >
      <div class='flex-1 overflow-y-scroll'>
        <For each={facts()}>{(element) => <Fact fact={element} />}</For>
      </div>

      <div class='flex-1 overflow-hidden'>
        <div
          class='font-bold'
          style={{
            color: textSecondary,
          }}
        >
          <img class='inline-block mr-2' src={linkIcon1} />
          Links
        </div>

        <Divider margin={12} />

        <div class='flex flex-col h-full gap-4 flex-1 overflow-y-scroll'>
          <For each={links()}>{(element) => <Link link={element} />}</For>
          <For each={iframes()}>{(element) => <Iframe element={element} />}</For>
        </div>
      </div>
    </div>
  )
}
