import { JSX } from 'solid-js'

export const ArrowLeftIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    width='96'
    height='92'
    viewBox='0 0 96 92'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M90.12 46.3776H6M6 46.3776L46.3776 6M6 46.3776L46.3776 86.7552'
      stroke={props.color || 'black'}
      stroke-width='10.0944'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
