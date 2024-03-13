import { JSX } from 'solid-js/jsx-runtime'

export const ArrowRightIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => (
  <svg
    width='32'
    height='26'
    viewBox='0 0 32 26'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M20.0067 0.681558L30.8689 11.5437C31.5355 12.2103 31.5355 13.291 30.8689 13.9575L20.0067 24.8197C19.3402 25.4863 18.2595 25.4863 17.5929 24.8197C16.9264 24.1531 16.9264 23.0724 17.5929 22.4059L25.5414 14.4575L2.35282 14.4575C1.41017 14.4575 0.645996 13.6933 0.645996 12.7506C0.645996 11.808 1.41017 11.0438 2.35282 11.0438L25.5414 11.0438L17.5929 3.09537C16.9264 2.42882 16.9264 1.34811 17.5929 0.681558C18.2595 0.0150015 19.3402 0.0150015 20.0067 0.681558Z'
      fill={props.color || 'currentColor'}
    />
  </svg>
)
