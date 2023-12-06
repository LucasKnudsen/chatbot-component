import { Collapsible } from '@/components/Collapsible'
import { TextInput } from '@/components/inputs/textInput'
import { ChatWindow } from '@/features/messages'
import { SuggestedPrompts } from '@/features/prompt'
import { useText } from '@/features/text'
import { Show, createSignal } from 'solid-js'
import { PromptType } from '.'
import { botStore } from '..'

type BotMobileProps = {
  userInput: string
  suggestedPrompts: string[]
  initialPrompts?: PromptType[]
  isFetchingSuggestedPrompts: boolean
  onSubmit: (question: string) => void
  onClear: () => void
  toggleBot: () => void
  class?: string
}

export const BotMobileLayout = (props: BotMobileProps) => {
  const [isFocused, setIsFocused] = createSignal(false)
  const { text } = useText()

  return (
    <div class='flex flex-col flex-1 h-full overflow-hidden'>
      <div class='flex flex-col flex-1 overflow-hidden text-base pt-6'>
        <Show
          when={botStore.chat}
          fallback={
            <div class='flex flex-1 items-end px-6 '>
              <h1 class='text-4xl md:text-5xl max-w-md h-fit mb-6 font-extralight tracking-wide '>
                {botStore.history.length ? text().returnWelcomeMessage : text().welcomeMessage}
              </h1>
            </div>
          }
        >
          <ChatWindow />
        </Show>
      </div>
      <div class='w-full py-4 bg-white border-t'>
        <div class='px-6'>
          <TextInput
            class='mb-2'
            rows={1}
            disabled={botStore.loading}
            defaultValue={props.userInput}
            onSubmit={props.onSubmit}
            placeholder={text().inputPlaceholder}
            onFocusChange={setIsFocused}
          />
        </div>

        <Collapsible open={isFocused()}>
          <SuggestedPrompts
            handleSubmit={props.onSubmit}
            suggestedPrompts={props.suggestedPrompts}
            isFetching={props.isFetchingSuggestedPrompts}
            loading={botStore.loading}
          />
        </Collapsible>
      </div>
    </div>
  )
}
