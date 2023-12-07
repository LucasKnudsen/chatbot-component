import background2 from '@/assets/background-2.png'
import logo from '@/assets/logo.png'

export type Theme = {
  customIconSrc: string
  primaryColor: string
  primaryAccent: string
  textColor: string
  textSecondary: string
  onPrimary: string
  backgroundColor: string
  backgroundAccent: string
  backgroundImageUrl?: string
  drawerBackground: string
  borderColor: string
  textInputTextColor: string
  textInputBackgroundColor: string
  surfaceBackground: string
  surfaceHoveredBackground: string
}

export const defaultTheme: Theme = {
  customIconSrc: logo,
  primaryColor: 'rgba(91, 147, 255, 1)',
  primaryAccent: 'rgba(91, 147, 255, 0.2)',
  textColor: 'rgba(35, 24, 67, 1)',
  textSecondary: 'rgba(147, 147, 147, 1)',
  onPrimary: 'rgba(255, 255, 255, 1)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  backgroundAccent: 'white',
  backgroundImageUrl: background2,
  drawerBackground: 'rgba(255, 255, 255, 0.75)',
  borderColor: 'rgba(147, 147, 147, 0.25)',
  textInputTextColor: 'rgba(128, 114, 166, 1)',
  textInputBackgroundColor: 'rgba(122, 137, 165, 0.08)',
  surfaceBackground:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.08) 0%, rgba(218, 145, 221, 0.08) 100%)',
  surfaceHoveredBackground:
    'linear-gradient(90deg, rgba(91, 147, 255, 0.25) 0%, rgba(218, 145, 221, 0.25) 100%)',
}

const midnight: Theme = {
  customIconSrc: logo,
  primaryColor: '#204ef7',
  primaryAccent: '#152e8a',
  textColor: '#FAF9F6',
  textSecondary: '#bac6f5',
  onPrimary: '#bdcbff',
  backgroundColor: '#0c1121',
  backgroundAccent: 'black',
  drawerBackground: 'rgba(39, 69, 125, 0.3)',
  borderColor: '#354685',
  textInputTextColor: '#bac6f5',
  textInputBackgroundColor: 'rgba(39, 69, 125, 0.7)',
  surfaceHoveredBackground: '#04134d',
  surfaceBackground: 'black',
}

const ugly: Theme = {
  customIconSrc: logo,
  primaryColor: 'red',
  primaryAccent: 'orange',
  textColor: 'white',
  textSecondary: 'black',
  onPrimary: 'purple',
  backgroundColor: 'green',
  backgroundAccent: 'teal',
  backgroundImageUrl: 'https://picsum.photos/200/300',
  drawerBackground: 'red',
  borderColor: 'blue',
  textInputTextColor: 'purple',
  textInputBackgroundColor: 'yellow',
  surfaceHoveredBackground: 'pink',
  surfaceBackground: 'brown',
}

export const themes: Record<string, Theme> = {
  bubbles: defaultTheme,
  ugly,
  midnight,
}
