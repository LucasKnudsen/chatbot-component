import { ArrowRightIcon, Button } from '@/components'
import { Accessor, Setter, createSignal } from 'solid-js'

import { LockIcon } from '@/components/icons/LockIcon'
import { createMutation } from '@/hooks'
import { logErrorMessage } from '@/utils'
import { Auth } from 'aws-amplify'
import toast from 'solid-toast'
import { ActiveAuthScreen } from '../layout'
import { AuthInputField } from './AuthInputField'

export const VerifyForm = (props: {
  setActiveAuthScreen: Setter<ActiveAuthScreen>
  username: Accessor<string>
}) => {
  const [input, setInput] = createSignal({
    code: '',
  })

  const verifyMutation = createMutation({
    mutationFn: async () => {
      return await Auth.confirmSignUp(props.username(), input().code, {
        forceAliasCreation: false,
      })
    },
    onSuccess: () => {
      toast.success('Email verified')
    },
    onError: (error) => {
      logErrorMessage(error, 'VerifyForm.confirmSignUp')
    },
  })

  return (
    <div class='flex flex-col h-full '>
      <div class='max-w-[640px] h-full flex flex-col justify-center w-full mx-auto lg:ml-0 lg:mr-0'>
        <h1 class='text-2xl font-bold mb-[36px]'>Verify email</h1>

        <div class='mb-[50px]'>
          <AuthInputField
            label='CODE'
            Icon={LockIcon}
            value={input().code}
            onChange={(value) => setInput((prev) => ({ ...prev, code: value }))}
            inputProps={{ type: 'text', placeholder: 'Enter your code' }}
          />

          {verifyMutation.error()?.message ? (
            <div class='text-sm pt-4 text-[var(--errorColor)]'>
              {verifyMutation.error()?.message}
            </div>
          ) : null}
        </div>

        <Button
          class='place-self-start'
          type='button'
          padding='6px 20px'
          loading={verifyMutation.isLoading()}
          onClick={verifyMutation.mutate}
        >
          Verify <ArrowRightIcon height={12} />
        </Button>
      </div>

      <div class='flex justify-center items-center gap-2 text-[var(--textSecondary)]'>
        <p class='text-sm font-light '>Already verified? </p>
        <p
          onClick={() => props.setActiveAuthScreen('login')}
          class='font-medium text-sm hover:underline text-[var(--primaryColor)] cursor-pointer '
        >
          Sign in
        </p>
      </div>
    </div>
  )
}
