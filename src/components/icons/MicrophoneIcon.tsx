import { JSX } from 'solid-js'

export const MicrophoneIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      class='icon icon-tabler icon-tabler-microphone '
      width='44'
      height='44'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z' />
      <path d='M5 10a7 7 0 0 0 14 0' />
      <path d='M8 21l8 0' />
      <path d='M12 17l0 4' />
    </svg>
  )
}
