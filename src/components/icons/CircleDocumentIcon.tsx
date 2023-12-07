import { JSX } from 'solid-js'

export const CircleDocumentIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      // @ts-ignore
      xmlns:xlink='http://www.w3.org/1999/xlink'
      {...props}
    >
      <circle
        cx='15.0783'
        cy='15.0784'
        r='14.0784'
        transform='rotate(90 15.0783 15.0784)'
        fill={props.color || '#5B93FF'}
        fill-opacity='0.75'
        stroke='white'
      />
      <rect x='6' y='6' width='18' height='18' fill='url(#pattern0)' />
      <defs>
        <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use // @ts-ignore
            xlink:href='#image0_472_4122'
            transform='scale(0.0111111)'
          />
        </pattern>
        <image
          id='image0_472_4122'
          width='90'
          height='90'
          // @ts-ignore
          xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKElEQVR4nO2ZO05kMRBFK2IHBPwWhASzD4ZP2iyhCckmmIg9MLOUgQUAMRAhQBc95OCJQcJQ9nVh3yN10lJV3Tqy/Lr1zIQQQgghwgBgBcAJgGv0yxWA5bRrS9FTgFFYthTd80l+y01L0UNhEs1BoklINAmJJiHRJCSahESTkGgSoUXbNwGRdwkdrqddQofraZfQ4XraJXS4nnYJHa6nXUKH62mX0OF62iV0uJ52wWDY5z2UebGLwbCve/C92MVg2Nc9+F7sYjDM4UGiP4FEk5BoEhJNQqJJSDQJiSYh0SRCi3YNmNGqv0QnJJokwir3z5nlqa0ertQsq9xfohMSTRJhlfvnzPLUFgvXEybRHCSahESTkGgSEk0itGjXgBmt+kt0QqJJIqxy/5xZntrq4UrNssr9JToh0SQRVrl/zixPbbFwPWESzUGiSUg0CYkmIdEkQot2DZjRqr9EJySaJMIq98+Z5amtHq7ULKvcX6ITEk0SYZX758zy1BYL1xMm0RwkegDR9xiL9XccbGTU3XpFX2IsFu84OM6ou/CK/ouxeJhkTyc7fRbpu48494o+ICzXA3te0VsAnlpvEZxHAJsu0Un279abBOeXW/LsqXvXepug3AJYKyI6yd7WFfIfzwB2i0meyT5KzQVePRwWlzyT/UPXCKbrYqea5JnsVQCn6Wk72ik+K3onZwrfBLAP4A+Afx3+Xb9Pe50D+FnkJ5wQQgghhNXiBZnuCSlF77qXAAAAAElFTkSuQmCC'
        />
      </defs>
    </svg>
  )
}
