import { registerWebComponents } from './register'
import { injectChatbotInWindow, parseChatbot } from './window'

registerWebComponents()

const chatbot = parseChatbot()

injectChatbotInWindow(chatbot)

export default chatbot
