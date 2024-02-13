import { Button, CircleCloseIcon } from '@/components'
import { TextInput } from '@/components/inputs'
import { configStoreActions } from '@/features/portal-init'
import { useTheme } from '@/features/theme'
import { Auth } from 'aws-amplify'
import { createSignal } from 'solid-js'
import fraiaLogo from '../../../assets/logo.svg'

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
    <>
      <div class='absolute right-5 top-5'>
        <CircleCloseIcon
          class='cursor-pointer'
          height={24}
          color={theme().primaryColor}
          onClick={configStoreActions.toggleBot}
        />
      </div>

      <div class='flex flex-col items-center justify-center h-full lg:py-0'>
        <div
          class='flex items-center mb-6 text-2xl font-semibold '
          style={{
            color: theme().textColor,
          }}
        >
          <img class='w-8 h-8 mr-2' src={fraiaLogo} alt='logo' />
          Knowledge
          <span
            style={{
              color: theme().primaryColor,
            }}
          >
            Hub
          </span>
        </div>

        <div
          class='w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 '
          style={{
            background: theme().drawerBackground,
          }}
        >
          <div class='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1
              class='text-xl font-bold leading-tight tracking-tight '
              style={{
                color: theme().textColor,
              }}
            >
              Sign in to your account
            </h1>

            <form class='space-y-4 md:space-y-6' action='#'>
              <TextInput
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
              />
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

              <Button padding='4px 20px' loading={loading()} onClick={handleSignIn}>
                Log In
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
      </div>
    </>
  )
}
