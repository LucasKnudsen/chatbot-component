import { getAuthMode } from '@/features/authentication'
import { CreateClientErrorLogInput, mutations, Priority } from '@/graphql'
import { API } from 'aws-amplify'
import toast from 'solid-toast'
import { randomUUID } from '..'
import { parseError } from './errorHandlers'

export type ErrorLogInput = {
  error: any
  priority?: Priority
  context?: Record<string, any>
}

export const logErrorToServer = async ({ error, priority, context }: ErrorLogInput) => {
  const parsedError = parseError(error)
  const logId = randomUUID()

  toast.error(parsedError.message || 'Something went wrong')

  if (import.meta.env.DEV || !error) {
    return
  }

  const input: CreateClientErrorLogInput = {
    logId,
    priority: priority || Priority.HIGH,
    message: parsedError.message || 'Something went wrong',
    error: JSON.stringify(parsedError),

    context: JSON.stringify(context),
    timestamp: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await API.graphql({
    query: mutations.createClientErrorLog,
    variables: { input },
    authMode: await getAuthMode(),
  })

  return { parsedError, logId }
}
