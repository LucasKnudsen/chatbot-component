import { onMount } from 'solid-js'
import { initiateAppAnalyzz, initiateClarity } from '..'

export function TrackingProvider() {
  onMount(() => {
    initiateClarity()
    initiateAppAnalyzz()
  })

  return null
}
