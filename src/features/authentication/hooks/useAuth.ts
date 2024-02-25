import { logDev } from '@/utils'
import { Hub } from 'aws-amplify'
import { createEffect, createSignal } from 'solid-js'
import { authStoreActions, authenticate } from '..'

export const useAuth = () => {
  const [isInitialized, setIsInitialized] = createSignal(false)

  createEffect(() => {
    if (isInitialized()) return

    Hub.listen('auth', (data) => {
      const { payload } = data

      if (payload.event === 'signIn') {
        authenticate(payload.data)
      }
      if (payload.event === 'signOut') {
        logDev('User signed out')
        authStoreActions.setAuthStore('isAuthenticated', false)
        // TODO: We should clear the user details here
      }
    })

    authenticate()
    setIsInitialized(true)
  })
}
