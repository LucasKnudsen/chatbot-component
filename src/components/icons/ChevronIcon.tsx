import { JSX } from 'solid-js/jsx-runtime'
const defaultButtonColor = '#3B81F6'

export const ChevronIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    class='icon icon-tabler icon-tabler-chevron-down transition-all duration-300 ease-in-out '
    viewBox='0 0 24 24'
    stroke-width='2'
    stroke='currentColor'
    fill='none'
    stroke-linecap='round'
    stroke-linejoin='round'
    width='19px'
    style={{ stroke: props.color ?? defaultButtonColor }}
    {...props}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path d='M6 9l6 6l6 -6' />
  </svg>
)
