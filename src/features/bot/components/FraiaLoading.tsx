import { ProgressBar } from '@/components'
import { LogoIcon } from '@/components/icons/LogoIcon'
import { useTheme } from '@/features/theme'
import { Show } from 'solid-js'

type Props = {
  isLoading?: boolean
  overrideLogo?: string
}
export const FraiaLoading = (props: Props) => {
  const { theme } = useTheme()

  return (
    <div class='h-full w-screen md:w-full flex flex-col grow items-center justify-center animate-fade-in gap-4 p-10 lg:p-24'>
      <div class='text-center lg:text-left mb-16'>
        <div class='inline-block mb-4'>
          <Show when={props.overrideLogo} fallback={<LogoIcon color={theme().primaryColor} />}>
            <img src={props.overrideLogo} />
          </Show>
        </div>
        <div class='leading-[17px]'>
          <ProgressBar isLoading={props.isLoading} />
        </div>
      </div>
    </div>
  )
}
