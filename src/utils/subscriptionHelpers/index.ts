import { API } from 'aws-amplify'
import { Observable } from 'zen-observable-ts'
import { SubscriptionInput } from './types'

export const SubscriptionHelper = async <DataType>({
  query,
  variables,
  authMode,
  authToken = '',
  //   cacheKey,
  onNext,
}: SubscriptionInput<DataType>) => {
  //   clearOldSubscriptions(cacheKey)

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

  //   subscriptionsCache.merge({
  //     [cacheKey]: subscription,
  //   })

  return subscription
}

// export const clearOldSubscriptions = (subKey: string) => {
//   if (subscriptionsCache.get()[subKey]) {
//     subscriptionsCache.get()[subKey].unsubscribe()
//   }
// }
