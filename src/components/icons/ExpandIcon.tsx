import { JSX } from 'solid-js'

export const ExpandIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width='93'
      height='93'
      viewBox='0 0 93 93'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M30.2875 30.2875L4 4M4 4V25.03M4 4H25.03'
        stroke={props.color || 'black'}
        stroke-width='7.88625'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M61.8325 30.2875L88.12 4M88.12 4V25.03M88.12 4H67.09'
        stroke={props.color || 'black'}
        stroke-width='7.88625'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M30.2875 61.8325L4 88.12M4 88.12V67.09M4 88.12H25.03'
        stroke={props.color || 'black'}
        stroke-width='7.88625'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M61.8325 61.8325L88.12 88.12M88.12 88.12V67.09M88.12 88.12H67.09'
        stroke={props.color || 'black'}
        stroke-width='7.88625'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
