import { ContextualElement } from '@/features/contextual'

type Props = {
  element: ContextualElement
}

const Video = (props: Props) => {
  return (
    <video
      data-testid='video-resource'
      class='rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out h-full w-full  object-cover '
      src={props.element.value as string}
      muted
      autoplay
      controls
      aria-label={props.element.description}
      onError={(e) => (e.currentTarget.style.display = 'none')}
    />
  )
}

export default Video
