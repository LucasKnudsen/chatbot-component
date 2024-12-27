import { ArrowRightIcon, Button } from '@/components'
import { Setter, createSignal } from 'solid-js'

import { LockIcon } from '@/components/icons/LockIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { configStore } from '@/features/portal-init'
import { createMutation } from '@/hooks'
import { randomUUID } from '@/utils'
import { Auth } from 'aws-amplify'
import toast from 'solid-toast'
import { ActiveAuthScreen } from '../layout'
import { AuthInputField } from './AuthInputField'

export const RegisterForm = (props: {
  setActiveAuthScreen: Setter<ActiveAuthScreen>
  setUsername: Setter<string>
}) => {
  const [input, setInput] = createSignal({
    email: import.meta.env.DEV ? 'lucas.knudsen@fraia.ai' : '',
    password: import.meta.env.DEV ? 'Abcd1234' : '',
  })

  const signInMutation = createMutation({
    mutationFn: async () => {
      const UUID = randomUUID()

      await Auth.signUp({
        username: UUID,
        password: input().password,
        attributes: {
          email: input().email,
        },
        validationData: {
          email: input().email,
        },
        clientMetadata: {
          account_id: configStore.chatSpaceConfig.hostId,
        },
        autoSignIn: {
          enabled: true,
        },
      })

      props.setUsername(UUID)
    },
    onSuccess: () => {
      toast.success('User registered! Check your email for verification.')

      props.setActiveAuthScreen('verify')
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return (
    <div class='flex flex-col h-full px-4'>
      <div class='max-w-[640px] h-full flex flex-col justify-center w-full mx-auto lg:ml-0 lg:mr-0'>
        <h1 class='text-2xl font-bold mb-[36px]'>Sign up</h1>

        <div class='mb-[50px]'>
          {/* Email  */}
          <AuthInputField
            label='EMAIL'
            Icon={UserIcon}
            value={input().email}
            onChange={(value) => setInput((prev) => ({ ...prev, email: value }))}
            inputProps={{ type: 'email', placeholder: 'Type your email...' }}
          />

          {/* Password  */}
          <AuthInputField
            label='PASSWORD'
            Icon={LockIcon}
            value={input().password}
            onChange={(value) => setInput((prev) => ({ ...prev, password: value }))}
            inputProps={{ type: 'password', placeholder: 'Type your password...' }}
          />

          {signInMutation.error()?.message ? (
            <div class='text-sm pt-4 text-[var(--errorColor)]'>
              {errorParser(signInMutation.error()?.message)}
            </div>
          ) : null}
        </div>

        <Button
          class='place-self-start'
          type='button'
          padding='6px 20px'
          loading={signInMutation.isLoading()}
          onClick={signInMutation.mutate}
        >
          Sign up <ArrowRightIcon height={12} />
        </Button>
      </div>

      <div class='flex justify-center items-center gap-2 text-[var(--textSecondary)]'>
        <p class='text-sm font-light '>Already have an account? </p>
        <p
          onClick={() => props.setActiveAuthScreen('login')}
          class='font-medium text-sm hover:underline text-[var(--primaryColor)] cursor-pointer '
        >
          Log in
        </p>
      </div>
    </div>
  )
}

const errorParser = (errorMessage: string) => {
  return errorMessage.replace('PreSignUp failed with error ', '')
}
