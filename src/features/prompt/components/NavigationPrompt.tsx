import { InitialPrompt } from '@/graphql/types'
import { useTheme } from '@/features/theme'

type PromptProps = {
  prompt: InitialPrompt
  onClick: (prompt: string) => void
  disabled?: boolean
  class?: string
}

export const NavigationPrompt = (props: PromptProps) => {
  const { theme } = useTheme()

  return (
    <div
      class={
        'navigation-prompt flex items-start bg-[rgba(235,235,235,0.5)] hover:bg-[var(--surfaceHoveredBackground)] text-[var(--primaryColor)] border border-[var(--borderColor)] pl-3.5 py-5 pr-5 rounded-[10px] hover:font-medium font-light leading-[22px] transition-colors max-h-[80px] ' +
        props.class
      }
      style={{
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        '--navigationPromptColor': theme().primaryColor,
      }}
      onClick={() =>
        props.disabled
          ? null
          : props.onClick(typeof props.prompt === 'string' ? props.prompt : props.prompt.prompt)
      }
    >
      <span class='border-r border-[var(--borderColor)] pr-2.5'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='w-3.5 h-3.5'
        >
          <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
          <path d='M14 2v4a2 2 0 0 0 2 2h4' />
          <path d='M10 9H8' />
          <path d='M16 13H8' />
          <path d='M16 17H8' />
        </svg>
      </span>
      <span class='pl-5 -mt-1'>
        {typeof props.prompt === 'string' ? props.prompt : props.prompt.display}
      </span>
    </div>
  )
}
