import { TabView } from '@/components/TabView'
import { History } from '@/features/messages'
import { Chat } from '@/features/messages/types'
import { NavigationPromptsList } from '@/features/prompt'
import { useText } from '@/features/text'
import { createMemo } from 'solid-js'
import { PromptType } from '.'
import { botStore } from '..'
import { sidebarInnerWidthNum } from '../constants'

type SidebarTabViewProps = {
  setQuestion: (question: Chat) => void
  handleSubmit: (question: string) => void
  initialPrompts?: PromptType[]
}

export const SidebarTabView = (props: SidebarTabViewProps) => {
  const { text } = useText()

  const tabs = createMemo(() => {
    const historyTab = {
      title: text().historyTabTitle,
      content: (
        <History
          history={botStore.history}
          onSelect={props.setQuestion}
          disabled={botStore.loading}
        />
      ),
    }

    const navTab = {
      title: text().navigationTabTitle,
      content: (
        <NavigationPromptsList
          prompts={props.initialPrompts}
          onSelect={props.handleSubmit}
          disabled={botStore.loading}
        />
      ),
    }

    return botStore.chat ? [historyTab, navTab] : [navTab, historyTab]
  })

  return (
    <div style={{ width: sidebarInnerWidthNum + 'px' }}>
      <TabView tabs={tabs()} />
    </div>
  )
}
