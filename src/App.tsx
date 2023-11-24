import { onMount } from 'solid-js'
import './dev.css'

import { chatflows } from './constants'
import { PromptType } from './features/bot'
import { Full } from './features/full'
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
      <Full
        {...chatflows.fraia_test}
        initialPrompts={initialPrompts}
        themeId='ugly'
        theme={{
          surfaceBackground: 'green',
        }}
      />
      {/* <Bubble {...chatflows.fraia_test} initialPrompts={initialPrompts} /> */}
    </>
  )
}

export default App
