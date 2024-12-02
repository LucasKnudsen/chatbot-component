import { CircleCloseIcon } from '@/components'

import { LogoIcon } from '@/components/icons/LogoIcon'
import { configStoreActions } from '@/features/portal-init'
import { useTheme } from '@/features/theme'
import { createSignal, Match, Show, Switch } from 'solid-js'
import { LoginForm } from '../components'
import { RegisterForm } from '../components/RegisterForm'
import { VerifyForm } from '../components/VerifyForm'

// TODO:
// - [ ] Add a Sign out button
// - [ ] Add a Verify screen
// - [ ] Test out the login and register forms

// - [ ] Add a loading state to the login and register forms
// - [ ] Add a forgot password screen

export type ActiveAuthScreen = 'start' | 'login' | 'signup' | 'verify'

export const LoginScreen = () => {
  const { theme } = useTheme()
  const [activeAuthScreen, setActiveAuthScreen] = createSignal<ActiveAuthScreen>('login')
  const [username, setUsername] = createSignal('')

  return (
    <div class='flex flex-col h-full w-full p-6 relative'>
      <div class='flex justify-between'>
        <div class='text-center lg:text-left '>
          <div class='inline-block'>
            <Show when={theme().navbarLogoUrl} fallback={<LogoIcon color={theme().primaryColor} />}>
              <img src={theme().navbarLogoUrl} class='max-h-8  object-contain' />
            </Show>
          </div>
        </div>

        <CircleCloseIcon
          class='cursor-pointer'
          height={24}
          color={theme().primaryColor}
          onClick={configStoreActions.toggleBot}
        />
      </div>

      <Switch>
        {/* <Match when={activeAuthScreen() === 'start'}>
          <Button>Sign up with email</Button>
        </Match> */}
        <Match when={activeAuthScreen() === 'login'}>
          <LoginForm setActiveAuthScreen={setActiveAuthScreen} />
        </Match>

        <Match when={activeAuthScreen() === 'signup'}>
          <RegisterForm setActiveAuthScreen={setActiveAuthScreen} setUsername={setUsername} />
        </Match>
        <Match when={activeAuthScreen() === 'verify'}>
          <VerifyForm setActiveAuthScreen={setActiveAuthScreen} username={username} />
        </Match>
      </Switch>
    </div>
  )
}
