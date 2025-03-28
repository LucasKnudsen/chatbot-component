import { JSX } from 'solid-js'

export const SparklesIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke={props.color || 'currentColor'}
    stroke-width='1.6'
    stroke-linecap='round'
    stroke-linejoin='round'
    class='icon icon-tabler icons-tabler-outline icon-tabler-sparkles'
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z' />
  </svg>
)
