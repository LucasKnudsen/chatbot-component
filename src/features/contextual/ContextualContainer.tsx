import { Divider } from '@/components/Divider'
import { LinkIcon } from '@/components/icons/LinkIcon'
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
  const facts = createMemo(() => botStore.activeFacts)
  const links = createMemo(() =>
    botStore.activeContextuals.filter((element) => element.type === 'link')
  )
  const iframes = createMemo(() =>
    botStore.activeContextuals.filter((element) => element.type === 'iframe')
  )

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

      <div class='flex flex-col flex-1 flex-grow-[2] overflow-hidden '>
        <div
          class='font-bold mb-3'
          style={{
            color: theme().textSecondary,
          }}
        >
          <LinkIcon class='inline-block mr-2' color={theme().primaryColor} />
          Links
        </div>

        <Divider margin={0} />

        <div
          ref={animateLinks}
          class='flex-1 flex flex-col py-4 gap-4 overflow-y-scroll custom-scrollbar pr-0.5'
        >
          <For each={links()}>{(element) => <Link link={element} />}</For>
          <For each={iframes()}>{(element) => <Iframe element={element} />}</For>
        </div>
      </div>
    </div>
  )
}
