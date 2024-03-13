import { configStore } from '@/features/portal-init'
import { DrawerMenu } from './DrawerMenu'

export const MobileDrawerContainer = () => {
  return (
    <div
      class='absolute flex duration-300 top-20 bottom-0 right-0 transition-all overflow-hidden bg-[var(--backgroundColor)]  w-full  z-50 px-8 pb-4 '
      style={{
        transform: configStore.isDrawerOpened ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <DrawerMenu />
    </div>
  )
}
