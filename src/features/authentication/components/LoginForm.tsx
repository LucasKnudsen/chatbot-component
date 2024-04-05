import { Button } from '@/components'
import { Show, createSignal } from 'solid-js'

import { LockIcon } from '@/components/icons/LockIcon'
import { LogoIcon } from '@/components/icons/LogoIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { useTheme } from '@/features/theme'
import { createMutation } from '@/hooks'
import { Auth } from 'aws-amplify'

export const LoginForm = (props: { onLogin?: () => void }) => {
  const [input, setInput] = createSignal({
    username: import.meta.env.DEV ? 'student' : '',
    password: import.meta.env.DEV ? 'Abcd1234' : '',
  })

  const { theme } = useTheme()

  const signInMutation = createMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return await Auth.signIn({
        username: input().username,
        password: input().password,
      })
    },
    onSuccess: (data) => {
      console.log('success', data)
      props.onLogin?.()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return (
    <div class='flex flex-col items-center lg:items-start justify-center h-full'>
      <div class='text-center lg:text-left mb-16'>
        <div class='inline-block mb-4'>
          <LogoIcon color={theme().primaryColor} />
        </div>
        <h4
          class='text-base leading-[17px] font-light'
          style={{
            color: theme().textSecondary,
          }}
        >
          The most personalized AI catchphrase
        </h4>
      </div>

      <div class='max-w-[640px] w-full mx-auto lg:ml-0 lg:mr-0'>
        <form>
          <div class='mb-[50px]'>
            {/* Username  */}
            <div class='auth-input mb-6'>
              <label for='username' class='auth-input__label'>
                <UserIcon color={theme().primaryColor} />
                <span class='px-3.5'>USER NAME</span>
              </label>
              <span class='auth-input__divider'></span>
              <input
                id='username'
                type='text'
                value={input().username}
                onChange={(value) =>
                  setInput((prev) => ({
                    ...prev,
                    username: value.currentTarget.value,
                  }))
                }
                placeholder='Write your user name'
                class='auth-input__control w-full'
              />
            </div>

            {/* Password  */}
            <div class='auth-input'>
              <label for='password' class='auth-input__label'>
                <LockIcon color={theme().primaryColor} />
                <span class='px-3.5'>PASSWORD</span>
              </label>

              <span class='auth-input__divider'></span>
              <div class='relative w-full'>
                <input
                  id='password'
                  type='password'
                  value={input().password}
                  onChange={(value) =>
                    setInput((prev) => ({
                      ...prev,
                      password: value.currentTarget.value,
                    }))
                  }
                  placeholder='••••••••'
                  class='auth-input__control tracking-[1em] w-full'
                />
                <span class='absolute top-0 right-0'>
                  <Show when={false}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      class='lucide lucide-eye'
                    >
                      <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
                      <circle cx='12' cy='12' r='3' />
                    </svg>
                  </Show>
                </span>
              </div>
            </div>
            {signInMutation.error()?.message ? (
              <div class='text-sm pt-4 text-[var(--errorColor)]'>
                {signInMutation.error()?.message}
              </div>
            ) : null}
          </div>

          <Button
            class='mx-auto lg:ml-0 lg:mr-0'
            type='button'
            padding='6px 20px'
            loading={signInMutation.isLoading()}
            onClick={signInMutation.mutate}
          >
            Log In{' '}
            <svg
              class='ml-5'
              width='29'
              height='9'
              viewBox='0 0 29 9'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M25.139 0.17898L28.8301 4.0679C29.0566 4.30654 29.0566 4.69346 28.8301 4.9321L25.139 8.82102C24.9125 9.05966 24.5453 9.05966 24.3188 8.82102C24.0923 8.58237 24.0923 8.19546 24.3188 7.95681L27.0198 5.11108L0.58 5.11109C0.259675 5.11109 4.22907e-07 4.83749 3.93403e-07 4.5C3.63898e-07 4.16251 0.259675 3.88892 0.58 3.88892L27.0198 3.88891L24.3188 1.04318C24.0923 0.804541 24.0923 0.417624 24.3188 0.17898C24.5453 -0.059663 24.9125 -0.059663 25.139 0.17898Z'
                fill='#E6E6E9'
              />
            </svg>
          </Button>

          {/* <p class='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <a
                  href='#'
                  class='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </a>
              </p> */}
        </form>
      </div>
    </div>
  )
}
