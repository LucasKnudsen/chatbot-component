import { ContextualElement } from '@/features/contextual'
import { useTheme } from '@/features/theme/hooks'
import { createSignal, onCleanup } from 'solid-js'

type Props = {
  element: ContextualElement
}

const Picture = ({ element }: Props) => {
  const [isZoomed, setIsZoomed] = createSignal(false)
  const [isHovered, setIsHovered] = createSignal(false)

  const { theme } = useTheme()

  const handleImageClick = (event: MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setIsZoomed(true)
  }

  const handleCloseZoom = () => {
    setIsZoomed(false)
    setIsHovered(false)
  }

  // Close popup when clicking outside of it
  const handleClickOutside = (event: MouseEvent, ref: HTMLElement | null) => {
    if (isZoomed() && ref && ref.contains(event.target as Node)) {
      handleCloseZoom()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      handleCloseZoom()
    }
  }

  let popupRef: HTMLElement | null
  document.addEventListener('click', (event) => handleClickOutside(event, popupRef))
  document.addEventListener('keydown', handleKeyDown)

  onCleanup(() => {
    document.removeEventListener('click', (event) => handleClickOutside(event, popupRef))
    document.removeEventListener('keydown', handleKeyDown)
  })

  return (
    <div
      class='relative h-full w-full'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        class={`rounded-lg object-cover h-full w-full`}
        src={element.value as string}
        alt={element.description}
        loading='lazy'
        onError={(e) => (e.currentTarget.style.display = 'none')}
        onClick={handleImageClick}
      />

      <div
        class={`absolute inset-0 flex items-center justify-center cursor-pointer rounded-lg
          transition-all duration-300 ease-in-out ${isHovered() ? 'opacity-100' : 'opacity-0'}`}
        style='background-color: rgba(0, 0, 0, 0.3);'
        onClick={handleImageClick}
      >
        <span class='text-white text-3xl'>🔍</span>
      </div>

      {isZoomed() && (
        <div
          class='fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center transition-all duration-300 ease-in-out'
          style='background-color: rgba(0, 0, 0, 0.6);'
          ref={(el) => (popupRef = el)}
        >
          <img
            class='max-w-3xl max-h-full rounded-lg transition-transform duration-300 ease-in-out animate-fade-in'
            src={element.value as string}
            alt={element.description}
            onClick={handleCloseZoom}
            style={isZoomed() ? 'transform: scale(1)' : 'transform: scale(0)'}
          />
        </div>
      )}
    </div>
  )
}

export default Picture
