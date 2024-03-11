import { For, Show, createEffect, createMemo, on } from 'solid-js'
import { MenuItem, Settings } from '@/components'

import { Divider } from '@/components/Divider'
import { Fact } from '@/features/contextual/components/Fact'
import Gallery from './Gallery/Gallery'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { LinkInline } from '@/features/contextual/components/LinkInline'
import { Marked } from '@ts-stack/markdown'
import { MessageIcon } from '@/components/icons'
import { TypingBubble } from '@/components'
import { botStore } from '@/features/bot'
import { useMediaQuery } from '@/utils/useMediaQuery'
import { useText } from '@/features/text'
import { useTheme } from '@/features/theme/hooks'

export const ChatWindow = () => {
  let botMessageEl: HTMLDivElement | undefined
  let chatWindowEl: HTMLDivElement | undefined

  const links = createMemo(() =>
    botStore.activeContextuals.filter((element) => element.type === 'link')
  )

  const { text } = useText()
  const { theme } = useTheme()
  const device = useMediaQuery()

  createEffect(() => {
    if (botMessageEl) {
      botMessageEl.innerHTML = Marked.parse(botStore.activeAnswer)
    }
  })

  const scrollChatWindowToBottom = (by: number = 0) => {
    if (chatWindowEl !== undefined) {
      setTimeout(
        () =>
          by
            ? chatWindowEl!.scrollBy({
                top: by,
                behavior: 'smooth',
              })
            : chatWindowEl!.scrollTo(0, chatWindowEl!.scrollHeight),
        50
      )
    }
  }

  createEffect(
    on(
      () => botStore.activeAnswer,
      () => scrollChatWindowToBottom(),
      { defer: true }
    )
  )

  // createEffect(
  //   on(
  //     () => botStore.activeFacts.length,
  //     () => {
  //       setTimeout(() => scrollChatWindowToBottom(), 250)
  //     }
  //   )
  // )

  // shows a bit of the resources when they are loaded
  createEffect(
    on(
      () => botStore.isAwaitingAnswer,
      () => scrollChatWindowToBottom(150),
      { defer: true }
    )
  )

  const onCopy = () => {
    navigator.clipboard.writeText(botStore.activeAnswer!)
  }

  const onShare = () => {
    navigator.share?.({
      title: botStore.activeChannel?.activeChat?.question,
      text: botStore.activeAnswer!,
    })
  }

  const menuItems = [
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
  ]

  return (
    <>
      {/* Question */}
      <div class='flex justify-between px-6 md:px-0 pb-4'>
        <div
          data-testid='chatbot-question'
          class='mb-1 text-lg md:text-2xl font-light flex flex-row gap-x-4 items-start animate-fade-in '
          style={{
            color: theme().textSecondary,
          }}
        >
          <div>
            <MessageIcon width={30} color={theme().primaryColor} />
          </div>
          {botStore.activeChannel?.activeChat?.question}
        </div>

        <Settings class='pt-1'>
          <For each={menuItems}>
            {(item, index) => (
              <>
                <MenuItem
                  {...item}
                  onClick={async () => {
                    await item.onClick()
                  }}
                />

                <Show when={index() !== menuItems.length - 1}>
                  <Divider />
                </Show>
              </>
            )}
          </For>
        </Settings>
      </div>

      <Divider margin={0} />

      {/* Answer */}
      <div
        ref={chatWindowEl}
        id='chat-window'
        class='flex flex-1 py-4 flex-col overflow-y-scroll scrollable-container scroll-smooth relative gap-y-8'
      >
        {/* Loading  */}
        <Show when={botStore.isAwaitingAnswer && !botStore.activeAnswer}>
          <div class='flex mt-4 px-6 md:px-0'>
            <TypingBubble />
          </div>
        </Show>

        {/* Chatbot answer  */}
        <div
          data-testid='chatbot-answer'
          ref={botMessageEl}
          class={'px-6 md:px-0 prose ' + (theme().isDark && 'prose-invert')}
        />

        {/* Gallery  */}
        <Gallery class='px-6 md:px-0 animate-fade-in' />

        {/* Mobile resources  */}
        <Show when={device() == 'mobile'}>
          <div class='flex flex-col'>
            <Show when={botStore.activeFacts.length}>
              <div class='flex overflow-x-scroll whitespace-nowrap gap-x-4 px-6 md:px-0 no-scrollbar mt-2 '>
                <For each={botStore.activeFacts}>{(element) => <Fact fact={element} />}</For>
              </div>
            </Show>

            <Show when={links().length}>
              <div class='px-6 md:px-0 animate-fade-in'>
                <div
                  class='font-bold text-xs mt-8'
                  style={{
                    color: theme().textSecondary,
                  }}
                >
                  <LinkIcon width={14} class='inline-block mr-2' color={theme().primaryColor} />
                  Links
                </div>
                <Divider margin={8} />
              </div>
              <div class='flex overflow-x-scroll gap-x-4 px-6 no-scrollbar mt-2 '>
                <For each={links()}>{(element) => <LinkInline link={element} />}</For>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </>
  )
}
