import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Iframe = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  return (
    <iframe
      class='my-2 roudned-md '
      width='100%'
      height={240}
      src={element.value}
      aria-label={element.description}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowfullscreen
    />
  )
}
