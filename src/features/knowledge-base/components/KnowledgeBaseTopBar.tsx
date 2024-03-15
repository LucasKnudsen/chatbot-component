import { Divider } from '@/components'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { Show } from 'solid-js'

export const KnowledgeBaseTopBar = (props: { title: string; onBack?: () => void }) => {
  return (
    <div class='flex flex-col gap-2  '>
      <Divider />
      <div class='flex gap-4 items-center max-lg:ml-12 max-lg:pl-4 max-lg:border-l border-[var(--borderColor)]'>
        <Show when={props.onBack}>
          <ArrowRightIcon
            onClick={props.onBack}
            class='w-5 h-5 rotate-180 text-[var(--primaryColor)] cursor-pointer'
          />
        </Show>

        <p class='font-bold leading-[30px] text-[var(--textSecondary)]'>{props.title}</p>
      </div>
      <Divider />
    </div>
  )
}
