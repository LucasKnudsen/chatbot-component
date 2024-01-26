import './dev.css'

import { chatflows } from './constants'
import { FraiaPortal } from './features/portal-init'
import './index.css'

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

      <FraiaPortal {...chatflows.chula} />
    </div>
  )
}

export default App
