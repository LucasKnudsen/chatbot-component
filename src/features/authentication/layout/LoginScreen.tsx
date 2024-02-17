import { Button, CircleCloseIcon } from '@/components'

import { Auth } from 'aws-amplify'
import IconLock from '@/assets/icon-lock.svg'
import IconUser from '@/assets/icon-user.svg'
import LayoutDefault from '@/layouts/default'
import Logo from '@/assets/logo3.svg'
import { configStoreActions } from '@/features/portal-init'
import { createSignal } from 'solid-js'
import { useTheme } from '@/features/theme'

// import { TextInput } from '@/components/inputs'

export const LoginScreen = () => {
  const [input, setInput] = createSignal({
    username: import.meta.env.DEV ? 'student' : '',
    password: import.meta.env.DEV ? 'Abcd1234' : '',
  })
  const [loading, setLoading] = createSignal(false)

  const { theme } = useTheme()
  // const { text } = useText()

  const handleSignIn = async () => {
    // TODO: Use useMutation from solid-query
    // TODO: Error handling
    setLoading(true)
    await Auth.signIn(input())
    setLoading(false)
  }

  return (
    <LayoutDefault>
      <div class='absolute right-5 top-5'>
        <CircleCloseIcon
          class='cursor-pointer'
          height={24}
          color={theme().primaryColor}
          onClick={configStoreActions.toggleBot}
        />
      </div>

      <div class='flex flex-col items-center lg:items-start justify-center h-full'>
        <div class='mb-16'>
          <img class='mb-4' src={Logo} alt='logo' />
          <h4 class='text-base leading-[17px] font-light text-[#939393]'>
            The most personalized AI catchphrase
          </h4>
        </div>

        <div class='max-w-[640px] w-full mx-auto lg:ml-0 lg:mr-0'>
          <form action='#'>
            <div class='auth-input mb-6'>
              <label for='username' class='auth-input__label'>
                <img src={IconUser} alt='user icon' />
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
                class='auth-input__control'
              />
            </div>

            <div class='auth-input mb-[50px]'>
              <label for='password' class='auth-input__label'>
                <img src={IconLock} alt='lock icon' />
                <span class='px-3.5'>PASSWORD</span>
              </label>
              <span class='auth-input__divider'></span>
              <input
                id='password'
                type='password'
                value={input().password}
                onChange={(value) =>
                  setInput((prev) => ({
                    ...prev,
                    username: value.currentTarget.value,
                  }))
                }
                placeholder='••••••••'
                class='auth-input__control'
              />
            </div>

            {/* reference only */}
            {/* <TextInput
              value={input().username}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  username: value,
                }))
              }
              label='Your login'
              inputProps={{
                placeholder: 'example@mail.com',
              }}
            />

            <TextInput
              value={input().password}
              onChange={(value) =>
                setInput((prev) => ({
                  ...prev,
                  password: value,
                }))
              }
              label='Your password'
              inputProps={{
                type: 'password',
                placeholder: '••••••••',
              }}
            /> */}

            {/* 
              <div class='flex items-center justify-between'>
                <a
                  href='#'
                  class='text-sm font-medium hover:underline'
                  style={{
                    color: theme().primaryColor,
                  }}
                >
                  Forgot password?
                </a>
              </div> */}

            <Button
              class='mx-auto lg:ml-0 lg:mr-0'
              padding='6px 20px'
              loading={loading()}
              onClick={handleSignIn}
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
    </LayoutDefault>
  )
}
