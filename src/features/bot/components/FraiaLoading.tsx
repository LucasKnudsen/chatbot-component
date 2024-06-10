import { TypingBubble, ProgressBar } from '@/components'
import { LogoIcon } from '@/components/icons/LogoIcon'
import { useTheme } from '@/features/theme'
import { configStore } from '@/features/portal-init'

type Props = {
  isLoading?: boolean;
}
export const FraiaLoading = (props: Props) => {
  const { theme } = useTheme()
  const { mode } = configStore

  return (
    <div class='h-full w-screen flex flex-col grow justify-center animate-fade-in gap-4 p-10 lg:p-24'>
      <div class='text-center lg:text-left mb-16'>
        <div class='inline-block mb-4'>
          <LogoIcon color={theme().primaryColor} />
        </div>
        {mode === 'oneClick' ? (
          <div class='leading-[17px]'>
            <ProgressBar isLoading={props.isLoading}  />
          </div>
        ) : (
          <>
          <h4
            class='text-base leading-[17px] font-light'
            style={{
              color: theme().textSecondary,
            }}
          >
            The most personalized AI catchphrase
          </h4>
          </>
        )}
      </div>
      {mode !== 'oneClick' && <TypingBubble />}
    </div>
  )
}
