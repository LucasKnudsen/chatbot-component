import { createSignal, onCleanup } from 'solid-js'

const useHovered = (): [(element: HTMLElement) => void, () => boolean] => {
  let element: HTMLElement | undefined
  const [isHovered, setIsHovered] = createSignal(false)

  const handleMouseOver = () => setIsHovered(true)
  const handleMouseOut = () => setIsHovered(false)

  const setRef = (el: HTMLElement) => {
    if (el) {
      element = el
      el.addEventListener('mouseover', handleMouseOver)
      el.addEventListener('mouseout', handleMouseOut)

      onCleanup(() => {
        el.removeEventListener('mouseover', handleMouseOver)
        el.removeEventListener('mouseout', handleMouseOut)
      })
    }
  }

  return [setRef, isHovered]
}

export default useHovered
