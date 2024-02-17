import { JSX, Show } from 'solid-js'

import { Spinner } from '../loaders'
import { useTheme } from '@/features/theme/hooks'

type Props = {
  onClick?: () => void | Promise<void>
  loading?: boolean
  children: JSX.Element
  padding?: string
  class?: string
}

export const Button = (props: Props) => {
  const padding = props.padding ?? '4px 12px'
  const { theme } = useTheme()

  return (
    <button
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
        fallback={<Spinner size={16} backgroundColor={theme().onPrimary} />}
      >
        {props.children}
      </Show>
    </button>
  )
}
