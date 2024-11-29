import { logDev } from '..'
import { logMessageToServer, LogType } from '../logging/serverLogging'

export const parseError = (error: any): Error => {
  let parsedError = error

  switch (true) {
    // If the error has a errors property, it means that it's a Graphql error
    case Boolean(error.errors) && Array.isArray(error.errors):
      const firstError = error.errors[0]

      parsedError = firstError
      break

    // If the error is an AxiosError, it means that the request was made but the server responded with a status code
    case error.name === 'AxiosError':
      const data = error.response?.data

      if (!data) {
        break
      }

      parsedError = data

      break

    default:
      break
  }

  logDev('Parsed error: ', parsedError)

  return parsedError
}

/** Logs an error message to the server and returns the logId
 * @param error The error object to log
 * @param tag An optional tag to identify the source of the error
 * @returns The logId of the logged error
 * */
export function logErrorMessage(error: any, tag?: string) {
  const parsedError = parseError(error)

  return logMessageToServer({
    message: parsedError.message,
    tag: tag,
    type: LogType.ERROR,
  })
}
