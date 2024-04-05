import { CircleCloseIcon } from '@/components'

import { configStoreActions } from '@/features/portal-init'
import { useTheme } from '@/features/theme'
import LayoutDefault from '@/layouts/default'
import { LoginForm } from '../components'

export const LoginScreen = () => {
  const { theme } = useTheme()

  return (
    <LayoutDefault>
      <div class='absolute right-5 top-5'>
        <CircleCloseIcon
          class='cursor-pointer'
          height={24}
          color={theme().primaryColor}
          onClick={configStoreActions.toggleBot}
        />
      </div>

      <LoginForm />
    </LayoutDefault>
  )
}
