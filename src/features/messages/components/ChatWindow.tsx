import { Settings, TypingBubble } from '@/components'
import { MessageIcon } from '@/components/icons'
import { Marked } from '@ts-stack/markdown'
import { Show, createEffect, on } from 'solid-js'
import { scrollChatWindowToBottom } from '..'
import { Chat } from '../types'
import Gallery from './Gallery/Gallery'

type ChatWindowProps = {
  question: Chat
}

export const ChatWindow = (props: ChatWindowProps) => {
  let botMessageEl: HTMLDivElement | undefined

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(props?.question?.answer || '')
    }
  })

  createEffect(on(() => props.question, scrollChatWindowToBottom, { defer: true }))

  return (
    <>
      {/* Question */}
      <div class='flex pb-3 border-b border-gray-200 justify-between'>
        <div class=' text-2xl text-gray-500 font-light flex flex-row gap-x-4 items-start '>
          <div>
            <MessageIcon width={30} />
          </div>
          {props.question?.question}
        </div>

        <Settings
          menuItems={[
            {
              label: 'Copy text',
              onClick: () => {
                navigator.clipboard.writeText(props.question?.answer!)
              },
            },
          ]}
        />
      </div>

      {/* Answer */}
      <div
        id='chat-window'
        class='flex flex-1 py-4 mb-4 flex-col overflow-y-scroll scrollable-container scroll-smooth relative'
      >
        {/* Loading  */}
        <Show when={!props.question?.answer}>
          <div class='flex mt-4  '>
            <TypingBubble />
          </div>
        </Show>

        {/* Chatbot answer  */}
        <div ref={botMessageEl} class='prose ' />

        {/* Gallery  */}
        <Gallery resources={props.question?.resources!} />
      </div>
    </>
  )
}
