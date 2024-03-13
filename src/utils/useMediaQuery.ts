import { createEffect, createSignal } from 'solid-js'

type Device = 'mobile' | 'tablet' | 'desktop'

export const useMediaQuery = () => {
  const [device, setDevice] = createSignal<Device>('desktop')

  const checkDevice = () => {
    const width = window.innerWidth
    if (width < 768 && device() !== 'mobile') {
      setDevice('mobile')
    } else if (width >= 768 && width < 1024 && device() !== 'tablet') {
      setDevice('tablet')
    } else if (width >= 1024 && device() !== 'desktop') {
      setDevice('desktop')
    }
  }

  createEffect(() => {
    // Perform an immediate check on mount.
    checkDevice()

    window.addEventListener('resize', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  return device
}
