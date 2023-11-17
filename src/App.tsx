import { onMount } from 'solid-js'
import './dev.css'
import { Full } from './features/full'

import { PromptType } from './features/bot'
import { subscribe2channel } from './graphql/subscriptions'
import './index.css'
import { SubscriptionHelper } from './utils/subscriptionHelpers'

const initialPrompts: PromptType[] = [
  {
    display: 'Tell me about Lion Brain',
    prompt: 'Give me a detailed description of the services that Lion Brain offers',
  },
  {
    display: 'Tell me about your products',
    prompt: 'Give me a detailed description of the products that Soft Design offers',
  },
  {
    display: 'Who is your CEO',
    prompt: 'Give me a detailed description of the CEO of Lion Brain',
  },
]

const apiHost = 'https://lionbrain.softdesign.dk'
const chatflowid = 'ac2aa23a-5c82-4f50-8b7a-76f87887fc38'

// const chatflowid = 'ca719387-f573-4989-aea0-21dc07d5ca73'
// const apiHost = 'https://flowise.testnet.concordium.com'

function App() {
  // Subscription example
  onMount(() => {
    subscribe()
  })

  const subscribe = async () => {
    await SubscriptionHelper({
      query: subscribe2channel,
      variables: {
        sessionId: '1234',
      },
      onNext(data) {
        console.log(data)
      },
    })
  }

  return (
    <>
      <Full chatflowid={chatflowid} apiHost={apiHost} initialPrompts={initialPrompts} />
      {/* <Bubble chatflowid={chatflowid} apiHost={apiHost} initialPrompts={initialPrompts} /> */}
    </>
  )
}

export default App
