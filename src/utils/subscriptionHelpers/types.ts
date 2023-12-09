import { subscriptions } from '@/graphql'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'
import { ZenObservable } from 'zen-observable-ts'

export type AuthModeType = keyof typeof GRAPHQL_AUTH_MODE

export type SubscriptionCacheKey = {
  key: string
  type: string
}

export type SubscriptionInput<DataType> = {
  query: keyof typeof subscriptions
  variables?: object | undefined
  authMode?: AuthModeType
  authToken?: string | undefined
  onNext: (data: DataType, subscription: ZenObservable.Subscription) => void | Promise<void>
  cache?: SubscriptionCacheKey
}

export type SubscriptionCache = {
  [type: string]: {
    [key: string]: ZenObservable.Subscription
  }
}
