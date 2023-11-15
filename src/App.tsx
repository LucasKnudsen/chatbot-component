import { onMount } from 'solid-js'
import './dev.css'
import { Bubble } from './features/bubble'
import { Full } from './features/full'

import { PromptType } from './features/bot'
import { subscribe2channel } from './graphql/subscriptions'
import './index.css'
import { SubscriptionHelper } from './utils/subscriptionHelpers'

const initialPrompts: PromptType[] = [
  {
    display: 'Tell me about concordium',
    prompt: 'Give me a detailed description of the services that concordium offers',
  },
  {
    display: 'Tell me about your products',
    prompt: 'Give me a detailed description of the products that concordium offers',
  },
  {
    display: 'Who is your CEO',
    prompt: 'Give me a detailed description of the CEO of concordium',
  },
]

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
        initialPrompts={initialPrompts}
      />
      <Bubble
        chatflowid='ca719387-f573-4989-aea0-21dc07d5ca73'
        apiHost='https://flowise.testnet.concordium.com'
        initialPrompts={initialPrompts}
      />
    </>
  )
}

export default App
