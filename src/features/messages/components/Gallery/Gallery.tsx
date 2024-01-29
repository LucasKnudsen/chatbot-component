import { Expandable } from '@/components'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { For, Match, Show, Switch, createMemo } from 'solid-js'

import { botStore } from '@/features/bot'
import Picture from './Picture'
import Video from './Video'

type Props = {
  class?: string
}

const Gallery = (props: Props) => {
  // const [parent] = createAutoAnimate()

  const { theme } = useTheme()
  const { text } = useText()

  const imagesAndVideos = createMemo(() =>
    botStore.activeContextuals.filter((element) => {
      return element.type === 'picture' || element.type === 'video'
    })
  )

  const scrollIntoView = () => {
    const galleryContainer = document.getElementById('gallery-container')

    if (galleryContainer) setTimeout(() => galleryContainer.scrollIntoView())
  }

  return (
    <div id='gallery-container' class={props.class}>
      {/* TODO: Configureable header */}
      <Show when={imagesAndVideos().length > 0}>
        <Expandable
          header={text().viewMedia}
          defaultOpen
          onOpen={() => {
            setTimeout(() => {
              scrollIntoView()
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
