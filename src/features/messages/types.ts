import { Resources } from '../contextual'

export type Chat = {
  id: string
  question: string
  answer: string
  resources: Resources
  createdAt: string
}
