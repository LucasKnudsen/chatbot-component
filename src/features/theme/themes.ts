import background from '@/assets/background-1.png'

export type Theme = {
  primaryColor: string
  backgroundColor: string
  backgroundImageUrl: string
  borderColor: string
  textInputTextColor: string
  textInputBackgroundColor: string
  textInputSendIconColor: string
  promptBackground?: string
  navPromptBackground?: string
  promptTextColor?: string
}

export const defaultTheme: Theme = {
  primaryColor: 'rgba(91, 147, 255, 1)',
  backgroundColor: '#E7E5F4',
  backgroundImageUrl: background,
  borderColor: 'rgba(147, 147, 147, 0.25)',
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
  backgroundImageUrl: 'https://picsum.photos/200/300',
  borderColor: 'blue',
  textInputTextColor: 'purple',
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
