import { useTheme } from '@/features/theme'

export const BorderFade = (props: {
  height?: number
  position?: 'top' | 'bottom'
  endColor?: string
}) => {
  props.position = props.position ?? 'top'

  const { theme } = useTheme()

  return (
    <div
      class='absolute w-full z-10 '
      style={{
        left: 0,
        right: 0,
        ...(props.position === 'top'
          ? injectTopStyle(props.height ?? 40, props.endColor ?? theme().backgroundColor ?? 'white')
          : injectBottomStyle(
              props.height ?? 40,
              props.endColor ?? theme().backgroundColor ?? 'white'
            )),
      }}
    />
  )
}

const injectTopStyle = (height: number, endColor: string) => {
  return {
    height: `${height}px`,
    top: `-${height}px`,
    background: `linear-gradient(180deg, transparent 0%, ${endColor} 100%)`,
  }
}

const injectBottomStyle = (height: number, endColor: string) => {
  return {
    height: `${height}px`,
    bottom: `-${height}px`,
    background: `linear-gradient(0deg, transparent 0%, ${endColor} 100%)`,
  }
}
