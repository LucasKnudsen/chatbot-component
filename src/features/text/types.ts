import { ChatSpaceText } from '@/graphql'

export type TextConfig = {
  [K in keyof Omit<ChatSpaceText, '__typename'>]-?: NonNullable<ChatSpaceText[K]>
}
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
