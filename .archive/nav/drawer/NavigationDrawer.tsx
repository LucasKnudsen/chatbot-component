import { useMediaQuery } from '@/utils/useMediaQuery'
import { Match, Switch } from 'solid-js'
import { DesktopDrawerContainer } from './DesktopDrawerContainer'
import { MobileDrawerContainer } from './MobileDrawerContainer'

export const NavigationDrawer = () => {
  const device = useMediaQuery()

  return (
    <Switch>
      <Match when={device() === 'desktop'}>
        <DesktopDrawerContainer />
      </Match>

      <Match when={device() !== 'desktop'}>
        <MobileDrawerContainer />
      </Match>
    </Switch>
  )
}
