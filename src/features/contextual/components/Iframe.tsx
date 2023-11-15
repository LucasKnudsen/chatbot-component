import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Iframe = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  console.log(element)

  return (
    <iframe
      width='100%'
      height={240}
      src={element.value}
      aria-label={element.description}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowfullscreen
    />
  )
}
