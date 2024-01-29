import { logDev } from '@/utils'
import { Auth, Hub } from 'aws-amplify'
import { createEffect, createSignal } from 'solid-js'
import { authStoreActions, getUserDetails } from '..'

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
      }
    })

    authenticate()
    setIsInitialized(true)
  })

  const authenticate = async (user?: any) => {
    try {
      authStoreActions.setAuthStore('authenticating', true)

      user ||= await Auth.currentAuthenticatedUser()

      await getInitialData(user)

      console.log('Evaluated user', user)

      // TODO: IF hostType is COMPANY, check if user is a member of the company

      authStoreActions.setAuthStore('authenticating', false)
      authStoreActions.setAuthStore('isAuthenticated', true)
    } catch (error) {
      logDev(error)
    }
  }

  const getInitialData = async (user: any) => {
    await Promise.all([getUserDetails(user.username)])

    // const chatSpace = await fetchChatSpace(user)
    // const channel = await fetchChannels(chatSpace)
    // const channelAccesses = await fetchChannelAccesses(user.id, chatSpace)
    //
  }
}
