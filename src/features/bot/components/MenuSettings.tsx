import powerIcon from '@/assets/power-icon.svg'
import { Button } from '@/components'
import { Divider } from '@/components/Divider'
import { configStoreActions } from '@/features/portal-init'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Show } from 'solid-js'

type MenuItemProps = {
  name: string
  onClick: () => void
  icon: any
}

export const MenuSettings = () => {
  const device = useMediaQuery()

  // const menuItems = createMemo<MenuItemProps[]>(() => [
  //   {
  //     name: 'Clear History',
  //     icon: <DeleteIcon width={15} color={theme().primaryColor} />,
  //     onClick: () => {
  //       props.clear()
  //       botStoreActions.setBotStore('isSidebarOpen', false)
  //     },
  //   },
  // ])

  return (
    <div class='flex flex-col '>
      <Divider margin={24} />

      {/* <ul>
        <For each={menuItems()}>{(item) => <MenuItem {...item} />}</For>
      </ul> */}

      <Divider margin={24} />

      <Show when={device() === 'mobile'}>
        <Button onClick={configStoreActions.toggleBot} padding='8px'>
          <img class='m-auto' src={powerIcon} />
        </Button>
      </Show>
    </div>
  )
}

export const MenuItem = (props: MenuItemProps) => {
  return (
    <li>
      <button
        class='flex w-full text-xs items-center transition  hover:font-medium '
        onClick={props.onClick}
      >
        <div class='mr-5'>{props.icon}</div>

        {props.name}
      </button>
    </li>
  )
}
