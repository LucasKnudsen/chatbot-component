import { useTheme } from '@/features/theme'

type Props = {
  text?: string
  size?: number
  durationAnimation?: number
}

export const IndicationMessage = (props: Props) => {
  const { theme } = useTheme()

  return (
    <>
      <style>
        {`
          .text-loading {
            position: relative;
            display: inline-block;
            color: ${theme().surfaceHoveredBackground};
            overflow: hidden;
            background: linear-gradient(
              to right,
              ${theme().surfaceHoveredBackground} 0%,
              ${theme().primaryColor} 50%,
              ${theme().surfaceHoveredBackground} 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: lightUp ${props.durationAnimation || 2}s infinite;
            background-size: 200% 100%;
          }

          @keyframes lightUp {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
          
        `}
      </style>
      <div class='animate-fade-in'>
        <p class='text-loading text-base tracking-wide' data-text={props.text || 'Thinking'}>
          {props.text || 'Thinking'}...
        </p>
      </div>
    </>
  )
}
