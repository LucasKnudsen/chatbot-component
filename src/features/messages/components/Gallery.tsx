import { Resources } from '@/features/contextual'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, Match, Switch, createMemo } from 'solid-js'
import Picture from './Gallery/Picture'

type Props = {
  resources: Resources
}

const Gallery = (props: Props) => {
  const [parent] = createAutoAnimate()

  const imagesAndVideos = createMemo(() => [...props.resources.picture, ...props.resources.video])

  return (
    <div ref={parent} class='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3  gap-4 py-4 '>
      <For each={imagesAndVideos()}>
        {(element) => (
          <Switch fallback={null}>
            <Match when={element.type === 'picture'}>
              <Picture element={element} />
            </Match>
            <Match when={element.type === 'video'}>
              <video
                class='rounded-md hover:shadow-lg transition-all duration-300 ease-in-out h-48 object-cover'
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
  )
}

export default Gallery
