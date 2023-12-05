import linkIcon1 from '@/assets/link-icon-1.svg'
import { Settings, TypingBubble } from '@/components'
import { Divider } from '@/components/Divider'
import { MessageIcon } from '@/components/icons'
import { botStore } from '@/features/bot'
import { Fact } from '@/features/contextual/components/Fact'
import { LinkInline } from '@/features/contextual/components/LinkInline'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { Marked } from '@ts-stack/markdown'
import { For, Show, createEffect, on } from 'solid-js'

import Gallery from './Gallery/Gallery'

export const ChatWindow = () => {
  let botMessageEl: HTMLDivElement | undefined

  const { text } = useText()
  const { theme } = useTheme()
  const device = useMediaQuery()

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(botStore.chat?.answer || '')
    }
  })

  const scrollChatWindowToBottom = (offset?: number) => {
    const chatWindow = document.getElementById('chat-window')

    if (chatWindow)
      setTimeout(
        () =>
          chatWindow.scrollTo(
            0,
            offset ? chatWindow.scrollHeight + offset : chatWindow.scrollHeight
          ),
        50
      )
  }

  createEffect(
    on(
      () => botStore.chat?.answer,
      () => scrollChatWindowToBottom(),
      { defer: true }
    )
  )

  // shows a bit of the resources when they are loaded
  createEffect(
    on(
      () => botStore.chat?.resources,
      () => scrollChatWindowToBottom(-100),
      { defer: true }
    )
  )

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
      <div class='flex justify-between px-6 md:px-0'>
        <div class='mb-1  text-lg md:text-2xl text-gray-500 font-light flex flex-row gap-x-4 items-start '>
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

      <Divider margin={0} />

      {/* Answer */}
      <div
        id='chat-window'
        class='flex flex-1 py-4 flex-col overflow-y-scroll scrollable-container scroll-smooth relative gap-y-8'
      >
        {/* Loading  */}
        <Show when={botStore.loading && !botStore.chat?.answer}>
          <div class='flex mt-4 px-6 md:px-0'>
            <TypingBubble />
          </div>
        </Show>

        {/* Chatbot answer  */}
        <div data-testid='chatbot-answer' ref={botMessageEl} class='prose px-6 md:px-0' />

        {/* Gallery  */}
        <Gallery resources={botStore.chat?.resources!} class='px-6 md:px-0' />

        <Show when={device() == 'mobile'}>
          <div class='flex flex-col'>
            <Show when={botStore.chat?.resources.fact.length}>
              <div class='flex overflow-x-scroll whitespace-nowrap gap-x-4 px-6 md:px-0 no-scrollbar mt-2'>
                <For each={botStore.chat?.resources?.fact ?? []}>
                  {(element) => <Fact fact={element} />}
                </For>
              </div>
            </Show>

            <Show when={botStore.chat?.resources.link.length}>
              <div class='px-6 md:px-0'>
                <div
                  class='font-bold text-xs mt-8'
                  style={{
                    color: theme().textSecondary,
                  }}
                >
                  <img class='inline-block mr-2' src={linkIcon1} />
                  Links
                </div>
                <Divider margin={8} />
              </div>
              <div class='flex overflow-x-scroll gap-x-4 px-6 no-scrollbar mt-2'>
                <For each={botStore.chat?.resources?.link ?? []}>
                  {(element) => <LinkInline link={element} />}
                </For>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </>
  )
}
