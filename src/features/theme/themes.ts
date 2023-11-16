export type Theme = {
  primaryColor: string
  backgroundColor: string
  borderColor: string
  textInputTextColor: string
  textInputPlaceholder: string
  textInputBackgroundColor: string
  textInputSendIconColor: string
  promptBackground?: string
  navPromptBackground?: string
  promptTextColor?: string
}

export const defaultTheme: Theme = {
  primaryColor: 'rgba(91, 147, 255, 1)',
  backgroundColor: '#E7E5F4',
  borderColor: 'rgba(147, 147, 147, 0.25)',
  textInputPlaceholder: 'Ask me anything...',
  textInputTextColor: 'rgba(128, 114, 166, 1)',
  textInputBackgroundColor: 'rgba(122, 137, 165, 0.08)',
  textInputSendIconColor: 'rgba(147, 147, 147, 1)',
  promptBackground:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.08) 0%, rgba(218, 145, 221, 0.08) 100%)',
  navPromptBackground:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.25) 0%, rgba(218, 145, 221, 0.25) 100%)',
  promptTextColor: 'rgba(35, 24, 67, 1)',
}

export const ugly: Theme = {
  primaryColor: 'red',
  backgroundColor: 'green',
  borderColor: 'blue',
  textInputTextColor: 'purple',
  textInputPlaceholder: 'Ask me anything...',
  textInputBackgroundColor: 'yellow',
  textInputSendIconColor: 'orange',
  navPromptBackground: 'pink',
  promptBackground: 'brown',
  promptTextColor: 'black',
}

export const themes: Record<string, Theme> = {
  default: defaultTheme,
  ugly,
}
