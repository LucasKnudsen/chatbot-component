import { TabView } from '@/components/TabView'
import { History } from '@/features/messages'
import { Chat } from '@/features/messages/types'
import { NavigationPromptsList } from '@/features/prompt'
import { useText } from '@/features/text'
import { createMemo } from 'solid-js'
import { botStore } from '..'
import { sidebarInnerWidthNum } from '../constants'

type SidebarTabViewProps = {
  setQuestion: (question: Chat) => void
  handleSubmit: (question: string) => void
  class?: string
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
          prompts={
            botStore.activeChannel!.initialPrompts
            // botStore.chat?.question ? props.initialPrompts : props.initialPrompts?.slice(0, 3)
          }
          onSelect={props.handleSubmit}
          disabled={botStore.loading}
        />
      ),
    }

    return [navTab, historyTab]
  })

  return (
    <div class={props.class} style={{ width: sidebarInnerWidthNum + 'px' }}>
      <TabView initialIndex={botStore.chat ? 1 : 0} tabs={tabs()} />
    </div>
  )
}
