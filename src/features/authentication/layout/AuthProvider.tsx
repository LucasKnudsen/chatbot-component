import { logDev } from '@/utils'
import { JSX, Show } from 'solid-js'
import { LoginScreen, authStore, useAuth } from '..'

type AuthProps = {
  isPublic: boolean
  children: JSX.Element
}

export const AuthProvider = (props: AuthProps) => {
  if (props.isPublic) {
    logDev('Session ID: ', authStore.sessionId)

    return props.children
  }

  useAuth()

  return (
    <Show fallback={<LoginScreen />} when={authStore.isAuthenticated}>
      {props.children}
    </Show>
  )
}
