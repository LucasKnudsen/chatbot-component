type Props = {
  text?: string
  size?: number
  durationAnimation?: number
}
export const TextLoading = (props: Props) => {
  return (
    <>
      <style>
        {`
  .text-loading {
    width: fit-content;
    clip-path: inset(0 100% 0 0);
    animation: l5 ${props.durationAnimation || 2}s steps(11) infinite;
  }
  
  @keyframes l5 {
    0% {
      clip-path: inset(0 100% 0 0);
    }
    50% {
      clip-path: inset(0 -1ch 0 0);
    }
    100% {
      clip-path: inset(0 -1ch 0 0); /* Maintain the final state for the pause */
    }
  }
`}
      </style>
      <div class='animate-fade-in'>
        <p class='text-loading animate-pulse text-base text-[var(--primaryColor)] tracking-wide '>
          {props.text || 'Thinking'}...
        </p>
      </div>
    </>
  )
}
