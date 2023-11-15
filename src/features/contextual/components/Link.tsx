import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Link = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  // TODO: Add onClick to open link in new tab
  // TODO: Add onHover to show description and link indication

  return (
    <div class='flex flex-row items-center justify-between py-2 border-b border-gray-200 '>
      <p class='pr-8 text-sm font-medium text-gray-500 whitespace-nowrap'>Read more:</p>
      <a class='text-sm break-words text-right' href={element.value} target='_blank'>
        {element.value}
      </a>
    </div>
  )
}
