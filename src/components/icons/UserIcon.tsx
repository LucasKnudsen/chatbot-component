import { JSX } from 'solid-js/jsx-runtime'

export const UserIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    class='icon icon-tabler icon-tabler-user-filled'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    stroke-width='1.5'
    stroke={props.color || 'currentColor'}
    fill='none'
    stroke-linecap='round'
    stroke-linejoin='round'
    {...props}
  >
    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
    <path
      d='M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z'
      stroke-width='0'
      fill={props.color || 'currentColor'}
    />
    <path
      d='M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z'
      stroke-width='0'
      fill={props.color || 'currentColor'}
    />
  </svg>
)
