import { JSX } from 'solid-js'

export const SidebarTabIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width='36'
      height='30'
      viewBox='0 0 36 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M13 29.8678C13.6543 29.955 14.3219 30 15 30H36V0H15C14.3219 0 13.6543 0.0449981 13 0.132171L13 29.8678ZM11 0.539233C4.65763 2.28972 0 8.10094 0 15C0 21.8991 4.65763 27.7103 11 29.4608L11 0.539233Z'
        fill={props.color || '#5B93FF'}
      />
      <path
        d='M25.7335 18.4676L22.1982 14.9955L25.7335 11.5235C26.0888 11.1745 26.0888 10.6107 25.7335 10.2617C25.3781 9.91275 24.8041 9.91275 24.4487 10.2617L20.2665 14.3691C19.9112 14.7181 19.9112 15.2819 20.2665 15.6309L24.4487 19.7383C24.8041 20.0872 25.3781 20.0872 25.7335 19.7383C26.0797 19.3893 26.0888 18.8166 25.7335 18.4676Z'
        fill='#E0DEE8'
      />
    </svg>
  )
}
