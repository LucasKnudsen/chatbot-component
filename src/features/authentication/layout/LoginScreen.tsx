import { Button } from '@/components'
import { Nav } from '@/components/Nav'
import { TextInput } from '@/components/inputs'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme'
import { Auth } from 'aws-amplify'
import { createSignal } from 'solid-js'
import fraiaLogo from '../../../assets/logo.svg'

export const LoginScreen = () => {
  const [input, setInput] = createSignal({
    username: import.meta.env.DEV ? 'laksteelhouse@gmail.com' : '',
    password: import.meta.env.DEV ? 'Abcd1234' : '',
  })
  const [loading, setLoading] = createSignal(false)

  const { theme } = useTheme()
  const { text } = useText()

  const handleSignIn = async () => {
    setLoading(true)
    await Auth.signIn(input())
    setLoading(false)
  }

  return (
    <>
      <Nav />

      <div class='flex flex-col items-center justify-center h-[calc(100%-80px)] lg:py-0'>
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
                label='Your email'
                inputProps={{
                  type: 'email',
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
              </div>

              <Button
                class='w-full h-10 rounded-lg text-md'
                loading={loading()}
                onClick={handleSignIn}
              >
                Sign In
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
