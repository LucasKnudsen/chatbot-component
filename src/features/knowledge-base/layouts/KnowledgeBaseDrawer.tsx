import { CircleCloseRightIcon } from '@/components/icons/CircleCloseRightIcon'
import { botStore, botStoreActions } from '@/features/bot'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Show } from 'solid-js'
import { KnowledgeInputsView } from './KnowledgeInputsView'

export const KnowledgeBaseDrawer = () => {
  const device = useMediaQuery()

  return (
    <div
      class={`flex absolute top-0 right-0 flex-col h-full   transition-all ]
              border-l border-[var(--borderColor)] duration-300 p-6 lg:p-10
              bg-[var(--backgroundColor)]
              `}
      style={{
        width: device() === 'desktop' ? '96%' : '100%',
        transform: `translateX(${botStore.isKnowledgeBaseOpen ? '0' : '100%'})`,
      }}
    >
      <Show when={botStore.isKnowledgeBaseOpen}>
        <div
          class='absolute -left-4 top-[60px] cursor-pointer'
          onClick={botStoreActions.toggleKnowledgeBase}
        >
          <CircleCloseRightIcon class='w-8 h-8' />
        </div>
      </Show>

      <KnowledgeInputsView />
    </div>
  )
}
