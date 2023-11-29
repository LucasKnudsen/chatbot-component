import { Settings, TypingBubble } from '@/components'
import { Divider } from '@/components/Divider'
import { MessageIcon } from '@/components/icons'
import { botStore } from '@/features/bot'
import { useText } from '@/features/text'
import { Marked } from '@ts-stack/markdown'
import { Show, createEffect, on } from 'solid-js'
import { scrollChatWindowToBottom } from '..'
import Gallery from './Gallery/Gallery'

export const ChatWindow = () => {
  let botMessageEl: HTMLDivElement | undefined

  const { text } = useText()

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(botStore.chat?.answer || '')
    }
  })

  createEffect(on(() => botStore.chat, scrollChatWindowToBottom, { defer: true }))

  const onCopy = () => {
    navigator.clipboard.writeText(botStore.chat?.answer!)
  }

  const onShare = () => {
    navigator.share?.({
      title: botStore.chat?.question!,
      text: botStore.chat?.answer!,
    })
  }

  return (
    <>
      {/* Question */}
      <div class='flex  justify-between'>
        <div class=' text-2xl text-gray-500 font-light flex flex-row gap-x-4 items-start '>
          <div>
            <MessageIcon width={30} />
          </div>
          {botStore.chat?.question}
        </div>

        <Settings
          menuItems={[
            {
              label: text().copyText,
              onClick: onCopy,
            },
            ...(Boolean(navigator.share) // Check if share is supported
              ? [
                  {
                    label: text().share,
                    onClick: onShare,
                  },
                ]
              : []),
          ]}
        />
      </div>

      <Divider />

      {/* Answer */}
      <div
        id='chat-window'
        class='flex flex-1 py-4 mb-4 flex-col overflow-y-scroll scrollable-container scroll-smooth relative'
      >
        {/* Loading  */}
        <Show when={!botStore.chat?.answer}>
          <div class='flex mt-4  '>
            <TypingBubble />
          </div>
        </Show>

        {/* Chatbot answer  */}
        <div ref={botMessageEl} class='prose ' />

        {/* Gallery  */}
        <Gallery resources={botStore.chat?.resources!} />
      </div>
    </>
  )
}
