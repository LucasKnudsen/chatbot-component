import { botStore } from '@/features/bot'
import { configStore, configStoreActions } from '@/features/portal-init'
import { Menu2Icon } from '../../icons'
import { DrawerMenu } from './DrawerMenu'

export const DesktopDrawerContainer = () => {
  return (
    <div
      class={`flex flex-col w-full h-full  overflow-hidden  transition-all ]
              border-l border-[var(--borderColor)]
              `}
      style={{
        width: botStore.activeChannel ? (configStore.isDrawerOpened ? '272px' : '82px') : '0',
        'transition-duration': '0.25s',
        padding: botStore.activeChannel ? '0 20px' : '0',
      }}
    >
      <div class='min-h-[130px] flex justify-end items-center w-full '>
        <div class='cursor-pointer' onClick={configStoreActions.toggleDrawer}>
          <Menu2Icon class='text-[var(--primaryColor)] w-8 ' />
        </div>
      </div>

      <div
        class='pb-12 flex '
        style={{
          height: 'calc(100% - 144px)',
        }}
      >
        <DrawerMenu />
      </div>
    </div>
  )
}
