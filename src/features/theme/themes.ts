import background2 from '@/assets/background-2.png'

export type Theme = {
  primaryColor: string
  primaryColorHovered?: string
  textColor: string
  textSecondary: string
  backgroundColor: string
  backgroundImageUrl: string
  borderColor: string
  textInputTextColor: string
  textInputBackgroundColor: string

  promptBackground?: string
  promptBackgroundHovered?: string
}

export const defaultTheme: Theme = {
  primaryColor: 'rgba(91, 147, 255, 1)',
  primaryColorHovered: 'rgba(91, 147, 255, 0.2)',
  textColor: 'rgba(35, 24, 67, 1)',
  textSecondary: 'rgba(147, 147, 147, 1)',
  backgroundColor: 'transparent',
  backgroundImageUrl: background2,
  borderColor: 'rgba(147, 147, 147, 0.25)',
  textInputTextColor: 'rgba(128, 114, 166, 1)',
  textInputBackgroundColor: 'rgba(122, 137, 165, 0.08)',

  promptBackground:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.08) 0%, rgba(218, 145, 221, 0.08) 100%)',
  promptBackgroundHovered:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.25) 0%, rgba(218, 145, 221, 0.25) 100%)',
}

export const ugly: Theme = {
  primaryColor: 'red',
  textColor: 'white',
  textSecondary: 'black',
  backgroundColor: 'green',
  backgroundImageUrl: 'https://picsum.photos/200/300',
  borderColor: 'blue',
  textInputTextColor: 'purple',
  textInputBackgroundColor: 'yellow',
  promptBackgroundHovered: 'pink',
  promptBackground: 'brown',
}

export const themes: Record<string, Theme> = {
  default: defaultTheme,
  ugly,
}
