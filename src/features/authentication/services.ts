import { GetUserQuery, queries } from '@/graphql'
import { logDev, logErrorMessage } from '@/utils'
import { GraphQLQuery } from '@aws-amplify/api'
import { API, Auth } from 'aws-amplify'
import { configStoreActions } from '../portal-init'
import { authStoreActions } from './authStore'

export const authenticate = async (user?: any) => {
  try {
    user ||= await Auth.currentAuthenticatedUser()

    if (!user) {
      throw new Error('User not authenticated')
    }

    logDev('User authenticated', user)
    // Fetch the user details
    await new Promise((resolve) => setTimeout(resolve, 1000))

    configStoreActions.setConfigStore('clientData', {
      fraia_user_id: user.username,
      fraia_user_email: user.attributes?.email,
    })

    authStoreActions.setAuthStore('isAuthenticated', true)
  } catch (error) {}
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
    logErrorMessage(error, 'getUserDetails')
  }
}

export const getAuthMode = async () => {
  let authMode: 'AMAZON_COGNITO_USER_POOLS' | 'AWS_IAM' = 'AMAZON_COGNITO_USER_POOLS'

  try {
    await Auth.currentAuthenticatedUser()
  } catch (error) {
    authMode = 'AWS_IAM'
  }

  return authMode
}
