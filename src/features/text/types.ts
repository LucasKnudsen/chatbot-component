import { ChatSpaceText } from '@/graphql'

type NonNullProperties<T> = {
  [P in keyof T]: Exclude<T[P], null>
}

export type TextConfig = NonNullProperties<Omit<ChatSpaceText, '__typename'>>

// export type TextConfig = {
//   welcomeMessage: string
//   returnWelcomeMessage: string
//   inputPlaceholder: string
//   suggestedPromptsTitle: string
//   viewMedia: string
//   brandName: string

//   // Nav bar
//   close: string

//   // Settings dropdown
//   copyText: string
//   copyTextSuccess: string
//   share: string

//   // Sidebar
//   historyTabTitle: string
//   navigationTabTitle: string
//   today: string
//   yesterday: string
//   previous: string
//   noHistory: string
// }
