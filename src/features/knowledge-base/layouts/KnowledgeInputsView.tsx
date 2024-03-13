import { MicrophoneIcon } from '@/components'
import { LockIcon } from '@/components/icons/LockIcon'
import { Match, Switch, createSignal } from 'solid-js'
import { InputOption, InputOptionProps, KnowledgeBaseTitle, KnowledgeBaseTopBar } from '..'
import { AudioRecordingView } from './audio-recording/AudioRecordingView'

const options: InputOptionProps[] = [
  {
    title: 'Record Audio',
    description: 'Record audio and upload it to the AI',
    flow: 'recording',
    Icon: MicrophoneIcon,
  },
  {
    title: 'Add Context',
    description: 'Type in custom context',
    flow: '',
    Icon: LockIcon,
  },
  {
    title: 'Scrape Website',
    description: 'Scrape content from a website',
    flow: '',
    Icon: LockIcon,
  },
  {
    title: 'YouTube Scraper',
    description: 'Scrape audio from YouTube',
    flow: '',
    Icon: LockIcon,
  },
]

export type ActiveFlow = 'files' | 'text' | 'website' | 'transcribe' | 'youtube' | 'recording' | ''

export const KnowledgeInputsView = () => {
  const [activeFlow, setActiveFlow] = createSignal<ActiveFlow>('')

  return (
    <div>
      <Switch>
        <Match when={activeFlow() === ''}>
          <KnowledgeBaseTopBar title='Train your AI' />

          <KnowledgeBaseTitle
            title='Add Knowledge to your AI'
            description='Choose a method to add knowledge'
          />

          <div class='flex flex-col lg:flex-row gap-6 lg:gap-10 mt-10 overflow-y-auto lg:overflow-x-auto brand-scroll-container lg:pb-6'>
            {options.map((option) => (
              <InputOption {...option} onClick={() => setActiveFlow(option.flow)} />
            ))}
          </div>
        </Match>

        <Match when='recording'>
          <AudioRecordingView onBack={() => setActiveFlow('')} />
        </Match>
      </Switch>
    </div>
  )
}
