import { GetUserQuery, queries } from '@/graphql'
import { logDev } from '@/utils'
import { GraphQLQuery } from '@aws-amplify/api'
import { API } from 'aws-amplify'
import { authStoreActions } from '.'

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
    logDev(error)
  }
}
