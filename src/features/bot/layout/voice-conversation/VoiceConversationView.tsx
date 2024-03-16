import { Channel } from '@/graphql'
import { InteractionFlowSwitch } from '../../components'
import { botStore } from '../../stores'

export const VoiceConversationView = () => {
  // 1. Make conditional rendering of flow state between awaiting input, listening, thinking, and speaking
  // 2. Implement voice input through recording
  // 3. Implement STT into TTS
  // 4. Play TTS audio

  return (
    <div class='flex animate-fade-in'>
      <InteractionFlowSwitch />

      <div class='flex flex-col grow justify-center items-center'>
        <div
          class={`w-28 h-28 rounded-full  border-white border transition`}
          style={{
            'background-image':
              (botStore.activeChannel as Channel)?.avatar ||
              'linear-gradient(to right, #ed4264, #ffedbc)',
          }}
        ></div>
      </div>
    </div>
  )
}
