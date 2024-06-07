import background2 from '@/assets/background-2.png'
import background3 from '@/assets/background-3.png'
import newLogo from '@/assets/logo.svg'
import newLogo2 from '@/assets/logo2.svg'
import logo from '@/assets/logo_final.png'
import { ChatSpaceTheme } from '@/graphql/types'

type NonNullProperties<T> = {
  [P in keyof T]: Exclude<T[P], null>
}

export type Theme = NonNullProperties<Omit<ChatSpaceTheme, '__typename'>>

export const defaultTheme: Theme = {
  isDark: false,
  navbarLogoUrl: newLogo2,
  primaryColor: 'rgba(91, 147, 255, 1)',
  primaryAccent: 'rgba(91, 147, 255, 0.2)',
  textColor: 'rgba(31, 8, 8, 1)',
  textSecondary: 'rgba(123, 123, 123, 1)',
  onPrimary: 'rgba(255, 255, 255, 1)',
  backgroundColor: 'rgba(235, 234, 240, 1)',
  backgroundAccent: 'white',
  backgroundOverlay: 'transparent',
  backgroundImageUrl: background2,
  bubbleButtonColor: 'rgba(91, 147, 255, 0.2)',
  drawerBackground: 'rgba(255, 255, 255, 0.75)',
  borderColor: 'rgba(194, 194, 194, 1)',
  textInputTextColor: 'rgba(128, 114, 166, 1)',
  textInputBackgroundColor: 'rgba(122, 137, 165, 0.07)',
  errorColor: 'red',
  surfaceBackground: 'rgba(91, 147, 255, 0.1)',
  surfaceSoftBackground: 'rgba(91, 147, 255, 0.05)',
  surfaceHoveredBackground: 'rgba(91, 147, 255, 0.2)',
}

export const default1ClickTheme: Theme = {
  ...defaultTheme,
  surfaceBackground: 'rgba(168, 157, 241, 0.07)',
}

const fraia: Theme = {
  isDark: false,
  navbarLogoUrl: logo,

  primaryColor: 'rgba(255,118,118,255)',
  primaryAccent: 'rgba(255,118,118,0.2)',
  textColor: 'rgba(31, 8, 8, 1)',
  textSecondary: 'rgba(123, 123, 123, 1)',
  onPrimary: 'rgba(255, 255, 255, 1)',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  backgroundAccent: 'white',
  backgroundOverlay: 'transparent',
  backgroundImageUrl: background3,
  bubbleButtonColor: 'rgba(236, 236, 236, 1)',
  bubbleButtonLogoUrl: newLogo,

  drawerBackground: 'rgba(255, 255, 255, 0.75)',
  borderColor: 'rgba(147, 147, 147, 0.25)',
  textInputTextColor: 'rgba(128, 114, 166, 1)',
  textInputBackgroundColor: 'rgba(122, 137, 165, 0.08)',
  errorColor: 'red',

  surfaceHoveredBackground: 'rgba(255,118,118,0.08)',
  surfaceSoftBackground: 'rgba(255,118,118, 0.05)',
  surfaceBackground: 'rgba(255,118,118, 0.1)',
}

const midnight: Theme = {
  isDark: true,
  navbarLogoUrl: newLogo,
  primaryColor: '#204ef7',
  primaryAccent: '#152e8a',
  textColor: '#FAF9F6',
  textSecondary: '#bac6f5',
  onPrimary: '#bdcbff',
  backgroundColor: '#0c1121',
  backgroundAccent: 'black',
  bubbleButtonColor: '#152e8a',
  drawerBackground: 'rgba(39, 69, 125, 0.3)',
  borderColor: '#354685',
  textInputTextColor: '#bac6f5',
  textInputBackgroundColor: 'rgba(39, 69, 125, 0.7)',
  surfaceHoveredBackground: '#04134d',
  surfaceBackground: 'black',
}

const ugly: Theme = {
  isDark: false,
  navbarLogoUrl: logo,
  primaryColor: 'red',
  primaryAccent: 'orange',
  textColor: 'white',
  textSecondary: 'black',
  onPrimary: 'purple',
  backgroundColor: 'green',
  backgroundAccent: 'teal',
  backgroundImageUrl: 'https://picsum.photos/200/300',
  bubbleButtonColor: 'yellow',
  drawerBackground: 'red',
  borderColor: 'blue',
  textInputTextColor: 'purple',
  textInputBackgroundColor: 'yellow',
  surfaceHoveredBackground: 'pink',
  surfaceBackground: 'brown',
}

export const themes = {
  bubbles: defaultTheme,
  oneClick: default1ClickTheme,
  ugly,
  midnight,
  fraia,
}
