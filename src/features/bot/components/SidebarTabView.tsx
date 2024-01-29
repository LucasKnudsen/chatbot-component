import { TabView } from '@/components/TabView'
import { History } from '@/features/messages'
import { NavigationPromptsList } from '@/features/prompt'
import { useText } from '@/features/text'
import { ChannelHistoryItem } from '@/graphql'
import { createMemo } from 'solid-js'
import { botStore } from '..'
import { sidebarInnerWidthNum } from '../constants'

type SidebarTabViewProps = {
  setQuestion: (question: ChannelHistoryItem) => void
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
          history={botStore.activeHistory}
          onSelect={props.setQuestion}
          disabled={botStore.isAwaitingAnswer}
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
          disabled={botStore.isAwaitingAnswer}
        />
      ),
    }

    return [navTab, historyTab]
  })

  return (
    <div class={props.class} style={{ width: sidebarInnerWidthNum + 'px' }}>
      <TabView initialIndex={botStore.activeChannel?.activeChat ? 1 : 0} tabs={tabs()} />
    </div>
  )
}
