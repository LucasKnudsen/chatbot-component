import { onMount } from 'solid-js'
import './dev.css'

import { chatflows } from './constants'
import { PromptType } from './features/bot'
import { Bubble } from './features/bubble'
import { subscribe2channel } from './graphql/subscriptions'
import './index.css'
import { SubscriptionHelper } from './utils/subscriptionHelpers'

const initialPrompts: PromptType[] = [
  {
    display: 'Tell me about Lion Brain',
    prompt: 'Give me a detailed description of Lion Brain',
  },
  {
    display: 'What is the collaboration between Soft Design and Lion Brain?',
    prompt:
      'Give me a detailed description of the collaboration between Soft Design and Lion Brain',
  },
  {
    display: 'Who is the CEO of Soft Design?',
    prompt: 'Who is the CEO of Soft Design',
  },
  {
    display: 'Who is the CEO of Lion Brain?',
    prompt: 'Who is the CEO of Lion Brain',
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
    <div class='w-screen h-screen flex justify-center items-center bg-slate-100'>
      <h1 class='text-6xl'>
        FR
        <span
          style={{
            color: '#3B81F6',
          }}
        >
          AI
        </span>
        A
      </h1>

      {/* <Full {...chatflows.fraia_test} initialPrompts={initialPrompts} /> */}
      <Bubble {...chatflows.fraia_test2} initialPrompts={initialPrompts} />
    </div>
  )
}

export default App
