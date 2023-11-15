export type Theme = {
  backgroundColor: string
  textInputTextColor: string
  textInputPlaceholder: string
  textInputBackgroundColor: string
  textInputSendIconColor: string
}

export const defaultTheme: Theme = {
  backgroundColor: '#F3F1F1',
  textInputPlaceholder: 'Ask me anything...',
  textInputTextColor: 'rgba(128, 114, 166, 1)',
  textInputBackgroundColor: 'rgba(122, 137, 165, 0.08)',
  textInputSendIconColor: 'rgba(147, 147, 147, 1)',
}

export const themes: Record<string, Theme> = {
  default: defaultTheme,
}
