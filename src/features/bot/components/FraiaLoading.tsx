import { TypingBubble } from '@/components'
import { LogoIcon } from '@/components/icons/LogoIcon'
import { useTheme } from '@/features/theme'

export const FraiaLoading = () => {
  const { theme } = useTheme()

  return (
    <div class='h-full w-screen flex flex-col grow justify-center animate-fade-in gap-4 p-10 lg:p-24'>
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

      <TypingBubble />
    </div>
  )
}
