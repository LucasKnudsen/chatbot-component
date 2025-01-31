import { MessageIcon, MicrophoneIcon, TabSwitch } from '@/components'
import { botStore, botStoreActions } from '../stores'

export const InteractionFlowSwitch = (props: { onlyIcon?: boolean }) => {
  return (
    <TabSwitch
      tabs={[
        {
          label: !props.onlyIcon ? 'Chat' : '',
          value: 'chat',
          leftSection: props.onlyIcon ? <MessageIcon class='h-5 w-5' /> : '',
        },
        {
          label: !props.onlyIcon ? 'Voice' : '',
          value: 'voice',
          leftSection: props.onlyIcon ? <MicrophoneIcon class='h-5 w-5' /> : '',
        },
      ]}
      activeTab={botStore.activeInteractionFlow}
      onTabChange={(newValue) => botStoreActions.setBotStore('activeInteractionFlow', newValue)}
    />
  )
}
