import { useTheme } from '@/features/theme/hooks'
import { For, JSX, Show, createEffect, createSignal, onCleanup } from 'solid-js'
import { Divider } from '../Divider'
import { SettingsButton } from '../icons'

type Props = {
  menuItems: MenuItemProps[]
  minWidth?: string
  transformOrigin?: string
}

export const Settings = (props: Props) => {
  let menuRef: HTMLDivElement | undefined = undefined
  const [isOpen, setIsOpen] = createSignal(false)

  const { theme } = useTheme()

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

  // Function to handle document click
  const handleDocumentClick = (e: MouseEvent) => {
    if (menuRef && !menuRef.contains(e.target as Node)) {
      closeMenu()
    }
  }

  // Add event listener when the menu is opened and remove it when closed
  createEffect(() => {
    if (isOpen()) {
      document.addEventListener('click', handleDocumentClick)
    } else {
      document.removeEventListener('click', handleDocumentClick)
    }
  })

  // Cleanup the event listener when the component is unmounted
  onCleanup(() => {
    document.removeEventListener('click', handleDocumentClick)
  })

  return (
    <>
      <div ref={menuRef} class='relative inline-block text-left'>
        <div>
          <button type='button' class='flex items-center  px-2' onClick={toggleMenu}>
            <SettingsButton />
          </button>
        </div>

        {/* <Show when={isOpen()}> */}
        <div
          class='absolute right-0 mt-2 w-fit border rounded-lg shadow-lg z-10 backdrop-blur-md '
          style={{
            'border-color': theme().borderColor,
            background: theme().drawerBackground,
            'min-width': props.minWidth || '200px',
            transition: 'transform 250ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
            'transform-origin': props.transformOrigin || 'top right',
            transform: isOpen() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          }}
        >
          <div
            class='p-2'
            onClick={handleMenuClick} // Prevent closing when clicking inside the menu
          >
            <For each={props.menuItems}>
              {(item, index) => (
                <>
                  <MenuItem
                    {...item}
                    onClick={async () => {
                      await item.onClick()
                      closeMenu()
                    }}
                  />

                  <Show when={index() !== props.menuItems.length - 1}>
                    <Divider />
                  </Show>
                </>
              )}
            </For>
          </div>
        </div>
        {/* </Show> */}
      </div>
    </>
  )
}

type MenuItemProps = {
  label: string
  onClick: () => void | Promise<void>
  icon?: JSX.Element
}

const MenuItem = (props: MenuItemProps) => {
  const { theme } = useTheme()

  const primaryAccent = theme().primaryAccent

  return (
    <>
      <style>
        {`
        .settings-menu-item:hover {
          background: ${primaryAccent};
        }
      `}
      </style>

      <button
        type='button'
        class='flex text-sm w-full p-3 rounded-lg items-center font-medium settings-menu-item '
        onClick={props.onClick}
      >
        {props.icon}
        <span class='ml-3 whitespace-nowrap'>{props.label}</span>
      </button>
    </>
  )
}
