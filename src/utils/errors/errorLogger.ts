// DEPRECATED
// Use logErrorMessage instead from errorHandlers.ts
import { authStore } from '@/features/authentication'
import { CreateClientErrorLogInput, mutations, Priority } from '@/graphql'
import { API } from 'aws-amplify'
import toast from 'solid-toast'
import { randomUUID } from '..'
import { parseError } from './errorHandlers'

export type ErrorLogInput = {
  error: any
  priority?: Priority
  context?: Record<string, any>
  showToast?: boolean
}

export const logErrorToServer = async ({
  error,
  priority,
  context,
  showToast = true,
}: ErrorLogInput) => {
  const parsedError = parseError(error)
  const logId = randomUUID()

  showToast && toast.error(parsedError.message || 'Something went wrong')

  if (import.meta.env.DEV || !error) {
    return
  }

  const input: CreateClientErrorLogInput = {
    logId,
    priority: priority || Priority.HIGH,
    message: parsedError.message || 'Something went wrong',
    error: parsedError.toString(),
    stack: parsedError.stack,

    context: JSON.stringify(context),
    timestamp: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await API.graphql({
    query: mutations.createClientErrorLog,
    variables: { input },
    authMode: authStore.authMode,
  })

  return { parsedError, logId }
}
