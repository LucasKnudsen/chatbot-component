import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Link = ({ element }: Props) => {
  if (Array.isArray(element.value)) return null

  // TODO: Add onClick to open link in new tab
  // TODO: Add onHover to show description and link indication

  return (
    <div class='flex flex-col justify-between py-2 border border-gray-200 mb-2 p-2 rounded-lg '>
      <p class='pr-8 text-sm line-clamp-4'>{element.description}</p>
      <p class='pr-8 text-sm font-medium text-gray-500 mt-2 '>Read more:</p>
      <a class='text-sm break-words ' href={element.value} target='_blank'>
        {element.value}
      </a>
    </div>
  )
}
