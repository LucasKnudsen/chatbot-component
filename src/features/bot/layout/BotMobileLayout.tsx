import { Collapsible } from '@/components/Collapsible'
import { ChatInput } from '@/components/inputs/chatInput'
import { ChatWindow } from '@/features/messages'
import { SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { Show, createSignal } from 'solid-js'
import { botStore } from '..'

type BotMobileProps = {
  userInput: string

  onSubmit: (question: string) => void
  onClear: () => void
  class?: string
}

export const BotMobileLayout = (props: BotMobileProps) => {
  const [isFocused, setIsFocused] = createSignal(false)
  const { theme } = useTheme()
  const { text } = useText()

  return (
    <div class='flex flex-col flex-1 h-full overflow-hidden'>
      <div class='flex flex-col flex-1 overflow-hidden text-base pt-6'>
        <Show
          when={botStore.activeChannel?.activeChat}
          fallback={
            <div class='flex flex-1 items-end px-6 '>
              <h1 class='text-4xl md:text-5xl max-w-md h-fit mb-6 font-extralight tracking-wide leading-tight'>
                {botStore.activeHistory.length
                  ? text().returnWelcomeMessage
                  : text().welcomeMessage}
              </h1>
            </div>
          }
        >
          <ChatWindow />
        </Show>
      </div>
      <div
        class='w-full py-4'
        style={{
          background: theme().backgroundAccent,
          'border-top': `1px solid ${theme().borderColor}`,
        }}
      >
        <div class='px-6'>
          <ChatInput
            class='mb-2'
            rows={1}
            defaultValue={props.userInput}
            onSubmit={props.onSubmit}
            placeholder={text().inputPlaceholder}
            onFocusChange={setIsFocused}
          />
        </div>

        <Collapsible open={isFocused()}>
          <SuggestedPrompts handleSubmit={props.onSubmit} />
        </Collapsible>
      </div>
    </div>
  )
}
