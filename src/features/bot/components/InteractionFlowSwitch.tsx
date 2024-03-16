import { TabSwitch } from '@/components'
import { botStore, botStoreActions } from '../stores'

export const InteractionFlowSwitch = () => {
  return (
    <TabSwitch
      tabs={[
        { label: 'Chat', value: 'chat' },
        { label: 'Voice', value: 'voice' },
      ]}
      activeTab={botStore.activeInteractionFlow}
      onTabChange={(newValue) => botStoreActions.setBotStore('activeInteractionFlow', newValue)}
    />
  )
}
