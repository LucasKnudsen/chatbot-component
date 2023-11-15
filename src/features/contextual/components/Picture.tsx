import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Picture = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  // TODO: Add onClick to open link in new tab
  // TODO: Add onHover to show description and link indication
  return <img src={element.value} alt={element.description} width='100%' height={240} />
}
