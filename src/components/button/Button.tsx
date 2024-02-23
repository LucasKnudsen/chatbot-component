import { JSX, Show } from 'solid-js'

import { TypingBubble } from '@/components'
import { useTheme } from '@/features/theme/hooks'

// import { Spinner } from '../loaders'

type Props = {
  onClick?: () => void | Promise<void>
  loading?: boolean
  children: JSX.Element
  padding?: string
  class?: string
  type?: 'button' | 'submit' | 'reset' | undefined
}

export const Button = (props: Props) => {
  const padding = props.padding ?? '4px 12px'
  const { theme } = useTheme()

  return (
    <button
      type={props.type}
      class={
        'rounded-full font-bold text-sm leading-[17px] active:scale-95 transition hover:brightness-110 flex justify-center items-center ' +
        props.class
      }
      style={{
        background: theme().primaryColor,
        color: theme().onPrimary,
        padding,
      }}
      onClick={props.onClick}
    >
      <Show
        when={!props.loading}
        fallback={
          <div class='relative top-0.5'>
            <TypingBubble color={theme().backgroundColor} />
          </div>
        }
      >
        {/* <Spinner size={16} backgroundColor={theme().onPrimary} /> */}
        {props.children}
      </Show>
    </button>
  )
}
