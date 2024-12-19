import { ArrowRightIcon, Button } from '@/components'
import { Setter, createSignal } from 'solid-js'

import { LockIcon } from '@/components/icons/LockIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { configStore } from '@/features/portal-init'
import { createMutation } from '@/hooks'
import { logErrorMessage } from '@/utils'
import { Auth } from 'aws-amplify'
import { ActiveAuthScreen } from '../layout'
import { AuthInputField } from './AuthInputField'

export const LoginForm = (props: { setActiveAuthScreen: Setter<ActiveAuthScreen> }) => {
  const [input, setInput] = createSignal({
    username: import.meta.env.DEV ? 'lucas.knudsen@fraia.ai' : '',
    password: import.meta.env.DEV ? 'Abcd1234' : '',
  })

  const signInMutation = createMutation({
    mutationFn: async () => {
      return await Auth.signIn(input().username, input().password, {
        account_id: configStore.chatSpaceConfig.hostId,
      })
    },
    onError: (error) => {
      logErrorMessage(error, 'LoginForm.signIn')
    },
  })

  return (
    <div class='flex flex-col h-full px-4'>
      <div class='max-w-[640px] h-full flex flex-col justify-center w-full mx-auto lg:ml-0 lg:mr-0'>
        <h1 class='text-2xl font-bold mb-[36px]'>Log in</h1>

        <div class='mb-[50px]'>
          {/* Username  */}
          <AuthInputField
            label='EMAIL'
            Icon={UserIcon}
            value={input().username}
            onChange={(value) => setInput((prev) => ({ ...prev, username: value }))}
            inputProps={{
              type: 'text',
              placeholder: 'Type here...',
            }}
          />

          <AuthInputField
            label='PASSWORD'
            Icon={LockIcon}
            value={input().password}
            onChange={(value) => setInput((prev) => ({ ...prev, password: value }))}
            inputProps={{ type: 'password', placeholder: 'And here!' }}
          />

          {signInMutation.error()?.message ? (
            <div class='text-sm pt-4 text-[var(--errorColor)]'>
              {signInMutation.error()?.message}
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
          Log In <ArrowRightIcon height={12} />
        </Button>
      </div>

      <div class='flex justify-center items-center gap-2 text-[var(--textSecondary)]'>
        <p class='text-sm font-light '>Don’t have an account yet? </p>
        <p
          onClick={() => props.setActiveAuthScreen('signup')}
          class='font-medium text-sm hover:underline text-[var(--primaryColor)] cursor-pointer '
        >
          Sign up
        </p>
      </div>
    </div>
  )
}

//  ;<span class='absolute top-0 right-0'>
//    <Show when={false}>
//      <svg
//        xmlns='http://www.w3.org/2000/svg'
//        width='24'
//        height='24'
//        viewBox='0 0 24 24'
//        fill='none'
//        stroke='currentColor'
//        stroke-width='2'
//        stroke-linecap='round'
//        stroke-linejoin='round'
//        class='lucide lucide-eye'
//      >
//        <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
//        <circle cx='12' cy='12' r='3' />
//      </svg>
//    </Show>
//  </span>
