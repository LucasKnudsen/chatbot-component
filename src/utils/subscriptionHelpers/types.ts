import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'
import { DocumentNode } from 'graphql'
import { ZenObservable } from 'zen-observable-ts'

export type AuthModeType = keyof typeof GRAPHQL_AUTH_MODE

export type SubscriptionInput<DataType> = {
  query: string | DocumentNode
  variables?: object | undefined
  authMode?: AuthModeType
  authToken?: string | undefined
  onNext: (data: DataType, subscription: ZenObservable.Subscription) => void | Promise<void>
  cacheKey?: string
}
