import { logDev } from '.'

export const parseError = (error: any): Error => {
  logDev('ERROR:', error)

  switch (true) {
    // If the error has a errors property, it means that it's a Graphql error
    case Boolean(error.errors) && Array.isArray(error.errors):
      const firstError = error.errors[0]

      return firstError

    // If the error is an AxiosError, it means that the request was made but the server responded with a status code
    case error.name === 'AxiosError':
      const data = error.response?.data

      if (!data) {
        break
      }

      return data

    default:
      break
  }

  return error
}
