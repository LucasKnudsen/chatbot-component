import { JSX } from 'solid-js'

export const FullScreenIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M2 8C2 8.552 2.448 9 3 9C3.552 9 4 8.552 4 8V5C4 4.449 4.449 4 5 4H8C8.552 4 9 3.552 9 3C9 2.448 8.552 2 8 2H5C3.346 2 2 3.346 2 5V8Z'
        fill={props.color || 'black'}
      />
      <path
        d='M20 8C20 8.552 20.447 9 21 9C21.553 9 22 8.552 22 8V5C22 3.346 20.654 2 19 2H16C15.447 2 15 2.448 15 3C15 3.552 15.447 4 16 4H19C19.552 4 20 4.449 20 5V8Z'
        fill={props.color || 'black'}
      />
      <path
        d='M8 22H5C3.346 22 2 20.654 2 19V16C2 15.447 2.448 15 3 15C3.552 15 4 15.447 4 16V19C4 19.552 4.449 20 5 20H8C8.552 20 9 20.447 9 21C9 21.553 8.552 22 8 22Z'
        fill={props.color || 'black'}
      />
      <path
        d='M16 22H19C20.654 22 22 20.654 22 19V16C22 15.447 21.553 15 21 15C20.447 15 20 15.447 20 16V19C20 19.552 19.552 20 19 20H16C15.447 20 15 20.447 15 21C15 21.553 15.447 22 16 22Z'
        fill={props.color || 'black'}
      />
    </svg>
  )
}
