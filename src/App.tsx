import './dev.css'
import './index.css'

import { FraiaPortal } from './features/portal-init'
import LayoutDefault from './layouts/default'
import { chatflows } from './constants'

function App() {
  return (
    <LayoutDefault>
      <div class='flex flex-col justify-center items-start h-full'>
        <h1 class='text-[32px] leading-[54px] font-extralight text-[#5B93FF]'>
          Welcome to <span class='font-medium'>Fraia AI</span>
        </h1>
      </div>
      <FraiaPortal {...chatflows.chula} />
    </LayoutDefault>
  )
}

export default App
