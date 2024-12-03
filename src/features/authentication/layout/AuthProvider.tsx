import { Spinner } from '@/components'
import { logDev } from '@/utils'
import { Hub } from 'aws-amplify'
import { JSX, Match, Switch, createSignal, onMount } from 'solid-js'
import { LoginScreen, authStore, authStoreActions, authenticate } from '..'

type AuthProps = {
  children: JSX.Element
}

export const AuthProvider = (props: AuthProps) => {
  const [isAuthenticating, setIsAuthenticating] = createSignal(false)

  onMount(async () => {
    if (authStore.shouldAuthenticate) {
      Hub.listen('auth', async (data) => {
        const { payload } = data

        if (payload.event === 'signIn') {
          setIsAuthenticating(true)
          await authenticate(payload.data)
          setIsAuthenticating(false)
        }

        if (payload.event === 'signOut') {
          authStoreActions.setAuthStore({
            isAuthenticated: false,
            sub: null,
          })
        }
      })

      setIsAuthenticating(true)
      await authenticate()
      setIsAuthenticating(false)
    }
  })

  // If the session should not be authenticated, just return the children
  if (!authStore.shouldAuthenticate) {
    logDev('Session ID: ', authStore.sessionId)

    return props.children
  }

  return (
    <Switch>
      <Match when={isAuthenticating()}>
        <div class='h-full w-full flex flex-col gap-4  items-center justify-center animate-fade-in '>
          <Spinner />
          <p class='text-xs font-medium text-gray-500 uppercase tracking-wider'>
            Authenticating...
          </p>
        </div>
      </Match>

      <Match when={!authStore.isAuthenticated}>
        <LoginScreen />
      </Match>

      <Match when={authStore.isAuthenticated}>{props.children}</Match>
    </Switch>
  )
}
