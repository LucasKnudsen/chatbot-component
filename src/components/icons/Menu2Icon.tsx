import { JSX } from 'solid-js'

export const Menu2Icon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h32v32H0z' fill='none' />
      <path d='M0 6l32 0' />
      <path d='M0 12l32 0' />
      <path d='M0 18l32 0' />
    </svg>
  )
}
