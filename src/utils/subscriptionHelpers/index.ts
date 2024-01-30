import { subscriptions } from '@/graphql'
import { API } from 'aws-amplify'
import { createSignal } from 'solid-js'
import { Observable } from 'zen-observable-ts'
import { logDev } from '..'
import {
  SubscriptionCache,
  SubscriptionCacheKey,
  SubscriptionInput,
  SubscriptionType,
} from './types'

export const [subscriptionsCache, setSubscriptionsCache] = createSignal<SubscriptionCache>({})

export const SubscriptionHelper = async <DataType>({
  query,
  variables,
  authMode,
  authToken = '',
  cache,
  onNext,
}: SubscriptionInput<DataType>) => {
  const { key, type } = cache || {}

  key && type && clearSubscription(key, type) // Clear previous subscription if exists

  const subscription = (
    (await API.graphql({
      query: subscriptions[query],
      variables,
      authMode,
      authToken,
    })) as Observable<any>
  ).subscribe({
    next: ({ value }) => {
      onNext(value.data[query], subscription)
    },
  })

  if (key && type) {
    setSubscriptionsCache((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] || {}),
        [key]: subscription,
      },
    }))
  }

  return subscription
}

export const clearSubscription = (key: string, type: SubscriptionCacheKey['type']) => {
  if (subscriptionsCache()[type] && subscriptionsCache()[type]?.[key]) {
    subscriptionsCache()[type]?.[key].unsubscribe()

    setSubscriptionsCache((prev) => {
      const updatedCache = { ...prev }
      delete updatedCache[type]![key]
      return updatedCache
    })
  }
}

export const clearAllSubscriptionsOfType = (type: SubscriptionType) => {
  logDev('clearAllSubscriptionsOfType', type)

  if (!subscriptionsCache()[type]) return

  Object.keys(subscriptionsCache()[type]!).forEach((key) => {
    clearSubscription(key, type)
  })
}

export const clearAllSubscriptions = () => {
  logDev('clearAllSubscriptions')

  Object.keys(subscriptionsCache()).forEach((type) => {
    clearAllSubscriptionsOfType(type as SubscriptionType)
  })
}
