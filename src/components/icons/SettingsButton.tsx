import { useTheme } from '@/features/theme/hooks'

export const SettingsButton = () => {
  const { theme } = useTheme()
  const primaryColor = theme().primaryColor
  return (
    <div class='flex flex-col gap-y-1 cursor-pointer px-4'>
      <div class='h-1.5 w-1.5 rounded-full' style={{ background: primaryColor }} />
      <div class='h-1.5 w-1.5 rounded-full' style={{ background: primaryColor }} />
      <div class='h-1.5 w-1.5 rounded-full' style={{ background: primaryColor }} />
    </div>
  )
}
