import { useMediaQuery } from '@/utils/useMediaQuery'
import { createSignal, onCleanup, onMount } from 'solid-js'

export function useScrollOnResize() {
  const [height, setHeight] = createSignal(window.visualViewport!.height)
  const device = useMediaQuery()

  const handleResize = () => {
    setTimeout(() => {
      setHeight((prev) => {
        if (prev > window.visualViewport!.height) {
          if (window.scrollY < 150) {
            // Only triggers if the keyboard overlays (and not pushing up)
            window.scrollBy({
              top: prev - window.visualViewport!.height,
              behavior: 'smooth',
            })
          }
        }
        return window.visualViewport!.height
      })
    }, 0)
  }

  onMount(() => {
    if (device() === 'desktop') return
    window.visualViewport?.addEventListener('resize', handleResize)
  })

  onCleanup(() => {
    if (device() === 'desktop') return
    window.visualViewport?.removeEventListener('resize', handleResize)
  })

  return height
}
