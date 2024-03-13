import { Divider } from '@/components'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import { Show } from 'solid-js'

export const KnowledgeBaseTopBar = (props: { title: string; onBack?: () => void }) => {
  return (
    <div class='flex flex-col gap-2 '>
      <Divider />
      <div class='flex gap-4 items-center'>
        <Show when={props.onBack}>
          <ArrowRightIcon
            onClick={props.onBack}
            class='w-5 h-5 rotate-180 text-[var(--primaryColor)] cursor-pointer'
          />
        </Show>

        <p class='font-bold text-[var(--textSecondary)]'>{props.title}</p>
      </div>
      <Divider />
    </div>
  )
}
