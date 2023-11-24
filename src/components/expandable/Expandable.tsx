import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { JSX, Show, createSignal } from 'solid-js'
import { ChevronIcon } from '../icons'

type Props = {
  children: JSX.Element
  header: string
  onOpen?: () => void
  defaultOpen?: boolean
}

export const Expandable = (props: Props) => {
  const [open, setOpen] = createSignal(Boolean(props.defaultOpen))
  const [parent] = createAutoAnimate()

  const { theme } = useTheme()

  const toggle = () => {
    setOpen((prev) => {
      !prev && props.onOpen?.()

      return !prev
    })
  }

  return (
    <div
      ref={parent}
      class={`border rounded-lg `}
      style={{
        background: theme().promptBackground,
      }}
    >
      <div class='flex p-6 cursor-pointer gap-x-6 items-center' onClick={toggle}>
        <p class='font-medium text-sm underline' style={{ color: theme().primaryColor }}>
          {props.header}
        </p>

        <div
          class='flex rounded-full h-4 w-4 align-center justify-center'
          style={{
            background: theme().primaryColor,
          }}
        >
          <ChevronIcon
            color='white'
            width={12}
            style={{
              transform: open() ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </div>

      <Show when={open()}>{props.children}</Show>
    </div>
  )
}
