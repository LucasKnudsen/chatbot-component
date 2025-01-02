import { useTheme } from '@/features/theme'
import { Component, createSignal, JSX, onCleanup } from 'solid-js'

type PopoverProps = {
  content: string
  children: JSX.Element
  position?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
  class?: string
}

export const Popover: Component<PopoverProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false)
  const [popoverElement, setPopoverElement] = createSignal<HTMLDivElement | null>(null)
  let targetRef: HTMLDivElement | undefined
  let hideTimeoutRef: number | undefined
  const { theme } = useTheme();

  const showPopover = () => {
    // Clear any existing hide timeout
    if (hideTimeoutRef !== undefined) {
      clearTimeout(hideTimeoutRef)
      hideTimeoutRef = undefined
    }

    // Remove any existing popover first
    const existingPopover = popoverElement()
    if (existingPopover) {
      existingPopover.remove()
      setPopoverElement(null)
    }

    const popover = document.createElement('div')
    popover.className = `popover ${props.class || ''}`
    popover.textContent = props.content
    popover.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
      z-index: 9999;
    `

    // Position the popover based on the specified position
    const offset = props.offset || 8
    switch (props.position || 'top') {
      case 'top':
        popover.style.bottom = '100%'
        popover.style.left = '0%'
        popover.style.marginBottom = `${offset}px`
        break
      case 'bottom':
        popover.style.top = '100%'
        popover.style.left = '50%'
        popover.style.transform = 'translateX(-50%)'
        popover.style.marginTop = `${offset}px`
        break
      case 'left':
        popover.style.right = '100%'
        popover.style.top = '50%'
        popover.style.transform = 'translateY(-50%)'
        popover.style.marginRight = `${offset}px`
        break
      case 'right':
        popover.style.left = '100%'
        popover.style.top = '50%'
        popover.style.transform = 'translateY(-50%)'
        popover.style.marginLeft = `${offset}px`
        break
    }

    if (targetRef) {
      targetRef.appendChild(popover)
      setPopoverElement(popover)
      requestAnimationFrame(() => {
        popover.style.opacity = '1'
      })
    }
    setIsVisible(true)
  }

  const hidePopover = () => {
    const popover = popoverElement()
    if (popover) {
      popover.style.opacity = '0'
      if (hideTimeoutRef !== undefined) {
        clearTimeout(hideTimeoutRef)
      }
      hideTimeoutRef = setTimeout(() => {
        popover.remove()
        setPopoverElement(null)
        hideTimeoutRef = undefined
      }, 200) as unknown as number
    }
    setIsVisible(false)
  }

  onCleanup(() => {
    if (hideTimeoutRef !== undefined) {
      clearTimeout(hideTimeoutRef)
    }
    const popover = popoverElement()
    if (popover) {
      popover.remove()
    }
  })

  return (
    <div
      ref={targetRef}
      style={{
        position: 'relative',
        padding: '3px',
        "border-radius": '5px',
        background: isVisible() ? theme().surfaceBackground: 'transparent',
      }}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      {props.children}
    </div>
  )
}
