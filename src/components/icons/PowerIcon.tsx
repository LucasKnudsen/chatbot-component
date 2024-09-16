import { JSX } from 'solid-js'

export const PowerIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width='13'
      height='13'
      viewBox='0 0 13 13'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M6.5 0C6.94807 0 7.3113 0.363232 7.3113 0.811302V4.87466C7.3113 5.32273 6.94807 5.68596 6.5 5.68596C6.05193 5.68596 5.6887 5.32273 5.6887 4.87466V0.811302C5.6887 0.363232 6.05193 0 6.5 0ZM3.56375 1.93755C3.83939 2.2908 3.77647 2.80062 3.42322 3.07626C2.31764 3.93895 1.6226 5.24689 1.6226 6.70317C1.6226 9.2571 3.77823 11.3774 6.5 11.3774C9.22178 11.3774 11.3774 9.2571 11.3774 6.70317C11.3774 5.2469 10.6823 3.93896 9.57674 3.07627C9.22349 2.80062 9.16057 2.2908 9.43621 1.93755C9.71186 1.5843 10.2217 1.52138 10.5749 1.79702C12.047 2.94564 13 4.71306 13 6.70317C13 10.2084 10.0618 13 6.5 13C2.93821 13 0 10.2084 0 6.70317C0 4.71307 0.952995 2.94565 2.42503 1.79702C2.77828 1.52138 3.2881 1.5843 3.56375 1.93755Z'
        fill='currentColor'
      />
    </svg>
  )
}
