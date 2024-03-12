import { botStore } from '@/features/bot'
import { configStore, configStoreActions } from '@/features/portal-init'
import { Menu2Icon } from '../icons'
import { DrawerMenu } from './DrawerMenu'

export const DesktopDrawerContainer = () => {
  console.log('configStore.isDrawerOpened', configStore.isDrawerOpened)

  return (
    <div
      class={`flex flex-col w-full relative overflow-hidden  transition-all ]
              border-l border-[var(--borderColor)]
              `}
      style={{
        width: botStore.activeChannel ? (configStore.isDrawerOpened ? '272px' : '82px') : '0',
        'transition-duration': '0.25s',
        padding: botStore.activeChannel ? '0 20px 96px 20px' : '0',
      }}
    >
      <div class='h-[144px] flex justify-end items-center w-full '>
        <div class='h-8 cursor-pointer' onClick={configStoreActions.toggleDrawer}>
          <Menu2Icon class='text-[var(--primaryColor)] w-8 ' />
        </div>
      </div>

      <DrawerMenu />
    </div>
  )
}
