import { User } from '@/graphql'
import { randomUUID } from '@/utils'
import { createStore } from 'solid-js/store'

type Subject = {
  user_id?: String
}

type AuthStore = {
  shouldAuthenticate: boolean
  isAuthenticated: boolean
  authenticating: boolean
  sub: Subject | null
  userDetails?: User

  readonly sessionId: string
  readonly authMode: 'AMAZON_COGNITO_USER_POOLS' | 'AWS_IAM'
}

const [authStore, setAuthStore] = createStore<AuthStore>({
  shouldAuthenticate: true,
  isAuthenticated: false,
  authenticating: false,
  sub: null,
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
        const sessionId = randomUUID()

        localStorage.setItem('sessionId', sessionId)

        return sessionId
    }
  },

  get authMode() {
    return this.shouldAuthenticate ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM'
  },
})

const authStoreActions = { setAuthStore }

export { authStore, authStoreActions }
