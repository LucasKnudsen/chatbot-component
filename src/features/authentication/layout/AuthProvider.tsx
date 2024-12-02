import { FraiaLoading } from '@/features/bot'
import { logDev } from '@/utils'
import { Hub } from 'aws-amplify'
import { JSX, Match, Switch, onMount } from 'solid-js'
import { LoginScreen, authStore, authStoreActions, authenticate } from '..'

type AuthProps = {
  children: JSX.Element
}

export const AuthProvider = (props: AuthProps) => {
  onMount(async () => {
    if (authStore.shouldAuthenticate) {
      Hub.listen('auth', (data) => {
        const { payload } = data

        if (payload.event === 'signIn') {
          authenticate(payload.data)
        }
        if (payload.event === 'signOut') {
          authStoreActions.setAuthStore({
            isAuthenticated: false,
            sub: null,
          })
        }
      })

      await authenticate()
    }
  })

  if (!authStore.shouldAuthenticate) {
    logDev('Session ID: ', authStore.sessionId)

    return props.children
  }

  return (
    <Switch>
      <Match when={authStore.authenticating}>
        <FraiaLoading />
      </Match>

      <Match when={!authStore.isAuthenticated}>
        <LoginScreen />
      </Match>

      <Match when={authStore.isAuthenticated}>{props.children}</Match>
    </Switch>
  )
}
