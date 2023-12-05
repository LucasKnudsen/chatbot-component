import powerIcon from '@/assets/power-icon.svg'
import { Button } from '@/components'
import { Divider } from '@/components/Divider'
import { DeleteIcon } from '@/components/icons/DeleteIcon'
import { For, createMemo } from 'solid-js'

type MenuItemProps = {
  name: string
  onClick: () => void
  icon: any
}

type MenuSettingsProps = {
  toggleBot: () => void
  clear: () => void
  setSidebarOpen?: (open: boolean) => void
}

export const MenuSettings = (props: MenuSettingsProps) => {
  const menuItems = createMemo<MenuItemProps[]>(() => [
    {
      name: 'Clear History',
      icon: <DeleteIcon width={15} />,
      onClick: () => {
        props.clear()
        props.setSidebarOpen?.(false)
      },
    },
  ])

  return (
    <div class='flex flex-col '>
      <Divider margin={24} />

      <ul>
        <For each={menuItems()}>{(item) => <MenuItem {...item} />}</For>
      </ul>

      <Divider margin={24} />

      <Button onClick={props.toggleBot} padding='8px'>
        <img class='m-auto' src={powerIcon} />
      </Button>
    </div>
  )
}

export const MenuItem = (props: MenuItemProps) => {
  return (
    <li>
      <button
        class='flex text-xs items-center transition  hover:font-medium '
        onClick={props.onClick}
      >
        <div class='mr-5'>{props.icon}</div>

        {props.name}
      </button>
    </li>
  )
}
