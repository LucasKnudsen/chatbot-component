import { GetUserQuery, queries } from '@/graphql'
import { logDev, logErrorToServer } from '@/utils'
import { GraphQLQuery } from '@aws-amplify/api'
import { API, Auth } from 'aws-amplify'
import { authStoreActions } from './authStore'

export const authenticate = async (user?: any) => {
  try {
    authStoreActions.setAuthStore('authenticating', true)

    user ||= await Auth.currentAuthenticatedUser()

    await Promise.all([getUserDetails(user.username)])

    authStoreActions.setAuthStore('isAuthenticated', true)
  } catch (error) {
    logErrorToServer({
      error,
      context: {
        description: 'Error authenticating user',
      },
    })
  } finally {
    authStoreActions.setAuthStore('authenticating', false)
  }
}

export const getUserDetails = async (id: string) => {
  try {
    const { data } = await API.graphql<GraphQLQuery<GetUserQuery>>({
      query: queries.getUser,
      variables: {
        id,
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    })

    if (!data?.getUser) {
      logDev('User not found')
      return
    }

    authStoreActions.setAuthStore('userDetails', data?.getUser)

    return {
      status: 200,
      data: data?.getUser,
    }
  } catch (error) {
    logErrorToServer({
      error,
      context: {
        description: 'Error getting user details',
      },
    })
  }
}

export const getAuthMode = async () => {
  let authMode: 'AMAZON_COGNITO_USER_POOLS' | 'AWS_IAM' = 'AMAZON_COGNITO_USER_POOLS'

  try {
    await Auth.currentAuthenticatedUser()
  } catch (error) {
    authMode = 'AWS_IAM'
  }

  authStoreActions.setAuthStore({
    authMode,
  })

  return authMode
}
