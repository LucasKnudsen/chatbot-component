import { API } from 'aws-amplify'
import { createSignal } from 'solid-js'
import { Observable, ZenObservable } from 'zen-observable-ts'
import { SubscriptionInput } from './types'

export const [subscriptionsCache, setSubscriptionsCache] = createSignal<
  Record<string, ZenObservable.Subscription>
>({})

export const SubscriptionHelper = async <DataType>({
  query,
  variables,
  authMode,
  authToken = '',
  cacheKey,
  onNext,
}: SubscriptionInput<DataType>) => {
  const subscription = (
    (await API.graphql({
      query,
      variables,
      authMode,
      authToken,
    })) as Observable<any>
  ).subscribe({
    next: ({ value }) => {
      onNext(value.data, subscription)
    },
  })

  if (cacheKey) {
    setSubscriptionsCache((prev) => ({
      ...prev,
      [cacheKey]: subscription,
    }))
  }

  return subscription
}

export const clearSubscription = (subKey: string) => {
  if (subscriptionsCache()[subKey]) {
    subscriptionsCache()[subKey].unsubscribe()
  }
}

export const clearAllSubscriptions = (cacheKey: string) => {
  Object.keys(subscriptionsCache()).forEach((subKey) => {
    if (subKey.includes(cacheKey)) {
      clearSubscription(subKey)
    }
  })
}
