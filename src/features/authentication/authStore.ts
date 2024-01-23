import { User } from '@/graphql'
import { createStore } from 'solid-js/store'

type AuthStore = {
  isAuthenticated: boolean
  authenticating: boolean
  userDetails?: User
}

const [authStore, setAuthStore] = createStore<AuthStore>({
  isAuthenticated: false,
  authenticating: false,
  userDetails: undefined,
})

const authStoreActions = { setAuthStore }

export { authStore, authStoreActions }
