import './dev.css'

import { chatflows } from './constants'
import { Bubble } from './features/bubble'
import './index.css'

// const initialPrompts: PromptType[] = [
//   {
//     display: 'Tell me about Lion Brain',
//     prompt: 'Give me a detailed description of Lion Brain',
//   },
//   {
//     display: 'What is the collaboration between Soft Design and Lion Brain?',
//     prompt:
//       'Give me a detailed description of the collaboration between Soft Design and Lion Brain',
//   },
//   {
//     display: 'Who is the CEO of Lion Brain?',
//     prompt: 'Who is the CEO of Lion Brain',
//   },
// ]

function App() {
  return (
    <div class='w-full h-screen flex flex-col justify-center items-center bg-slate-100'>
      <h1 class='text-3xl md:text-6xl tracking-widest'>
        PL
        <span
          style={{
            color: 'darkblue',
          }}
        >
          AI
        </span>
        GROUND
      </h1>

      <h2 class='text-lg italic tracking-widest'>
        Powered by
        <span
          style={{
            color: 'darkblue',
          }}
        >
          {' '}
          Fraia
        </span>
      </h2>

      <Bubble {...chatflows.fraia_dev} />
    </div>
  )
}

export default App
