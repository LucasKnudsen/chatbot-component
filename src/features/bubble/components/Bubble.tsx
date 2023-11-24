import { createSignal, Show, splitProps } from 'solid-js'
import styles from '../../../index.css?inline'
import { Bot, BotProps } from '../../bot/components/Bot'

import { BubbleButton } from './BubbleButton'

const defaultButtonColor = '#3B81F6'
const defaultIconColor = 'white'

export type BubbleProps = BotProps

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ['theme'])

  const [isBotOpened, setIsBotOpened] = createSignal(false)
  const [isBotStarted, setIsBotStarted] = createSignal(false)

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true)
    setIsBotOpened(true)
  }

  const closeBot = () => {
    setIsBotOpened(false)
  }

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot()
  }

  return (
    <>
      <style>{styles}</style>
      <BubbleButton
        // {...bubbleProps.theme?.button}
        toggleBot={toggleBot}
        isBotOpened={isBotOpened()}
      />
      <div
        class={`fixed top-0 left-0 w-screen h-screen m-0 ${
          isBotOpened() ? 'opacity-1' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'transform 250ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'z-index': 42424242,
        }}
        part='bot'
        // style={{
        //   height: bubbleProps.theme?.chatWindow?.height
        //     ? `${bubbleProps.theme?.chatWindow?.height.toString()}px`
        //     : 'calc(100% - 100px)',
        //   transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
        //   'transform-origin': 'bottom right',
        //   transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
        //   'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
        //   'background-color': bubbleProps.theme?.chatWindow?.backgroundColor || '#ffffff',
        //   'z-index': 42424242,
        // }}
      >
        <Show when={isBotStarted()}>
          <Bot
            initialPrompts={props.initialPrompts}
            themeId={props.themeId}
            navPromptsTitle={props.navPromptsTitle}
            promptPlaceholder={props.promptPlaceholder}
            suggestedPromptsTitle={props.suggestedPromptsTitle}
            welcomeMessage={props.welcomeMessage}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            theme={props.theme}
          />
        </Show>
      </div>
    </>
  )
}
