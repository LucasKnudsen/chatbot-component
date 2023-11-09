import './dev.css'
import { Bubble } from './features/bubble'
import { Full } from './features/full'

import './index.css'

function App() {
  return (
    <>
      <Full
        chatflowid='ca719387-f573-4989-aea0-21dc07d5ca73'
        apiHost='https://flowise.testnet.concordium.com'
      />
      <Bubble
        chatflowid='ca719387-f573-4989-aea0-21dc07d5ca73'
        apiHost='https://flowise.testnet.concordium.com'
      />
    </>
  )
}

export default App
