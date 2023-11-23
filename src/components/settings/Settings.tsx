import { useTheme } from '@/features/theme/hooks'
import { createAutoAnimate } from '@formkit/auto-animate/solid'
import { For, JSX, Show, createSignal } from 'solid-js'
import { Divider } from '../Divider'
import { SettingsButton } from '../icons'

type MenuItem = {
  label: string
  onClick: () => void | Promise<void>
  icon?: JSX.Element
}

type Props = {
  menuItems: MenuItem[]
  minWidth?: string
}

export const Settings = (props: Props) => {
  const [isOpen, setIsOpen] = createSignal(false)

  const [animate] = createAutoAnimate({ duration: 100 })
  const { theme } = useTheme()
  const { borderColor, primaryColorHovered } = theme()

  const toggleMenu = () => {
    setIsOpen(!isOpen())
  }

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false)
  }

  // Prevent closing the menu when clicking inside it
  const handleMenuClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <>
      <style>
        {`
        .settings-menu-item:hover {
          background: ${primaryColorHovered};
        }
      `}
      </style>

      <div ref={animate} class='relative inline-block text-left'>
        <div>
          <button type='button' class='flex items-center  px-2' onClick={toggleMenu}>
            <SettingsButton />
          </button>
        </div>

        <Show when={isOpen()}>
          <div
            class='absolute right-0 mt-2 w-fit border rounded-lg shadow-lg z-10 backdrop-blur-md bg-white/75'
            style={{
              'border-color': borderColor,
              'min-width': props.minWidth || '200px',
            }}
          >
            <div
              class='p-2'
              onClick={handleMenuClick} // Prevent closing when clicking inside the menu
            >
              <For each={props.menuItems}>
                {(item, index) => (
                  <>
                    <button
                      type='button'
                      class='flex text-sm w-full p-3 rounded-lg items-center hover:font-medium settings-menu-item '
                      onClick={async () => {
                        await item.onClick()
                        closeMenu()
                      }}
                    >
                      {item.icon}
                      <span class='ml-3 whitespace-nowrap'>{item.label}</span>
                    </button>

                    <Show when={index() !== props.menuItems.length - 1}>
                      <Divider />
                    </Show>
                  </>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </>
  )
}
