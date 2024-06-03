import { TypingBubble } from '@/components'
import { useTheme } from '@/features/theme/hooks'
import { JSX } from 'solid-js'

// import { Spinner } from '../loaders'

type Props = {
  onClick?: () => void | Promise<void>
  loading?: boolean
  children: JSX.Element
  padding?: string
  class?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  style?: JSX.CSSProperties
  disabled?: boolean
}

export const Button = (props: Props) => {
  const padding = props.padding ?? '4px 12px'
  const { theme } = useTheme()

  return (
    <button
      type={props.type}
      class={
        'relative rounded-full font-medium text-sm leading-[17px] !disabled:active:scale-95 transition hover:brightness-110  disabled:opacity-50 disabled:scale-100 outline outline-1 outline-[var(--onPrimary)] ' +
        props.class
      }
      style={{
        background: theme().primaryColor,
        color: theme().onPrimary,
        padding,
        ...props?.style,
      }}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {/* CONTENT   */}
      <div
        class='flex justify-center items-center transition  '
        style={{
          opacity: props.loading ? 0 : 1,
        }}
      >
        {props.children}
      </div>

      {/* LOADER  */}
      <div
        class='absolute transition top-0.5 inset-0 flex justify-center items-center'
        style={{
          opacity: props.loading ? 1 : 0,
        }}
      >
        <TypingBubble color={theme().backgroundColor} />
      </div>

      {/* <Spinner size={16} backgroundColor={theme().onPrimary} /> */}
    </button>
  )
}
