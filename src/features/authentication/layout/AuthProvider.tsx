import { JSX, Show } from 'solid-js'
import { LoginScreen, authStore, useAuth } from '..'

type AuthProps = {
  isPublic: boolean
  children: JSX.Element
}

export const AuthProvider = (props: AuthProps) => {
  useAuth()

  if (props.isPublic) {
    return props.children
  }

  return (
    <Show fallback={<LoginScreen />} when={authStore.isAuthenticated}>
      {props.children}
    </Show>
  )
}
