import { Divider, MicrophoneIcon } from '@/components'
import { LockIcon } from '@/components/icons/LockIcon'

const options: BoxButtonProps[] = [
  {
    title: 'Record Audio',
    description: 'Transcribe audio and video files',
    flow: 'transcribe',
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

export const KnowledgeInputsView = () => {
  return (
    <div class='flex flex-col h-full'>
      <div class='flex flex-col gap-2 '>
        <Divider />
        <div class='flex gap-4 items-center'>
          {/* <ArrowRightIcon class='w-5 h-5 rotate-180 text-[var(--primaryColor)] cursor-pointer' /> */}

          <p class='font-bold text-[var(--textSecondary)]'>Train your AI</p>
        </div>
        <Divider />
      </div>

      <div class='flex flex-col gap-2 mt-4 lg:mt-6 '>
        <p class='text-sm lg:text-base font-bold uppercase '>Add Knowledge to your AI</p>

        <p class='text-sm lg:text-base text-[var(--textSecondary)]'>
          Choose a method to add knowledge
        </p>
      </div>

      <div class='flex flex-col lg:flex-row gap-6 lg:gap-10 mt-10 overflow-y-auto lg:overflow-x-auto brand-scroll-container lg:pb-6'>
        {options.map((option) => (
          <BoxButton {...option} />
        ))}
      </div>
    </div>
  )
}

type BoxButtonProps = {
  title: string
  description: string
  flow: string
  Icon: any
}

const BoxButton = (props: BoxButtonProps) => {
  return (
    <div
      class={`flex transition-all group cursor-pointer lg:flex-col rounded-2xl lg:justify-center items-center lg:items-start  border border-[var(--borderColor)] hover:border-[var(--primaryColor)]
              p-8  hover:bg-[var(--surfaceSoftBackground)] lg:h-96 gap-4 lg:gap-8 w-full lg:min-w-[272px] `}
    >
      <div class='rounded-full p-3 lg:p-6 bg-[var(--surfaceBackground)]'>
        <props.Icon class='w-6 h-6 lg:w-10 lg:h-10 text-[var(--primaryColor)]' />
      </div>

      <div>
        <p class='text-sm lg:text-base font-bold uppercase group-hover:text-[var(--primaryColor)] transition-all'>
          {props.title}
        </p>
        <p class='text-sm lg:text-base text-[var(--textSecondary)] group-hover:text-[var(--primaryColor)] transition-all'>
          {props.description}
        </p>
      </div>
    </div>
  )
}
