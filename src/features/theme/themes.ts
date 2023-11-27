import background2 from '@/assets/background-2.png'

export type Theme = {
  primaryColor: string
  primaryAccent: string
  textColor: string
  textSecondary: string
  backgroundColor: string
  backgroundImageUrl: string
  borderColor: string
  textInputTextColor: string
  textInputBackgroundColor: string
  surfaceBackground: string
  surfaceBackground2: string
  surfaceHoveredBackground: string
}

export const defaultTheme: Theme = {
  primaryColor: 'rgba(91, 147, 255, 1)',
  primaryAccent: 'rgba(91, 147, 255, 0.2)',
  textColor: 'rgba(35, 24, 67, 1)',
  textSecondary: 'rgba(147, 147, 147, 1)',
  backgroundColor: 'transparent',
  backgroundImageUrl: background2,
  borderColor: 'rgba(147, 147, 147, 0.25)',
  textInputTextColor: 'rgba(128, 114, 166, 1)',
  textInputBackgroundColor: 'rgba(122, 137, 165, 0.08)',
  surfaceBackground:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.08) 0%, rgba(218, 145, 221, 0.08) 100%)',
  surfaceBackground2:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.15) 0%, rgba(218, 145, 221, 0.15) 100%)',

  surfaceHoveredBackground:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.25) 0%, rgba(218, 145, 221, 0.25) 100%)',
}

const ugly: Theme = {
  primaryColor: 'red',
  primaryAccent: 'orange',
  textColor: 'white',
  textSecondary: 'black',
  backgroundColor: 'green',
  backgroundImageUrl: 'https://picsum.photos/200/300',
  borderColor: 'blue',
  textInputTextColor: 'purple',
  textInputBackgroundColor: 'yellow',
  surfaceHoveredBackground: 'pink',
  surfaceBackground: 'brown',
  surfaceBackground2: 'teal',
}

export const themes: Record<string, Theme> = {
  default: defaultTheme,
  ugly,
}
