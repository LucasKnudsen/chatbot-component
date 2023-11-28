import { Resources } from '@/features/contextual'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

import { Expandable } from '@/components'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { For, Match, Show, Switch, createMemo } from 'solid-js'
import { scrollChatWindowToBottom } from '../..'
import Picture from './Picture'
import Video from './Video'

type Props = {
  resources: Resources
}

const Gallery = (props: Props) => {
  const [parent] = createAutoAnimate()

  const { theme } = useTheme()
  const { text } = useText()

  const imagesAndVideos = createMemo(() => [...props.resources.picture, ...props.resources.video])

  return (
    <div ref={parent} class='mt-8'>
      {/* TODO: Configureable header */}
      <Show when={imagesAndVideos().length > 0}>
        <Expandable
          header={text().viewMedia}
          defaultOpen
          onOpen={() => {
            setTimeout(() => {
              scrollChatWindowToBottom()
            }, 100)
          }}
          height='280px'
        >
          <div class='flex gap-4 px-6 pb-6 custom-scrollbar overflow-x-auto whitespace-nowrap'>
            <For each={imagesAndVideos()}>
              {(element) => (
                <div
                  class='p-2 rounded-lg h-48 border min-w-[298px] w-[298px] '
                  style={{ 'border-color': theme().borderColor }}
                >
                  <Switch fallback={null}>
                    <Match when={element.type === 'picture'}>
                      <Picture element={element} />
                    </Match>
                    <Match when={element.type === 'video'}>
                      <Video element={element} />
                    </Match>
                  </Switch>
                </div>
              )}
            </For>
          </div>
        </Expandable>
      </Show>
    </div>
  )
}

export default Gallery
