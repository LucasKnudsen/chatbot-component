import { ContextualElement } from '@/graphql'

type Props = {
  element: ContextualElement
}

export const Iframe = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  return (
    <iframe
      data-testid='iframe-resource'
      class='rounded-xl h-72 w-full'
      src={element.value!}
      aria-label={element.description!}
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowfullscreen
    />
  )
}
