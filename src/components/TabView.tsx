import { useTheme } from '@/features/theme/hooks'
import { createSignal, For, JSXElement } from 'solid-js'

type Tab = {
  title: string
  content: JSXElement
}

type TabViewProps = {
  tabs: Tab[]
}

export const TabView: (props: TabViewProps) => JSXElement = (props) => {
  const [selectedTab, setSelectedTab] = createSignal(0)
  const { theme } = useTheme()

  return (
    <div>
      <ul class='flex'>
        <For each={props.tabs}>
          {(tab, index) => (
            <li
              class={`flex flex-1 text-left  `}
              style={{
                'padding-bottom': selectedTab() === index() ? '0px' : '1px',
                'border-bottom-width': selectedTab() === index() ? '2px' : '1px',
                'border-color':
                  selectedTab() === index() ? theme().primaryColor : theme().borderColor,
                color: selectedTab() === index() ? theme().textColor : theme().textSecondary,
              }}
            >
              <button
                class='flex-1 py-2 text-left font-semibold'
                style={{
                  'font-weight': selectedTab() === index() ? '700' : '500',
                }}
                onClick={() => setSelectedTab(index())}
              >
                {tab.title}
              </button>
            </li>
          )}
        </For>
      </ul>

      <div class='my-10'>{props.tabs[selectedTab()].content}</div>
    </div>
  )
}
