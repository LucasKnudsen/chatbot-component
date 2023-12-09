import { subscriptions } from '@/graphql'
import { API } from 'aws-amplify'
import { createSignal } from 'solid-js'
import { Observable } from 'zen-observable-ts'
import { SubscriptionCache, SubscriptionInput } from './types'

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

  key && type && clearSubscription(key, type)

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
      [key]: {
        ...(prev[key] || {}),
        [type]: subscription,
      },
    }))
  }

  return subscription
}

export const clearSubscription = (key: string, type: string) => {
  if (subscriptionsCache()[key] && subscriptionsCache()[key]![type]) {
    subscriptionsCache()[key]![type].unsubscribe()

    setSubscriptionsCache((prev) => {
      const updatedCache = { ...prev }
      delete updatedCache[key]![type]
      return updatedCache
    })
  }
}

export const clearAllSubscriptions = () => {
  Object.keys(subscriptionsCache()).forEach((key) => {
    let k = key as keyof typeof subscriptionsCache
    if (!subscriptionsCache()[k]) return

    Object.keys(subscriptionsCache()[k]!).forEach((type) => {
      clearSubscription(k, type)
    })
  })
}
