import { authStore } from '@/features/authentication'
import { mutations } from '@/graphql'
import { API } from 'aws-amplify'
import { logDev, randomUUID } from '..'

export enum Domain {
  MOBILE = 'MOBILE_APP',
  EMBED = 'EMBED',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum LogType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
}

export type LogItem = {
  logId: string
  type: LogType
  message: string
  domain?: string
  timestamp: string
  tag?: string
}

export const logMessageToServer = async (logContent: Omit<LogItem, 'logId' | 'timestamp'>) => {
  logDev(logContent.tag ? `ERROR in ${logContent.tag}: ` : 'ERROR: ', logContent.message)

  if (import.meta.env.DEV) {
    return 'DEV_TEST_LOG_ID'
  }

  const logId = randomUUID()

  const log: LogItem = {
    ...logContent,
    logId,
    timestamp: new Date().toISOString(),
    domain: `[${Domain.EMBED}]`,
  }

  console.error(`Error reference ID: ${logId}. Timestamp: ${new Date().toTimeString()}`)

  try {
    API.graphql({
      query: mutations.logMessage,
      variables: {
        log: JSON.stringify(log),
      },
      authMode: authStore.authMode,
    })
  } catch (error) {
    logDev('logMessage error:', error)
  }

  return logId
}
