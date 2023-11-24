import { useTheme } from '@/features/theme/hooks'

export const SettingsButton = () => {
  const { theme } = useTheme()
  const primaryColor = theme().primaryColor
  return (
    <div class='flex flex-col gap-y-1 cursor-pointer'>
      <div class='h-1 w-1 rounded-full' style={{ background: primaryColor }} />
      <div class='h-1 w-1 rounded-full' style={{ background: primaryColor }} />
      <div class='h-1 w-1 rounded-full' style={{ background: primaryColor }} />
    </div>
  )
}
