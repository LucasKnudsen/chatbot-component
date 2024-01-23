import { Button } from '@/components'
import { Auth } from 'aws-amplify'
import { createSignal } from 'solid-js'

export const SignOutButton = () => {
  const [loading, setLoading] = createSignal(false)

  const handleSignOut = async () => {
    setLoading(true)
    await Auth.signOut()

    // TODO: Clear states etc.
    setLoading(false)
  }

  return (
    <Button onClick={handleSignOut} loading={loading()}>
      Sign Out
    </Button>
  )
}
