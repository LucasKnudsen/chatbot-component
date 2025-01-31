import { MicrophoneIcon } from '@/components'
import { Match, Switch, createSignal } from 'solid-js'
import {
  KnowledgeBaseTitle,
  KnowledgeBaseTopBar,
  KnowledgeInputOption,
  KnowledgeInputOptionProps,
} from '..'
import { AudioRecordingView } from './audio-recording/AudioRecordingView'

const options: KnowledgeInputOptionProps[] = [
  {
    title: 'Record Audio',
    description: 'Record audio and upload it to the AI',
    flow: 'recording',
    Icon: MicrophoneIcon,
  },
  // {
  //   title: 'Add Context',
  //   description: 'Type in custom context',
  //   flow: '',
  //   Icon: LockIcon,
  // },
  // {
  //   title: 'Scrape Website',
  //   description: 'Scrape content from a website',
  //   flow: '',
  //   Icon: LockIcon,
  // },
  // {
  //   title: 'YouTube Scraper',
  //   description: 'Scrape audio from YouTube',
  //   flow: '',
  //   Icon: LockIcon,
  // },
]

export type ActiveFlow = 'files' | 'text' | 'website' | 'transcribe' | 'youtube' | 'recording' | ''

export const KnowledgeInputsView = () => {
  const [activeFlow, setActiveFlow] = createSignal<ActiveFlow>('')

  return (
    <div class='flex flex-col h-full'>
      <Switch>
        <Match when={activeFlow() === ''}>
          <KnowledgeBaseTopBar title='Train your AI' />

          <KnowledgeBaseTitle
            title='Add Knowledge to your AI'
            description='Choose a method to add knowledge'
          />

          <div class='flex flex-col lg:flex-row gap-6 lg:gap-10 mt-10 max-lg:pr-1 overflow-y-auto lg:overflow-x-auto brand-scroll-container lg:pb-6'>
            {options.map((option) => (
              <KnowledgeInputOption {...option} onClick={() => setActiveFlow(option.flow)} />
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
