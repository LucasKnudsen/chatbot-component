import { JSX } from 'solid-js'

type TabProps<V> = {
  label: string
  value: V
  leftSection?: string | JSX.Element
}

type TabSwitchProps<V> = {
  tabs: TabProps<V>[]
  activeTab: V
  onTabChange: (value: V) => void
}

export const TabSwitch = <Value extends string>(props: TabSwitchProps<Value>) => {
  return (
    <div class='flex w-fit h-fit items-center justify-between rounded-full border border-[var(--borderColor)] relative'>
      {/* Slidable pill  */}
      <div
        class={`absolute rounded-full bg-[var(--primaryColor)] transition-transform duration-200 ease-in-out z-0 outline outline-1 outline-[var(--onPrimary)]`}
        style={{
          height: '100%',
          width: `calc(100% / ${props.tabs.length})`,
          transform: `translateX(calc(100% / ${props.tabs.length} * (${props.tabs.findIndex(
            (tab) => tab.value === props.activeTab
          )} * 2)))`,
        }}
      ></div>

      {props.tabs.map((tab) => (
        <div
          class={`flex items-center justify-center cursor-pointer px-6 py-1 z-[1] transition duration-300  text-[var(--${
            props.activeTab === tab.value ? 'onPrimary' : 'primaryColor'
          })]`}
          onClick={() => props.onTabChange(tab.value)}
        >
          {tab.leftSection}
          <span class='text-sm'>{tab.label}</span>
        </div>
      ))}
    </div>
  )
}
