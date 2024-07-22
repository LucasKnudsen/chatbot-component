import { JSX } from 'solid-js'

export const ExitFullScreenIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M3 9H6C7.654 9 9 7.654 9 6V3C9 2.448 8.552 2 8 2C7.448 2 7 2.448 7 3V6C7 6.551 6.551 7 6 7H3C2.448 7 2 7.448 2 8C2 8.552 2.448 9 3 9Z'
        fill={props.color || 'black'}
      />
      <path
        d='M18 9H21C21.553 9 22 8.552 22 8C22 7.448 21.553 7 21 7H18C17.448 7 17 6.551 17 6V3C17 2.448 16.553 2 16 2C15.447 2 15 2.448 15 3V6C15 7.654 16.346 9 18 9Z'
        fill={props.color || 'black'}
      />
      <path
        d='M8 22C7.448 22 7 21.553 7 21V18C7 17.448 6.551 17 6 17H3C2.448 17 2 16.553 2 16C2 15.447 2.448 15 3 15H6C7.654 15 9 16.346 9 18V21C9 21.553 8.552 22 8 22Z'
        fill={props.color || 'black'}
      />
      <path
        d='M15 21C15 21.553 15.447 22 16 22C16.553 22 17 21.553 17 21V18C17 17.448 17.448 17 18 17H21C21.553 17 22 16.553 22 16C22 15.447 21.553 15 21 15H18C16.346 15 15 16.346 15 18V21Z'
        fill={props.color || 'black'}
      />
    </svg>
  )
}
