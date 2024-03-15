import { JSX } from 'solid-js'

export const CircleCloseRightIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width='34'
      height='34'
      viewBox='0 0 34 34'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle
        cx='17'
        cy='17'
        r='16'
        transform='rotate(90 17 17)'
        fill='currentColor'
        stroke='white'
      />
      <path
        d='M12.2665 13.5324L15.8018 17.0045L12.2665 20.4765C11.9112 20.8255 11.9112 21.3893 12.2665 21.7383C12.6219 22.0872 13.1959 22.0872 13.5513 21.7383L17.7335 17.6309C18.0888 17.2819 18.0888 16.7181 17.7335 16.3691L13.5513 12.2617C13.1959 11.9128 12.6219 11.9128 12.2665 12.2617C11.9203 12.6107 11.9112 13.1834 12.2665 13.5324Z'
        fill='white'
      />
      <path d='M22 13L22 21' stroke='white' stroke-width='2' stroke-linecap='round' />
    </svg>
  )
}
