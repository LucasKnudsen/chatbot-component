import { createSignal, onCleanup } from 'solid-js'

const useHovered = (): [(element: HTMLElement) => void, () => boolean] => {
  const [isHovered, setIsHovered] = createSignal(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const setRef = (el: HTMLElement) => {
    if (el) {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)

      onCleanup(() => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }

  return [setRef, isHovered]
}

export default useHovered
