import { Divider } from '@/components'
import { botStore } from '@/features/bot'
import { NavigationPrompt, NavigationPromptsList } from '@/features/prompt'
import { useText } from '@/features/text'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { createSignal, For, Show } from 'solid-js'
import { StaticAvatar } from '../../../src/features/avatar/components'
import { InteractionFlowSwitch } from '../../bot/components'

export const VoiceConversationView = () => {
  const { text } = useText()
  const device = useMediaQuery()
  const [activePrompt, setActivePrompt] = createSignal('')

  let audioRef: any

  const handlePromptClick = async (prompt: string) => {
    setActivePrompt(prompt)
    setTimeout(() => {
      setActivePrompt('')
    }, 100)
  }

  return (
    <div class='flex grow animate-fade-in flex-col lg:flex-row '>
      <div class='flex-1 '>
        <InteractionFlowSwitch />

        <div class='flex items-end mt-4 '>
          <h1 class='text-2xl lg:text-5xl h-fit font-light tracking-wide leading-tight '>
            {botStore.activeHistory.length ? text().returnWelcomeMessage : text().welcomeMessage}
          </h1>
        </div>
      </div>

      <StaticAvatar audioRef={audioRef} triggerAvatar={activePrompt} />

      <Show when={device() === 'desktop'}>
        <div class='flex-1 flex justify-end '>
          <div class='max-w-[311px]'>
            <div class='flex flex-col gap-2 pb-4 '>
              <Divider />
              <p class='font-bold leading-[30px] text-[var(--textSecondary)]'>Navigation</p>
              <Divider />
            </div>

            <NavigationPromptsList
              prompts={
                botStore.activeChannel!.initialPrompts
                // botStore.chat?.question ? props.initialPrompts : props.initialPrompts?.slice(0, 3)
              }
              onSelect={handlePromptClick}
              disabled={botStore.isAwaitingAnswer}
            />
          </div>
        </div>
      </Show>

      <Show when={device() !== 'desktop'}>
        <div class='flex flex-col flex-1 mb-4 justify-end'>
          <p class='text-xs  py-4 font-semibold text-[var(--textSecondary)]'>Navigation help</p>

          <div class='flex gap-4 overflow-x-auto pb-1  no-scrollbar'>
            <For each={botStore.activeChannel?.initialPrompts}>
              {(p) => (
                <NavigationPrompt
                  prompt={p}
                  onClick={handlePromptClick}
                  disabled={botStore.isAwaitingAnswer}
                />
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  )
}
