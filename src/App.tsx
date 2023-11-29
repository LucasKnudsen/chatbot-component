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
    display: 'Who is your CEO?',
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
    <Full {...chatflows.fraia_test} initialPrompts={initialPrompts} />

    // <div class='w-screen h-screen flex justify-center items-center bg-slate-100'>
    //   <h1 class='text-6xl'>
    //     FR
    //     <span
    //       style={{
    //         color: '#3B81F6',
    //       }}
    //     >
    //       AI
    //     </span>
    //     A
    //   </h1>

    //   <Bubble {...chatflows.fraia_test2} initialPrompts={initialPrompts} language='da' />
    // </div>
  )
}

export default App
