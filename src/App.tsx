import './dev.css'

import { chatflows } from './constants'
import { PromptType } from './features/bot'
import { Bubble } from './features/bubble'
import './index.css'

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
  return (
    // <Full {...chatflows.fraia_test} initialPrompts={initialPrompts} />

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
      <Bubble {...chatflows.fraia_dev} initialPrompts={initialPrompts} />
    </div>
  )
}

export default App
