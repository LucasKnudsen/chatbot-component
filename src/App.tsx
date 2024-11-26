import './dev.css'

import { chatflows } from './constants'
import { FraiaPortal } from './features/portal-init'
import LayoutDefault from './layouts/default'

function App() {
  return (
    <LayoutDefault>
      <div class='flex flex-col justify-center items-start h-full'>
        <h1
          class='text-[32px] leading-[54px] font-extralight text-[var(--primaryColor)] '
          style={{}}
        >
          Placeholder <span class='font-medium'>Website</span>
        </h1>
      </div>
      <FraiaPortal {...chatflows.testing} />
    </LayoutDefault>
  )
}

export default App
