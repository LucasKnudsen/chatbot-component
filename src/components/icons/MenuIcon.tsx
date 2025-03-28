import { JSX } from 'solid-js'

export const MenuIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width='50'
      height='8'
      viewBox='0 0 50 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect width='50' height='2' rx='1' fill={props.color || '#5B93FF'} />
      <rect x='24' y='6' width='26' height='2' rx='1' fill={props.color || '#5B93FF'} />
    </svg>
  )
}
