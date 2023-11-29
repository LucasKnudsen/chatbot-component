import linkIcon1 from '@/assets/link-icon-1.svg'
import { Divider } from '@/components/Divider'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, createMemo } from 'solid-js'
import { botStore } from '../bot'
import { sidebarInnerWidthNum, sidebarPaddingNum } from '../bot/constants'
import { useTheme } from '../theme/hooks'
import { Fact } from './components/Fact'
import { Iframe } from './components/Iframe'
import { Link } from './components/Link'

type Props = {
  class?: string
}

export const ContextualContainer = (props: Props) => {
  const facts = createMemo(() => botStore.chat?.resources?.fact ?? [])

  const [animateFacts] = createAutoAnimate()
  const [animateLinks] = createAutoAnimate()

  const { theme } = useTheme()

  return (
    <div
      id='contextual-resources'
      class={
        'flex flex-col gap-5 h-full relative scroll-smooth rounded-md scrollable-container text-sm ' +
        props.class
      }
      style={{
        width: sidebarInnerWidthNum + sidebarPaddingNum + 'px',
        'padding-left': sidebarPaddingNum + 'px',
      }}
    >
      <div
        ref={animateFacts}
        class='flex-1 flex flex-col gap-2 overflow-y-scroll custom-scrollbar '
      >
        <For each={facts()}>{(element) => <Fact fact={element} />}</For>
      </div>

      <div class='flex-1 flex-grow-[2] overflow-hidden'>
        <div
          class='font-bold'
          style={{
            color: theme().textSecondary,
          }}
        >
          <img class='inline-block mr-2' src={linkIcon1} />
          Links
        </div>

        <Divider margin={12} />

        <div
          ref={animateLinks}
          class='flex flex-col h-full gap-4 flex-1 overflow-y-scroll custom-scrollbar pr-0.5'
        >
          <For each={botStore.chat?.resources?.link ?? []}>
            {(element) => <Link link={element} />}
          </For>
          <For each={botStore.chat?.resources?.iframe ?? []}>
            {(element) => <Iframe element={element} />}
          </For>
        </div>
      </div>
    </div>
  )
}
