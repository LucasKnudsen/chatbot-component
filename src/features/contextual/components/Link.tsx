import { onMount } from 'solid-js'
import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Link = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  // TODO: Add onClick to open link in new tab
  // TODO: Add onHover to show description and link indication

  onMount(async () => {
    // debugger
  })

  return null
}
