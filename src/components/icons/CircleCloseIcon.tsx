import { JSX } from 'solid-js'

export const CircleCloseIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width='34'
      height='34'
      viewBox='0 0 34 34'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle
        cx='17'
        cy='17'
        r='16'
        transform='rotate(90 17 17)'
        fill={props.color || '#5B93FF'}
        stroke='#C2C2C2'
      />
      <path d='M12 11.6465L22.3535 22' stroke='white' stroke-linecap='round' />
      <path d='M22.3535 11.6465L12 22' stroke='white' stroke-linecap='round' />
    </svg>
  )
}
