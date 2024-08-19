import { useTheme } from '@/features/theme'

type Props = {
  text?: string
  size?: number
  durationAnimation?: number
}
export const TextLoading = (props: Props) => {
  const { theme } = useTheme()
  return (
    <>
      <style>
        {`
          .text-loading {
            width: fit-content;
            font-size: ${props.size || 16}px;
            color: ${theme().primaryColor};
            clip-path: inset(0 100% 0 0);
            animation: l5 ${props.durationAnimation || 1.5}s steps(11) infinite;
          }
          .text-loading:before {
            content:"${props.text || 'Thinking'}..."
          }
          @keyframes l5 {to{clip-path: inset(0 -1ch 0 0)}}
        `}
      </style>
      <div class='text-loading inline'></div>
    </>
  )
}
