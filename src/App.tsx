import { onMount } from 'solid-js'
import './dev.css'
import { Bubble } from './features/bubble'
import { Full } from './features/full'

import { subscribe2channel } from './graphql/subscriptions'
import './index.css'
import { SubscriptionHelper } from './utils/subscriptionHelpers'

function App() {
  // Subscription example
  onMount(() => {
    subscribe()
  })

  const subscribe = async () => {
    const subscription = await SubscriptionHelper({
      query: subscribe2channel,
      variables: {
        sessionId: '1234',
      },
      onNext(data) {
        console.log(data)
      },
    })

    console.log('New sub ', subscription)
  }

  return (
    <>
      <Full
        chatflowid='ca719387-f573-4989-aea0-21dc07d5ca73'
        apiHost='https://flowise.testnet.concordium.com'
        promptSuggestions={[
          'Do this',
          'Do that',
          'Do something else',
          'Do something else',
          'Do something else',
          'Do something else',
        ]}
      />
      <Bubble
        chatflowid='ca719387-f573-4989-aea0-21dc07d5ca73'
        apiHost='https://flowise.testnet.concordium.com'
        promptSuggestions={[
          'Do this',
          'Do that',
          'Do something else',
          'Do something else',
          'Do something else',
          'Do something else',
        ]}
      />
    </>
  )
}

export default App
