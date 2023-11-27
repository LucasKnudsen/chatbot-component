import { TabView } from '@/components/TabView'
import { History } from '@/features/messages'
import { Chat } from '@/features/messages/types'
import { NavigationPromptsList } from '@/features/prompt'
import { useText } from '@/features/text'
import { createMemo } from 'solid-js'
import { PromptType } from '.'
import { sidebarInnerWidthNum } from '../constants'

type SidebarTabViewProps = {
  history: Chat[]
  setQuestion: (question: Chat) => void
  handleSubmit: (question: string) => void
  disabled: boolean
  navDefault?: boolean
  initialPrompts?: PromptType[]
}

export const SidebarTabView = (props: SidebarTabViewProps) => {
  const { text } = useText()

  const tabs = createMemo(() => {
    const historyTab = {
      title: text().historyTabTitle,
      content: (
        <History history={props.history} onSelect={props.setQuestion} disabled={props.disabled} />
      ),
    }

    const navTab = {
      title: text().navigationTabTitle,
      content: (
        <NavigationPromptsList
          prompts={props.initialPrompts}
          onSelect={props.handleSubmit}
          disabled={props.disabled}
        />
      ),
    }

    return props.navDefault ? [navTab, historyTab] : [historyTab, navTab]
  })

  return (
    <div style={{ width: sidebarInnerWidthNum + 'px' }}>
      <TabView tabs={tabs()} />
    </div>
  )
}
