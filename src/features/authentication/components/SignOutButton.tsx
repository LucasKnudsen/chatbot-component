import { Button } from '@/components'
import { Auth } from 'aws-amplify'
import { createSignal } from 'solid-js'

export const SignOutButton = () => {
  const [loading, setLoading] = createSignal(false)

  const handleSignOut = async () => {
    setLoading(true)
    await Auth.signOut()

    // TODO: Clear states etc.
    window.location.reload()
    setLoading(false)
  }

  return (
    <Button onClick={handleSignOut} loading={loading()} class='w-56'>
      Sign Out
    </Button>
  )
}
