import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Video = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  return (
    <video
      src={element.value}
      muted
      autoplay
      width='100%'
      height={240}
      aria-label={element.description}
      controls
    />
  )
}
