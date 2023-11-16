import { ContextualElement } from '..'

type Props = {
  element: ContextualElement
}

export const Fact = ({ element }: Props) => {
  return (
    <div class='flex flex-row items-center justify-between py-2 border-b border-gray-200 '>
      <p class='pr-8 text-sm font-medium text-gray-500'>{element.header}:</p>
      <p class='text-sm font-medium text-gray-900 text-right break-words'>
        {Array.isArray(element.value) ? element.value.join(', ') : element.value}
      </p>
    </div>
  )
}
