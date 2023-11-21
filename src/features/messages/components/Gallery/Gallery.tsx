import { Resources } from '@/features/contextual'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

import { Expandable } from '@/components'
import { For, Match, Show, Switch, createMemo } from 'solid-js'
import { scrollChatWindowToBottom } from '../..'
import Picture from './Picture'

type Props = {
  resources: Resources
}

const Gallery = (props: Props) => {
  const [parent] = createAutoAnimate()

  const imagesAndVideos = createMemo(() => [...props.resources.picture, ...props.resources.video])

  return (
    <div ref={parent} class='mt-8'>
      {/* TODO: Configureable header */}
      <Show when={imagesAndVideos().length > 0}>
        <Expandable header='Media' onOpen={scrollChatWindowToBottom}>
          <div class='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  gap-4 px-6 pb-6 '>
            <For each={imagesAndVideos()}>
              {(element) => (
                <Switch fallback={null}>
                  <Match when={element.type === 'picture'}>
                    <Picture element={element} />
                  </Match>
                  <Match when={element.type === 'video'}>
                    <video
                      class='rounded-md hover:shadow-lg transition-all duration-300 ease-in-out h-80 object-cover'
                      src={element.value as string}
                      muted
                      autoplay
                      controls
                      width='100%'
                      aria-label={element.description}
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </Match>
                </Switch>
              )}
            </For>
          </div>
        </Expandable>
      </Show>
    </div>
  )
}

export default Gallery
