interface CreateWaveformOptions {
  container: HTMLElement
  primaryColor: string
  numDots?: number
}

export const createWaveform = ({ container, primaryColor, numDots = 30 }: CreateWaveformOptions) => {
  // Create waveform container
  const waveformContainer = document.createElement('div')
  waveformContainer.className = 'waveform-container'
  waveformContainer.style.display = 'flex'
  waveformContainer.style.justifyContent = 'center'
  waveformContainer.style.alignItems = 'center'
  waveformContainer.style.gap = '2px'
  waveformContainer.style.height = '20px'
  container.appendChild(waveformContainer)

  // Create dots
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div')
    dot.className = 'waveform-dot'
    dot.style.width = '3px'
    dot.style.height = '3px'
    dot.style.borderRadius = '50%'
    dot.style.backgroundColor = primaryColor
    dot.style.transition = 'height 0.1s ease-in-out'
    waveformContainer.appendChild(dot)
  }

  return {
    updateWaveform: (bars: { value: number[] }[]) => {
      const dots = waveformContainer.children
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i] as HTMLElement
        const barIndex = Math.floor((i / dots.length) * bars.length)
        const value = bars[barIndex].value[0]
        const height = Math.max(3, value * 40)
        dot.style.height = `${height}px`
      }
    },
    destroy: () => {
      if (container.contains(waveformContainer)) {
        container.removeChild(waveformContainer)
      }
    }
  }
}
