import { User } from '@/graphql'
import { createStore } from 'solid-js/store'

type AuthStore = {
  isAuthenticated: boolean
  authenticating: boolean
  userDetails?: User

  readonly sessionId: string
}

const [authStore, setAuthStore] = createStore<AuthStore>({
  isAuthenticated: false,
  authenticating: false,
  userDetails: undefined,
  get sessionId() {
    switch (true) {
      case this.userDetails?.id != null:
        // If there's an Auth user
        return this.userDetails.id

      case localStorage.getItem('sessionId') != null:
        // If there's a sessionId in localStorage
        return localStorage.getItem('sessionId') as string

      default:
        // If there's no Auth user or sessionId in localStorage, create a sessionId
        const sessionId = Math.random().toString(36).substring(2, 15)

        localStorage.setItem('sessionId', sessionId)

        return sessionId
    }
  },
})

const authStoreActions = { setAuthStore }

export { authStore, authStoreActions }
